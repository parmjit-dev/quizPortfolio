/**
 * The structure of how errors should be laid out
 */

class AppError extends Error {
  constructor(message, statusCode) { // takes an error message and the error code
    super(message);

    this.statusCode = statusCode;
    this.status = `${statusCode}`.startsWith('4') ? 'fail' : 'error'; // checks what the status code is if 4 or 5 //changes status if it's a server error or program error
    this.isOperational = true; // operational error

    Error.captureStackTrace(this, this.constructor); // calls back where the origin of the error is
  }
}

module.exports = AppError;