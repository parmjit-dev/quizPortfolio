// Users routes
const User = require('../models/userModel');
const catchAsync = require('../catchAsync');
const AppError = require('../appError');
const handler = require('../utils/handler');

const filter = (bodyObj, ...fields) => {
  const filteredBody = {};

  Object.keys(bodyObj).forEach((el) => {
    if (fields.includes(el)) filteredBody[el] = bodyObj[el];
    /** loops all the fields in the object
     * checks if it contains a value inside the fields and adds to a new obj
     * */
  }); // returns an object of all the key names

  return filteredBody;
};

exports.getMe = (req, res, next) => {
  req.params.id = req.user.id;
  next();
};

exports.updateMe = catchAsync(async (req, res, next) => {
  // if body contains any password details
  if (req.body.password || req.body.confirmedPassword) {
    return next(new AppError('This route is not for password data please use /updatePassword route'), 400);
  }
  // can use findbyid and update as you are not working with sensitive data

  const filteredBody = filter(req.body, 'name', 'email');
  // filters the body to only contain name and email
  const updatedUser = await User.findByIdAndUpdate(req.user.id, filteredBody,
    { new: true, runValidators: true });

  res.status(200).json({
    status: 'success',
    data: {
      user: updatedUser,
    },
  });
});

// she told me, put my heart in the bag, and nobody gets hurt...
exports.deleteMe = catchAsync(async (req, res, next) => {
  await User.findByIdAndUpdate(req.user.id, { active: false });

  res.status(204).json({
    status: 'success',
    data: null,
  });
});

exports.getAllUser = handler.getAll(User);
exports.deleteUser = handler.deleteOne(User);
exports.updateUser = handler.updateOne(User);
exports.getUser = handler.getOne(User);