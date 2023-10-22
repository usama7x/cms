import { ValidationError } from './validation-error';

export class BatchValidationError extends Error {
  errors: ValidationError[];

  constructor(message: string, errors: ValidationError[]) {
    super(message);
    this.errors = errors;
  }
}
