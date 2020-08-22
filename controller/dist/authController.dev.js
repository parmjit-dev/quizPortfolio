"use strict";

var jwt = require('jsonwebtoken');

var _require = require('util'),
    promisify = _require.promisify;

var crypto = require('crypto');

var User = require('../models/userModel');

var catchAsync = require('../catchAsync');

var AppError = require('../appError');

var sendEmail = require('../utils/email');
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


var assignToken = function assignToken(id) {
  return jwt.sign({
    id: id
  }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN
  });
}; // ws3 2ea interiors by fucking carl


var sendToken = function sendToken(user, statusCode, res) {
  // eslint-disable-next-line no-underscore-dangle
  var token = assignToken(user._id);
  var cookieOptions = {
    expires: new Date(Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000),
    // secure: true, // only sent over https turn back on in production
    httpOnly: true // cannot be accessed or modified over the browser

  };
  if (process.env.NODE_ENV === 'production') cookieOptions.secure = true;
  res.cookie('jwt', token, cookieOptions); // takes the type, token, and object of what he cookie should do

  user.password = undefined; // removes password from output

  res.status(statusCode).json({
    status: 'success',
    token: token,
    data: {
      user: user
    }
  });
};

exports.signup = catchAsync(function _callee(req, res, next) {
  var newUser;
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return regeneratorRuntime.awrap(User.create({
            name: req.body.name,
            email: req.body.email,
            password: req.body.password,
            confirmedPassword: req.body.confirmedPassword
          }));

        case 2:
          newUser = _context.sent;
          sendToken(newUser, 201, res);

        case 4:
        case "end":
          return _context.stop();
      }
    }
  });
});
exports.login = catchAsync(function _callee2(req, res, next) {
  var _req$body, email, password, user;

  return regeneratorRuntime.async(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _req$body = req.body, email = _req$body.email, password = _req$body.password; // destructing from the main object with the same variable name

          if (!(!email || !password)) {
            _context2.next = 3;
            break;
          }

          return _context2.abrupt("return", next(new AppError('Please provide an email and password', 400)));

        case 3:
          _context2.next = 5;
          return regeneratorRuntime.awrap(User.findOne({
            email: email
          }).select('+password'));

        case 5:
          user = _context2.sent;
          _context2.t0 = !user;

          if (_context2.t0) {
            _context2.next = 11;
            break;
          }

          _context2.next = 10;
          return regeneratorRuntime.awrap(user.correctPassword(password, user.password));

        case 10:
          _context2.t0 = !_context2.sent;

        case 11:
          if (!_context2.t0) {
            _context2.next = 13;
            break;
          }

          return _context2.abrupt("return", next(new AppError('Incorrect email or password', 401)));

        case 13:
          // eslint-disable-next-line no-underscore-dangle
          sendToken(user, 200, res);

        case 14:
        case "end":
          return _context2.stop();
      }
    }
  });
});
exports.protect = catchAsync(function _callee3(req, res, next) {
  var token, decodedPayload, currentUser;
  return regeneratorRuntime.async(function _callee3$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
            token = req.headers.authorization.split(' ')[1]; // splits the auth into an array and selects the seconds element
          } // checks if the user is logged in.


          if (token) {
            _context3.next = 3;
            break;
          }

          return _context3.abrupt("return", next(new AppError('You are not logged in! ✋ please login '), 401));

        case 3:
          _context3.next = 5;
          return regeneratorRuntime.awrap(promisify(jwt.verify)(token, process.env.JWT_SECRET));

        case 5:
          decodedPayload = _context3.sent;
          _context3.next = 8;
          return regeneratorRuntime.awrap(User.findById(decodedPayload.id));

        case 8:
          currentUser = _context3.sent;

          if (currentUser) {
            _context3.next = 11;
            break;
          }

          return _context3.abrupt("return", next(new AppError(' This user does not exist! please register', 401)));

        case 11:
          // checks if the password hasn't been changed after the token was issued
          // if (currentUser.changedPasswordAfter(decodedPayload.iat)) { // iat = issued at -- timestamp
          //   return next(new AppError(' The password of the user has been changed - please login again', 401));
          // }
          // Grants access if all the checks were successful
          req.user = currentUser;
          next();

        case 13:
        case "end":
          return _context3.stop();
      }
    }
  });
});

exports.restrictTo = function () {
  for (var _len = arguments.length, roles = new Array(_len), _key = 0; _key < _len; _key++) {
    roles[_key] = arguments[_key];
  }

  return (// due to closures middlewares can have access to varibles
    // roles array is the array we passed in the routes -- 'admin' ' lead-guide'
    function (req, res, next) {
      // returns the actual middleware
      // roles is an array
      if (!roles.includes(req.user.role)) {
        // can use request due to the req.user from the protect middleware
        return next(new AppError('You do not have permission to perform this action', 403));
      }

      next();
    }
  );
};

exports.forgotPassword = catchAsync(function _callee4(req, res, next) {
  var user, resetToken, resetURL, message;
  return regeneratorRuntime.async(function _callee4$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          _context4.next = 2;
          return regeneratorRuntime.awrap(User.findOne({
            email: req.body.email
          }));

        case 2:
          user = _context4.sent;

          if (user) {
            _context4.next = 5;
            break;
          }

          return _context4.abrupt("return", next(new AppError("Email doesn't match in db"), 404));

        case 5:
          resetToken = user.createPasswordResetToken(); // console.log(`this is the reset token: ${resetToken}`);
          // creates a token to reset password (instance in the model)

          _context4.next = 8;
          return regeneratorRuntime.awrap(user.save({
            validateBeforeSave: false
          }));

        case 8:
          // saves the file without needing to validate
          resetURL = "".concat(req.protocol, "://").concat(req.get('host'), "/api/v1/users/resetPassword/").concat(resetToken); // creates the new reset url using resetToken

          message = "Forgot your password? send a PATCH request with your new password and confirm to ".concat(resetURL); // Message for the email

          _context4.prev = 10;
          _context4.next = 13;
          return regeneratorRuntime.awrap(sendEmail({
            email: user.email,
            // or req.body.email
            subject: 'Your password token is avalible or 10 min',
            message: message
          }));

        case 13:
          res.status(200).json({
            status: 'success',
            message: 'Token has been sent'
          });
          _context4.next = 23;
          break;

        case 16:
          _context4.prev = 16;
          _context4.t0 = _context4["catch"](10);
          // If an error occurs resets the passwordReset and expiry in the db to undefined
          user.passwordReset = undefined;
          user.passwordResetExpired = undefined;
          _context4.next = 22;
          return regeneratorRuntime.awrap(user.save({
            validateBeforeSave: false
          }));

        case 22:
          return _context4.abrupt("return", next(new AppError(' Error sending email, try again later '), 500));

        case 23:
        case "end":
          return _context4.stop();
      }
    }
  }, null, null, [[10, 16]]);
});
exports.resetPassword = catchAsync(function _callee5(req, res, next) {
  var hashedToken, user;
  return regeneratorRuntime.async(function _callee5$(_context5) {
    while (1) {
      switch (_context5.prev = _context5.next) {
        case 0:
          hashedToken = crypto.createHash('sha256').update(req.params.token).digest('hex');
          _context5.next = 3;
          return regeneratorRuntime.awrap(User.findOne({
            passwordResetToken: hashedToken,
            passwordResetExpired: {
              $gt: Date.now()
            }
          }));

        case 3:
          user = _context5.sent;

          if (user) {
            _context5.next = 6;
            break;
          }

          return _context5.abrupt("return", next(new AppError('Token is invalid or has expired', 400)));

        case 6:
          user.password = req.body.password;
          user.confirmedPassword = req.body.confirmedPassword;
          user.passwordResetToken = undefined;
          user.passwordResetExpired = undefined;
          _context5.next = 12;
          return regeneratorRuntime.awrap(user.save());

        case 12:
          sendToken(user, 200, res); // inside the token param specified

          /**
           * get the user based on token - rehash the token to check if passwords match
           * only if token is not expired and there is a user
           * update the changed password at the user database
           * log the user in. Normal functionality
           */

        case 13:
        case "end":
          return _context5.stop();
      }
    }
  });
});
exports.updatePassword = catchAsync(function _callee6(req, res, next) {
  var user;
  return regeneratorRuntime.async(function _callee6$(_context6) {
    while (1) {
      switch (_context6.prev = _context6.next) {
        case 0:
          _context6.next = 2;
          return regeneratorRuntime.awrap(User.findById(req.user.id).select('+password'));

        case 2:
          user = _context6.sent;
          _context6.next = 5;
          return regeneratorRuntime.awrap(user.correctPassword(req.body.currentPassword, user.password));

        case 5:
          if (_context6.sent) {
            _context6.next = 7;
            break;
          }

          return _context6.abrupt("return", next(new AppError('Current password is incorrect', 401)));

        case 7:
          // need to specifically call the password
          user.password = req.body.password;
          user.confirmedPassword = req.body.confirmedPassword;
          _context6.next = 11;
          return regeneratorRuntime.awrap(user.save());

        case 11:
          // eslint-disable-next-line no-underscore-dangle
          sendToken(user, 200, res);

        case 12:
        case "end":
          return _context6.stop();
      }
    }
  });
});