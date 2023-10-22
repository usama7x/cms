import { isEmpty, merge } from 'lodash';
import { Injectable, LoggerService, Type } from '@nestjs/common';
import {
  DeepPartial,
  FindOptionsWhere,
  FindManyOptions,
  FindOneOptions,
  In,
  Repository,
  SelectQueryBuilder,
  UpdateResult,
  FindOptionsSelect,
  IsNull,
  EntityMetadata,
} from 'typeorm';
import { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity';
import { BaseValidationService } from './base-validation.service';
import {
  IBaseValidationDataFactory,
  IValidateResponse,
} from 'src/base-types/base-validation-data-factory.interface';
import { ValidationError } from 'src/utils/classes/validation-error';
import { plainToClass } from 'class-transformer';
import { BatchValidationError } from 'src/utils/classes/batch-validation';
@Injectable()
export class BaseService<
  TEntity extends {},
  TCreateInputType,
  TUpdateInputType extends { id: number },
  TReturnType extends { id: number },
> {
  protected repository: Repository<TEntity>;

  protected entityRef: Type<TEntity>;

  protected createInputRef: Type<TCreateInputType>;

  protected updateInputRef: Type<TUpdateInputType>;

  protected outputRef: Type<TReturnType>;

  protected findOptions: FindOneOptions<TEntity>;

  protected logger: LoggerService;

  protected baseOptions;

  protected validationService: BaseValidationService<
    TCreateInputType,
    TUpdateInputType,
    TReturnType
  >;

  constructor({
    repository,
    classReferences: { entityRef, createInputRef, updateInputRef, outputRef },
    validationService,
    options,
  }: {
    repository: Repository<TEntity>;
    classReferences: {
      entityRef: Type<TEntity>;
      createInputRef: Type<TCreateInputType>;
      updateInputRef: Type<TUpdateInputType>;
      outputRef: Type<TReturnType>;
    };
    validationService?: BaseValidationService<
      TCreateInputType,
      TUpdateInputType,
      TReturnType
    >;
    options?: FindOneOptions<TEntity>;
  }) {
    this.repository = repository;
    this.entityRef = entityRef;
    this.createInputRef = createInputRef;
    this.updateInputRef = updateInputRef;
    this.outputRef = outputRef;
    this.validationService = validationService || new BaseValidationService();
  }

  async preCreate(
    payload: TCreateInputType[],
    options?: {},
  ): Promise<IValidateResponse<TEntity>> {
    let errors: ValidationError[] = [];

    const { errors: currentErrors, validInputs } =
      this.validationService.validateForCreation(payload, options);
    errors.push(...currentErrors);
    const entities = validInputs.map((i) => this.toEntity(i));

    return { entities, errors };
  }

  async preUpdate(
    payload: TUpdateInputType[],
    options?: {},
  ): Promise<IValidateResponse<TEntity>> {
    let errors: ValidationError[] = [];
    const { errors: currentErrors, validInputs } =
      this.validationService.validateForUpdation(payload, options);
    errors.push(...currentErrors);
    const entities = validInputs.map((i) => this.toEntity(i));
    return {
      errors,
      entities,
    };
  }

  async create(
    payload: TCreateInputType[],
    options?: {},
  ): Promise<TReturnType[]> {
    if (isEmpty(payload)) {
      return [];
    }

    const { errors, entities } = await this.preCreate(payload, options);
    if (errors.length) {
      throw new BatchValidationError(
        'Some of the inputs failed to pass validation',
        errors,
      );
    }
    const transformedEntities = await this.preCreateOperations(
      entities,
      options,
    );
    return this.save(transformedEntities);
  }

  async preCreateOperations(
    entities: TEntity[],
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    dataFactory?: IBaseValidationDataFactory<TReturnType>,
  ): Promise<TEntity[]> {
    return entities;
  }

  async update(
    payload: TUpdateInputType[],
    dataFactory?: IBaseValidationDataFactory<TReturnType>,
    options?: {},
  ): Promise<TReturnType[]> {
    const tokenizedPayload = payload.map((payloadObj) => {
      return { ...payloadObj };
    });
    // const currentDataFactory =
    //   dataFactory || (await this.getDataFactory(tokenizedPayload));
    const { errors, entities } = await this.preUpdate(
      tokenizedPayload,
      options,
    );

    if (errors.length) {
      throw new BatchValidationError(
        'Some of the inputs failed to pass validation',
        errors,
      );
    }

    const updateResp = await this.save(entities);

    const persistedEntities = await this.findEntities({
      where: {
        id: In(updateResp.map((i) => i.id)),
      } as unknown as FindOptionsWhere<TEntity>,
    });

    await this.postUpdate(payload, persistedEntities);

    // For now doing this because there might be some changes in
    // original records inside postUpdate and this way we can
    // return the updated payload.
    return (
      await this.findEntities({
        where: {
          id: In(updateResp.map((i) => i.id)),
        } as unknown as FindOptionsWhere<TEntity>,
      })
    ).map((i) => this.fromEntity(i));
  }

  // async validateUniqueness(
  //   payload: TCreateInputType[] | TUpdateInputType[],
  // ): Promise<ValidationError[]> {
  //   const uniqueKeys = this.baseOptions.uniqueKeyOptions.keys;

  //   const errors: ValidationError[] = [];

  //   const payloadWithUniqueAttributes = this.mapInputAndEntityKeys<
  //     TCreateInputType | TUpdateInputType,
  //     TEntity
  //   >(payload) as Partial<TEntity[]>;

  //   const whereOptions = Object.entries(
  //     pluckMany(payloadWithUniqueAttributes, uniqueKeys),
  //   ).reduce((acc, [key, value]) => ({ ...acc, [key]: In(value) }), {});

  //   const objectsInDb = await this.findEntities({
  //     where: whereOptions,
  //     select: uniqueKeys.concat(['id']),
  //   });

  //   let completePayloadWithUniqueAttributes = payloadWithUniqueAttributes;

  //   // For update mode add missing unique attributes to the payload
  //   if (this.getSaveMode(payload[0]) === SaveMode.Update) {
  //     completePayloadWithUniqueAttributes = payloadWithUniqueAttributes.map(
  //       (input) => {
  //         const missingKeys = (Object.keys(input) as (keyof TEntity)[]).filter(
  //           (v) => v !== 'id' && !uniqueKeys.includes(v),
  //         );
  //         return missingKeys.reduce((acc, key) => {
  //           return {
  //             ...acc,
  //             [key]: objectsInDb.find((item) => item.id === input.id)[key],
  //           };
  //         }, input);
  //       },
  //     );
  //   }

  //   completePayloadWithUniqueAttributes.forEach((currentItem) => {
  //     const filteredObjectsInDb = objectsInDb.filter(
  //       (item) =>
  //         item.id !== currentItem.id &&
  //         uniqueKeys.every((key) => item[key] === currentItem[key]),
  //     );

  //     if (!isEmpty(filteredObjectsInDb)) {
  //       const inputPayload = this.mapInputAndEntityKeys<
  //         TEntity,
  //         TCreateInputType | TUpdateInputType
  //       >(currentItem, false);
  //       // delete (inputPayload as any).identifierToken;

  //       errors.push(
  //         new ValidationError(
  //           (currentItem as unknown as { code?: string })?.code,
  //           UNIQUENESS_VIOLATION_ERROR(inputPayload),
  //         ),
  //       );
  //     }
  //   });

  //   return errors;
  // }

  toEntity(
    inputType: TCreateInputType | TUpdateInputType,
    options?: {},
  ): TEntity {
    return plainToClass(this.entityRef, inputType);
  }

  fromEntity(entity: TEntity | TEntity[] | null): TReturnType {
    return plainToClass(this.outputRef, entity);
  }

  // async getDataFactory(
  //   // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/explicit-module-boundary-types
  //   payload: any[],
  //   options?: DataFactoryOptions,
  // ): Promise<IBaseValidationDataFactory<TReturnType>> {
  //   const dataFactory: IBaseValidationDataFactory<TReturnType> = {
  //     self: [],
  //     state: [],
  //   };
  //   const { id: ids } = pluckMany(<TUpdateInputType[]>payload, ['id']);

  //   if (ids.length > 0) {
  //     dataFactory.self = await this.findAll({
  //       where: {
  //         id: In(ids),
  //       } as FindOptionsWhere<TEntity>,
  //     });
  //   }

  //   if (this.stateService) {
  //     const { code } = (<RecordType>options)?.initialState ?? {
  //       code: null,
  //     };
  //     const initialState = await this.stateService.findOne({
  //       where: { code: code ?? StateCodes.Draft },
  //     });
  //     if (initialState) {
  //       dataFactory.state = [initialState];
  //     }
  //   }

  //   const loggedInUser =
  //     await this.headerDataExtractionService.getLoggedInUser();

  //   dataFactory.currentUserId = loggedInUser.id;

  //   return dataFactory;
  // }

  // async getDataFactoryForDeletion(
  //   payload: number[] = [],
  //   // eslint-disable-next-line @typescript-eslint/no-unused-vars
  //   options?: DeletionDataFactoryOptions,
  // ): Promise<IBaseDeletionDataFactory<TReturnType>> {
  //   const deletionDataFactory: IBaseDeletionDataFactory<TReturnType> = {
  //     self: [],
  //   };

  //   if (payload.length > 0) {
  //     deletionDataFactory.self = await this.findAll({
  //       where: {
  //         id: In(payload),
  //       } as FindOptionsWhere<TEntity>,
  //     });
  //   }
  //   return deletionDataFactory;
  // }

  getQueryBuilder(alias: string): SelectQueryBuilder<TEntity> {
    return this.repository.createQueryBuilder(alias);
  }

  async findById(id: number): Promise<TReturnType> {
    return this.findOne({
      where: { id: id } as unknown as FindOptionsWhere<TEntity>,
    });
  }

  async findOne(options: FindOneOptions<TEntity> = {}): Promise<TReturnType> {
    const entity = await this.findOneEntity(options);
    return this.fromEntity(entity);
  }

  async findOneEntity(
    options: FindOneOptions<TEntity> = {},
  ): Promise<TEntity | null> {
    return this.repository.findOne(options);
  }

  async findEntities(
    options: FindManyOptions<TEntity> = {},
  ): Promise<TEntity[]> {
    return this.repository.find(options);
  }

  // async toPageInfo(
  //   inputType: TReturnType[],
  //   pInfo: PageInfoInput = { pageNo: 1, pageSize: 20 },
  //   count?: number,
  // ): Promise<ReturnType<IPageInfoWrapper<TReturnType[]>>> {
  //   const parentElement = 'parentElement';
  //   let nextPage;
  //   let actualObjectCount;
  //   if (!isEmpty(inputType) && inputType[0][parentElement] !== undefined) {
  //     actualObjectCount = inputType.filter(
  //       (obj) => obj[parentElement] === false,
  //     ).length;
  //     nextPage = actualObjectCount >= pInfo.pageSize;
  //   } else {
  //     nextPage = inputType.length >= pInfo.pageSize;
  //     actualObjectCount = inputType.length;
  //   }
  //   const prevPage = pInfo.pageSize * pInfo.pageNo - pInfo.pageSize > 0;

  //   return {
  //     data: inputType,
  //     pageInfo: {
  //       hasPreviousPage: prevPage,
  //       hasNextPage: nextPage,
  //       requestedQueryCost: pInfo.pageSize,
  //       actualQueryCost: actualObjectCount,
  //       maximumAvailable: count,
  //     },
  //   };
  // }

  async findAll(options: FindOneOptions<TEntity> = {}): Promise<TReturnType[]> {
    const entities = await this.repository.find(options);
    return entities.map((entity) => this.fromEntity(entity));
  }

  protected async save(entities: TEntity[]): Promise<TReturnType[]> {
    const saveResp = await this.repository.save(
      entities as unknown as DeepPartial<TEntity>[],
    );

    return saveResp.map((entity) => this.fromEntity(entity));
  }

  protected async postCreate(
    // eslint-disable-next-line @typescript-eslint/no-unused-vars, @typescript-eslint/no-empty-function
    payload,
    response,
    // eslint-disable-next-line @typescript-eslint/no-empty-function
  ): Promise<void> {}

  protected async postUpdate(
    // eslint-disable-next-line @typescript-eslint/no-unused-vars, @typescript-eslint/no-empty-function
    payload: TCreateInputType[] | TUpdateInputType[],
    response: TEntity[],
    // eslint-disable-next-line @typescript-eslint/no-empty-function
  ): Promise<void> {}

  async partialUpdate(
    criteria: number | number[] | FindOptionsWhere<TEntity>,
    partialEntity: QueryDeepPartialEntity<TEntity>,
  ): Promise<UpdateResult> {
    return this.repository.update(criteria, partialEntity);
  }

  async partialUpdateMany(
    partialEntities: DeepPartial<TEntity>[],
  ): Promise<DeepPartial<TEntity>[]> {
    return this.repository.save(partialEntities);
  }

  async delete(
    payload: number | number[] | FindOptionsWhere<TEntity>,
    softDelete = true,
  ): Promise<number | null | undefined> {
    let ids: number[];
    if (Array.isArray(payload)) {
      ids = payload;
    } else if (typeof payload === 'object') {
      ids = (
        await this.findAll({
          where: payload,
          select: { id: true } as unknown as FindOptionsSelect<TEntity>,
        })
      ).map((i) => i.id);
    } else {
      ids = [payload];
    }

    const { where: whereClause } = merge(
      {
        where: {
          id: In(ids),
          deletedAt: IsNull(),
        },
      },
      this.baseOptions?.findOptions,
    );
    const { affected } = await this.repository[
      softDelete ? 'softDelete' : 'delete'
    ](whereClause as FindOptionsWhere<TEntity>);

    return affected;
  }

  getEntityMetaData(): EntityMetadata {
    return this.repository.metadata;
  }
}
