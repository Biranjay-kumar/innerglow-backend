class ValidationError extends Error {
  constructor(message) {
    super(message);
    this.name = this.constructor.name;
    this.statusCode = 400;
    Error.captureStackTrace(this, this.constructor);
  }
}

export default ValidationError;
