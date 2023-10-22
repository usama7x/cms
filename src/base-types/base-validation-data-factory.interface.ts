import { ValidationError } from '@libs/common/exceptions';
import { StateEntity } from '../resources/state';

export interface IBaseValidationDataFactory<TReturnType> {
  self?: TReturnType[];
  state?: Pick<StateEntity, 'id' | 'code'>[];
  // TODO: This field should be required
  currentUserId?: number;
}
export interface IValidateRelation {
  code: string;
  dbData: { code?: string }[];
  relationName: string;
  onSuccess?: (obj: { id?: number; code?: string }) => void;
}

export interface IValidateResponse<TEntity> {
  entities: TEntity[];
  errors: ValidationError[];
}

export interface IValidateRelationById {
  id: number;
  dbData: { id?: number }[];
  columnName: string;
  onSuccess?: (obj: unknown) => void;
}

export type ValidateResponse<T> = {
  errors: ValidationError[];
  validInputs: T[];
};

export interface IGenericValidateRelation<T> {
  id: number;
  dbData: { id?: number }[];
  columnName: keyof T;
  onSuccess?: (obj: { id?: number; code?: string }) => void;
}
