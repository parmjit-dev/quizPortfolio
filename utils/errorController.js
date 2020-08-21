/**
 * catches all the potential errors
 */

const AppError = require('./appError');

const sendErrorDev = (err, res) => { // sends full information about the error
  res.status(err.statusCode).json({
    status: err.status,
    error: err,
    message: err.message,
    stack: err.stack,
  });
};

const sendErrorProd = (err, res) => { // reduces the amount of error messages the user should get
  // operaitional, trust and can be sent to client
  if (err.isOperational) {
    res.status(err.statusCode).json({
      status: err.status,
      message: err.message,
    });
    // programming or unknown error
  } else {
    console.error('ERROR', err);
    res.status(500).json({
      status: 'error',
      messgae: 'Something went very wrong!',
    });
  }
};

const handleCastErrorDB = (err) => { // error with the path or value in the db
  const message = `invalid ${err.path}: ${err.value}`;
  return new AppError(message, 400);
};

const handleDuplicateFieldsDB = (err) => {
  const value = err.errmsg.match(/(["'])(?:(?=(\\?))\2.)*?\1/); // name of property - which is created by mongo
  const message = `Duplicate fields value: ${value} Please use another value`;
  return new AppError(message, 400);
};

const handleValidationErrorDB = (err) => {
  const errors = Object.values(err.errors).map((el) => el.message);
  // error with the validation in the database -- in env

  const message = `Invalid input data ${errors.join('. ')}`;
  return new AppError(message, 400);
};

const handleJWTTokenError = () => new AppError('Invalid token, please login again', 401);

const handleExpiredError = () => new AppError('You token has expired, please login again', 401);

module.exports = (err, req, res, next) => {
  let error = err; // best practise to not modify the parameter raw
  error.statusCode = err.statusCode || 500; // if defined or eternal server error
  error.status = err.status || 'error'; // error is it is an eternal error
  // distinguishing between dev and production errors
  if (process.env.NODE_ENV === 'development') {
    sendErrorDev(err, res);
  } else if (process.env.NODE_ENV === 'production') {
    if (error.name === 'CastError') error = handleCastErrorDB(error); // errors with paths to the database
    if (error.code === 11000) error = handleDuplicateFieldsDB(error); // handling duplicate fields in the database
    if (error.name === 'ValidationError') error = handleValidationErrorDB(error); 
    if (error.name === 'JsonWebTokenerror') error = handleJWTTokenError(error);
    if (error.name === 'TokenExpiredError') error = handleExpiredError(error);
    sendErrorProd(error, res);
  }
};