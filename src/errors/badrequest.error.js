import BaseError from './base.error';
import { StatusCodes } from 'http-status-codes';

class BadRequest extends BaseError {
    constructor(propertyName, details) {
        super("BadRequest", StatusCodes.BAD_REQUEST, `Invalid structure for ${propertyName} provided`, details);
    }
}

export default BadRequest;
