// DuplicateKeyError.js
import BaseError from './base.error.js';

class DuplicateKeyError extends BaseError {
  constructor(field, value) {
    super('DuplicateKeyError', 400, `Duplicate key error on ${field}`, {
      field,
      value
    });
  }
}

export default DuplicateKeyError;
