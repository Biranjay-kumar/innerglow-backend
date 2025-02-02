import { StatusCodes } from "http-status-codes";
import BaseError from "../errors/base.error.js";

function errorHandler(err, req, res, next) {
  console.error(err); // Log the full error for debugging

  // Handle duplicate key error (E11000) for MongoDB
  if (err.code === 11000) {
    const fieldName = Object.keys(err.keyValue)[0]; // Get the duplicate field name (e.g., 'email')
    const fieldValue = err.keyValue[fieldName]; // Get the duplicated value
    return res.status(StatusCodes.BAD_REQUEST).json({
      success: false,
      message: `${fieldName.charAt(0).toUpperCase() + fieldName.slice(1)} '${fieldValue}' already exists. Please use a unique ${fieldName}.`,
      error: err.message,
      data: {},
    });
  }

  // Handle invalid ObjectId errors (CastError)
  if (err.name === "CastError") {
    return res.status(StatusCodes.BAD_REQUEST).json({
      success: false,
      message: `Invalid ObjectId provided for ${err.path}. Please provide a valid ID.`,
      error: err.message,
      data: {},
    });
  }

  // Handle known custom errors (BaseError)
  if (err instanceof BaseError) {
    return res.status(err.statusCode).json({
      success: false,
      message: err.message,
      error: err.details || null,
      data: {},
    });
  }

  // Extract meaningful error message from nested errors
  let message = err.message || "Something went wrong.";
  if (message.includes(":")) {
    const parts = message.split(":").map((part) => part.trim());
    message = parts[parts.length - 1]; // Get the last meaningful part
  }

  // Handle generic internal server errors
  return res.status(err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR).json({
    success: false,
    message,
    error: err.message,
    data: {},
  });
}

export default errorHandler;
