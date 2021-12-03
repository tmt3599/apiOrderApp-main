import httpStatus from "http-status";
/**
 * Class success response object
 */
export class APISuccess {
  constructor(res, data = {}, statusCode = httpStatus.OK) {
    data.message = "COMMON_MSG_001";
    if (Object.entries(data).length === 0 && data.constructor === Object) {
      res.status(httpStatus.NO_CONTENT).json();
    } else {
      res.status(statusCode).json(data);
    }
  }
}

/**
 * @extends Error
 */
class ExtendableError extends Error {
  constructor(message, status, error) {
    super(message);
    this.name = this.constructor.name;
    this.message = message;
    this.status = status;
    this.isPublic = false;
    this.isOperational = true;
    this.error = error;
    this.stack = null;
    // Error.captureStackTrace(this, this.constructor.name)
  }
}

/**
 * Class representing an API error.
 * @extends ExtendableError
 */
export class APIError extends ExtendableError {
  /**
   * Creates an API error.
   * @param {string} message - Error message.
   * @param {number} status - HTTP status code of error.
   * @param {boolean} isPublic - Whether the message should be visible to user or not.
   */
  constructor(
    message = "COMMON_ERR_001",
    status = httpStatus.INTERNAL_SERVER_ERROR,
    error = 500
  ) {
    super(message, status, error);
  }
}
