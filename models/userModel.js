/* eslint-disable func-names */
const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs'); // npm install
const crypto = require('crypto');
const Quiz = require('./quizModel')

const userSchema = new mongoose.Schema({

  name: {
    type: String,
    required: [true, 'A user must have a name'],
    validate: validator.isAlpha,
  },
  email: {
    type: String,
    required: [true, 'A user must have a name'],
    unique: true,
    lowercase: true,
    validate: [validator.isEmail, 'Please use a valid email'],
  },
  role: {
    type: String,
    enum: ['user', 'admin'],
    default: 'user',
  },
  password: {
    type: String,
    required: [true, 'A user must have a name'],
    minlength: [10, 'A tour must have a minimum of 10 Characters'],
    select: false,
    // validate: validator.isAlpha,
  },
  confirmedPassword: {
    type: String,
    required: [true, 'A user must have a name'],
    validate: {
      // only works on save
      validator(el) {
        return el === this.password;
      },
    },
  },
  photo: String,
  passwordChangedAt: Date,
  passwordResetToken: String,
  passwordResetExpired: Date,
  active: {
    type: Boolean,
    default: true,
    select: false,
  },
});

userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();// this refers to do current document

  this.password = await bcrypt.hash(this.password, 12); // 12 is the coast - standard

  this.confirmedPassword = undefined;

  next();
});

userSchema.pre('save', function (next) {
  if (!this.isModified('password') || this.isNew) return next();

  this.passwordChangedAt = Date.now() - 1000;

  next();
});

userSchema.methods.correctPassword = async function (
  candidatePassword,
  userPassword,
) {
  return await bcrypt.compare(candidatePassword, userPassword);
};

userSchema.methods.changedPasswordAfter = function (JWTTimeStamp) {
  if (this.passwordChangedAt) {
    const changedPasswordTime = parseInt(this.passwordChangedAt.getTime() / 1000, 10);

    return JWTTimeStamp < changedPasswordTime; // should return true meaning the token is invalid
  }

  return false;
};

userSchema.methods.createPasswordResetToken = function () {
  const resetToken = crypto.randomBytes(32).toString('hex');

  this.passwordResetToken = crypto.createHash('sha256').update(resetToken).digest('hex');

  this.passwordResetExpired = Date.now() + (10 * 60 * 1000);
  console.log({ resetToken });
  return resetToken;
};

userSchema.pre(/^find/, function(next) {
  this.find({active: { $ne: false}}); 
  // only finds where active is not equal to false - so even if the active isn't set on some account
  next();
}); // pre query -- /^find/ for any query containing a find eg findAndUpdate, findById

const User = mongoose.model('User', userSchema);

module.exports = User;