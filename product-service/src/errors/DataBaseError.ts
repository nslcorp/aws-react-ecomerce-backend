import BaseError from './BaseError';

export class DataBaseError extends BaseError {
  statusCode = 500;

  constructor(public message: string) {
    super(message);

  }

  serializeError() {
    return { message: this.message };
  }
}
