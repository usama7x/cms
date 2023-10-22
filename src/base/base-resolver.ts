// This function is returning a generic class which is only used in
import { Type } from '@nestjs/common';
import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { camelCase } from 'lodash';
import { p } from 'src/utils/transformers/custom-pluralize';
import { BaseService } from './base-service';

// inheritance, that is why pascal case naming convention is used.
export function BaseResolver<
  TEntity extends {},
  TCreateInputType,
  TUpdateInputType extends { id: number },
  TReturnType extends { id: number },
>({
  returnTypeClassRef,
  createTypeClassRef,
  updateTypeClassRef,
}: {
  returnTypeClassRef: Type<TReturnType>;
  createTypeClassRef: Type<TCreateInputType>;
  updateTypeClassRef: Type<TUpdateInputType>;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
}): any {
  @Resolver(() => returnTypeClassRef, { isAbstract: true })
  abstract class BaseResolverHost {
    protected service: BaseService<
      TEntity,
      TCreateInputType,
      TUpdateInputType,
      TReturnType
    >;

    protected constructor(
      service: BaseService<
        TEntity,
        TCreateInputType,
        TUpdateInputType,
        TReturnType
      >,
    ) {
      this.service = service;
    }

    @Query(() => returnTypeClassRef, {
      name: `${camelCase(returnTypeClassRef.name)}`,
      nullable: true,
    })
    async getById(
      @Args('id', { type: () => Int }) id: number,
    ): Promise<TReturnType> {
      return await this.service.findById(id);
    }

    @Query(() => [returnTypeClassRef], {
      name: `${camelCase(p.plural(returnTypeClassRef.name))}`,
    })
    async get(): Promise<TReturnType[]> {
      return this.service.findAll();
    }

    @Mutation(() => returnTypeClassRef, {
      name: `create${returnTypeClassRef.name}`,
    })
    async create(
      @Args('data', { type: () => createTypeClassRef })
      data: TCreateInputType,
    ): Promise<TReturnType> {
      const [result] = await this.service.create([data]);
      return result;
    }

    @Mutation(() => [returnTypeClassRef], {
      name: `createMany${p.plural(returnTypeClassRef.name)}`,
    })
    async createMany(
      @Args('data', { type: () => [createTypeClassRef] })
      data: TCreateInputType[],
    ): Promise<TReturnType[]> {
      return this.service.create(data);
    }

    @Mutation(() => returnTypeClassRef, {
      name: `update${returnTypeClassRef.name}`,
    })
    async update(
      @Args('data', { type: () => updateTypeClassRef })
      data: TUpdateInputType,
    ): Promise<TReturnType> {
      const [result] = await this.service.update([data]);
      return result;
    }

    @Mutation(() => [returnTypeClassRef], {
      name: `updateMany${p.plural(returnTypeClassRef.name)}`,
    })
    async updateMany(
      @Args('data', { type: () => [updateTypeClassRef] })
      data: TUpdateInputType[],
    ): Promise<TReturnType[]> {
      return this.service.update(data);
    }

    @Mutation(() => Int, { name: `delete${returnTypeClassRef.name}` })
    async delete(
      @Args('id', { type: () => [Int] })
      id: number[],
    ): Promise<number | null | undefined> {
      return this.service.delete(id);
    }
  }

  return BaseResolverHost;
}
