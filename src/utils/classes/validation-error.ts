export class ValidationError {
  recordCode: string;

  error: string;

  constructor(code: string, error: string) {
    this.recordCode = code;
    this.error = error;
  }
}
