import BaseError from './base.error.js'; // Import BaseError
import { StatusCodes } from 'http-status-codes'; // Import StatusCodes

class NotFound extends BaseError {
    constructor(resourceName, resourceValue) {
        super(
            "NotFound", 
            StatusCodes.NOT_FOUND, 
            `The requested resource: ${resourceName} with value ${resourceValue} not found`, 
            { resourceName, resourceValue }
        );
    }
}

export default NotFound; // Export the NotFound class
