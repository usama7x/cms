import { Injectable } from '@nestjs/common';
import { ValidationError } from 'src/utils/classes/validation-error';

@Injectable()
export class BaseValidationService<
  TCreateInputType,
  TUpdateInputType,
  TReturnType,
> {
  validateForCreation(
    data: TCreateInputType[],
    options?: {},
  ): { errors: ValidationError[]; validInputs: TCreateInputType[] } {
    return { errors: [], validInputs: data };
  }

  validateForUpdation(
    data: TUpdateInputType[],
    options?: {},
  ): { errors: ValidationError[]; validInputs: TUpdateInputType[] } {
    return { errors: [], validInputs: data };
  }
}
