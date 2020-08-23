"use strict";

/* eslint-disable func-names */
var mongoose = require('mongoose');

var validator = require('validator');

var bcrypt = require('bcryptjs'); // npm install


var crypto = require('crypto');

var Quiz = require('./quizModel');

var userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'A user must have a name'],
    validate: validator.isAlpha
  },
  email: {
    type: String,
    required: [true, 'A user must have a name'],
    unique: true,
    lowercase: true,
    validate: [validator.isEmail, 'Please use a valid email']
  },
  role: {
    type: String,
    "enum": ['user', 'admin'],
    "default": 'user'
  },
  password: {
    type: String,
    required: [true, 'A user must have a name'],
    minlength: [10, 'A tour must have a minimum of 10 Characters'],
    select: false // validate: validator.isAlpha,

  },
  confirmedPassword: {
    type: String,
    required: [true, 'A user must have a name'],
    validate: {
      // only works on save
      validator: function validator(el) {
        return el === this.password;
      }
    }
  },
  photo: String,
  passwordChangedAt: Date,
  passwordResetToken: String,
  passwordResetExpired: Date,
  active: {
    type: Boolean,
    "default": true,
    select: false
  }
});
userSchema.pre('save', function _callee(next) {
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          if (this.isModified('password')) {
            _context.next = 2;
            break;
          }

          return _context.abrupt("return", next());

        case 2:
          _context.next = 4;
          return regeneratorRuntime.awrap(bcrypt.hash(this.password, 12));

        case 4:
          this.password = _context.sent;
          // 12 is the coast - standard
          this.confirmedPassword = undefined;
          next();

        case 7:
        case "end":
          return _context.stop();
      }
    }
  }, null, this);
});
userSchema.pre('save', function (next) {
  if (!this.isModified('password') || this.isNew) return next();
  this.passwordChangedAt = Date.now() - 1000;
  next();
});

userSchema.methods.correctPassword = function _callee2(candidatePassword, userPassword) {
  return regeneratorRuntime.async(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.next = 2;
          return regeneratorRuntime.awrap(bcrypt.compare(candidatePassword, userPassword));

        case 2:
          return _context2.abrupt("return", _context2.sent);

        case 3:
        case "end":
          return _context2.stop();
      }
    }
  });
};

userSchema.methods.changedPasswordAfter = function (JWTTimeStamp) {
  if (this.passwordChangedAt) {
    var changedPasswordTime = parseInt(this.passwordChangedAt.getTime() / 1000, 10);
    return JWTTimeStamp < changedPasswordTime; // should return true meaning the token is invalid
  }

  return false;
};

userSchema.methods.createPasswordResetToken = function () {
  var resetToken = crypto.randomBytes(32).toString('hex');
  this.passwordResetToken = crypto.createHash('sha256').update(resetToken).digest('hex');
  this.passwordResetExpired = Date.now() + 10 * 60 * 1000;
  console.log({
    resetToken: resetToken
  });
  return resetToken;
};

userSchema.pre(/^find/, function (next) {
  this.find({
    active: {
      $ne: false
    }
  }); // only finds where active is not equal to false - so even if the active isn't set on some account

  next();
}); // pre query -- /^find/ for any query containing a find eg findAndUpdate, findById

var User = mongoose.model('User', userSchema);
module.exports = User;