"use strict";

// Users routes
var User = require('../models/userModel');

var catchAsync = require('../catchAsync');

var AppError = require('../appError');

var handler = require('../utils/handler');

var filter = function filter(bodyObj) {
  for (var _len = arguments.length, fields = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    fields[_key - 1] = arguments[_key];
  }

  var filteredBody = {};
  Object.keys(bodyObj).forEach(function (el) {
    if (fields.includes(el)) filteredBody[el] = bodyObj[el];
    /** loops all the fields in the object
     * checks if it contains a value inside the fields and adds to a new obj
     * */
  }); // returns an object of all the key names

  return filteredBody;
};

exports.getMe = function (req, res, next) {
  req.params.id = req.user.id;
  next();
};

exports.updateMe = catchAsync(function _callee(req, res, next) {
  var filteredBody, updatedUser;
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          if (!(req.body.password || req.body.confirmedPassword)) {
            _context.next = 2;
            break;
          }

          return _context.abrupt("return", next(new AppError('This route is not for password data please use /updatePassword route'), 400));

        case 2:
          // can use findbyid and update as you are not working with sensitive data
          filteredBody = filter(req.body, 'name', 'email'); // filters the body to only contain name and email

          _context.next = 5;
          return regeneratorRuntime.awrap(User.findByIdAndUpdate(req.user.id, filteredBody, {
            "new": true,
            runValidators: true
          }));

        case 5:
          updatedUser = _context.sent;
          res.status(200).json({
            status: 'success',
            data: {
              user: updatedUser
            }
          });

        case 7:
        case "end":
          return _context.stop();
      }
    }
  });
}); // she told me, put my heart in the bag, and nobody gets hurt...

exports.deleteMe = catchAsync(function _callee2(req, res, next) {
  return regeneratorRuntime.async(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.next = 2;
          return regeneratorRuntime.awrap(User.findByIdAndUpdate(req.user.id, {
            active: false
          }));

        case 2:
          res.status(204).json({
            status: 'success',
            data: null
          });

        case 3:
        case "end":
          return _context2.stop();
      }
    }
  });
});
exports.getAllUser = handler.getAll(User);
exports.deleteUser = handler.deleteOne(User);
exports.updateUser = handler.updateOne(User);
exports.getUser = handler.getOne(User);