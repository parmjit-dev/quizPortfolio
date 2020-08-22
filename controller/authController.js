const jwt = require('jsonwebtoken');
const { promisify } = require('util');
const crypto = require('crypto');
const User = require('../models/userModel');
const catchAsync = require('../catchAsync');
const AppError = require('../appError');
const sendEmail = require('../utils/email');

/**
 *
 *  Anything regarding the quering the database requires an await -- remember
 *
 * Security tips:
 *
 * brute force attacks -- add maximum login attempts -- 1 hour wait
 * Sanitize user input data -- set special http headers
 * prevent cross site request forgery using csurf
 * implement a blacklist of untrusted JWT;
 * confirm user email address after first creating account
 * keep user logged in with refresh tokens
 * implement two-factor authentication
 */
const assignToken = (id) => jwt.sign({ id }, process.env.JWT_SECRET, {
  expiresIn: process.env.JWT_EXPIRES_IN,
}); // ws3 2ea interiors by fucking carl

const sendToken = (user, statusCode, res) => {
  // eslint-disable-next-line no-underscore-dangle
  const token = assignToken(user._id);
  const cookieOptions = {
    expires: new Date(Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000),
    // secure: true, // only sent over https turn back on in production
    httpOnly: true, // cannot be accessed or modified over the browser
  };

  if (process.env.NODE_ENV === 'production') cookieOptions.secure = true;
  res.cookie('jwt', token, cookieOptions);
  // takes the type, token, and object of what he cookie should do

  user.password = undefined; // removes password from output

  res.status(statusCode).json({
    status: 'success',
    token,
    data: {
      user,
    },
  });
};

exports.signup = catchAsync(async (req, res, next) => {
  const newUser = await User.create({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
    confirmedPassword: req.body.confirmedPassword,
  });
  sendToken(newUser, 201, res);
});

exports.login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;
  // destructing from the main object with the same variable name

  if (!email || !password) {
    return next(new AppError('Please provide an email and password', 400));
  }

  const user = await User.findOne({ email }).select('+password'); // checks if email we destructered is equal to the email in the db

  if (!user || !await user.correctPassword(password, user.password)) { // checks if there is a user matching the email and if the password is correct
    return next(new AppError('Incorrect email or password', 401));
  }

  // eslint-disable-next-line no-underscore-dangle
  sendToken(user, 200, res);
});

exports.protect = catchAsync(async (req, res, next) => {
  let token;
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    token = req.headers.authorization.split(' ')[1];
    // splits the auth into an array and selects the seconds element
  }

  // checks if the user is logged in.
  if (!token) {
    return next(new AppError('You are not logged in! ✋ please login '), 401);
  }

  const decodedPayload = await promisify(jwt.verify)(token, process.env.JWT_SECRET); // allows for async await

  const currentUser = await User.findById(decodedPayload.id); // checks if the user is still in the database and not deleted.

  // checks if the user is still in the db and not deleted
  if (!currentUser) {
    return next(new AppError(' This user does not exist! please register', 401));
  }

  // checks if the password hasn't been changed after the token was issued
  // if (currentUser.changedPasswordAfter(decodedPayload.iat)) { // iat = issued at -- timestamp
  //   return next(new AppError(' The password of the user has been changed - please login again', 401));
  // }

  // Grants access if all the checks were successful
  req.user = currentUser;
  next();
});

exports.restrictTo = (...roles) => // due to closures middlewares can have access to varibles
// roles array is the array we passed in the routes -- 'admin' ' lead-guide'
  ((req, res, next) => { // returns the actual middleware
    // roles is an array
    if (!roles.includes(req.user.role)) { // can use request due to the req.user from the protect middleware
      return next(new AppError('You do not have permission to perform this action', 403));
    }

    next();
  });

exports.forgotPassword = catchAsync(async (req, res, next) => {
  const user = await User.findOne({ email: req.body.email });
  // find the and creates a new user object

  if (!user) { // if user doesn't exist
    return next(new AppError("Email doesn't match in db"), 404);
  }

  const resetToken = user.createPasswordResetToken();
  // console.log(`this is the reset token: ${resetToken}`);
  // creates a token to reset password (instance in the model)
  await user.save({ validateBeforeSave: false }); // saves the file without needing to validate

  const resetURL = `${req.protocol}://${req.get('host')}/api/v1/users/resetPassword/${resetToken}`;
  // creates the new reset url using resetToken

  const message = `Forgot your password? send a PATCH request with your new password and confirm to ${resetURL}`;
  // Message for the email

  try {
    await sendEmail({
      email: user.email, // or req.body.email
      subject: 'Your password token is avalible or 10 min',
      message,
    });

    res.status(200).json({
      status: 'success',
      message: 'Token has been sent',
    });
  } catch (err) {
    // If an error occurs resets the passwordReset and expiry in the db to undefined
    user.passwordReset = undefined;
    user.passwordResetExpired = undefined;
    await user.save({ validateBeforeSave: false });

    return next(new AppError(' Error sending email, try again later '), 500);
  }
});

exports.resetPassword = catchAsync(async (req, res, next) => {
  const hashedToken = crypto.createHash('sha256').update(req.params.token).digest('hex');

  const user = await User.findOne({ passwordResetToken: hashedToken, passwordResetExpired: { $gt: Date.now() } });

  if (!user) {
    return next(new AppError('Token is invalid or has expired', 400));
  }

  user.password = req.body.password;
  user.confirmedPassword = req.body.confirmedPassword;
  user.passwordResetToken = undefined;
  user.passwordResetExpired = undefined;
  await user.save();

  sendToken(user, 200, res);

  // inside the token param specified
  /**
   * get the user based on token - rehash the token to check if passwords match
   * only if token is not expired and there is a user
   * update the changed password at the user database
   * log the user in. Normal functionality
   */
});

exports.updatePassword = catchAsync(async (req, res, next) => {
  /**
   * get user from collection
   * check posted password
   * if the password correct update password
   * re log in user - with jwt token
   */
  //
  const user = await User.findById(req.user.id).select('+password');
  // console.log(`${req.body.currentPassword} body password`);
  if (!(await user.correctPassword(req.body.currentPassword, user.password))) {
    return next(new AppError('Current password is incorrect', 401));
  }

  // need to specifically call the password
  user.password = req.body.password;
  user.confirmedPassword = req.body.confirmedPassword;
  await user.save();

  // eslint-disable-next-line no-underscore-dangle
  sendToken(user, 200, res);
});