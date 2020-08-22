"use strict";

var Quiz = require('../models/quizModel');

var AppError = require('../utils/appError');

var catchAsync = require('../utils/catchAsync');

var handler = require('../utils/handler');

exports.getAllQuiz = handler.getAll(Quiz, 'questions');
exports.getQuiz = handler.getOne(Quiz, 'questions');
exports.createQuiz = handler.createOne(Quiz);
exports.deleteQuiz = handler.deleteOne(Quiz);
exports.updateQuiz = handler.updateOne(Quiz);
exports.updateAddQuestion = catchAsync(function _callee(req, res, next) {
  var quiz;
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return regeneratorRuntime.awrap(Quiz.findById(req.params.id));

        case 2:
          quiz = _context.sent;

          if (quiz) {
            _context.next = 5;
            break;
          }

          return _context.abrupt("return", next(new AppError('No document found with this ID', 404)));

        case 5:
          quiz.questions.push(req.body.question);
          quiz.save();
          res.status(201).json({
            status: 'success',
            data: {
              Quiz: quiz
            }
          });

        case 8:
        case "end":
          return _context.stop();
      }
    }
  });
});
exports.updateDeleteQuestion = catchAsync(function _callee2(req, res, next) {
  var quiz, index;
  return regeneratorRuntime.async(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.next = 2;
          return regeneratorRuntime.awrap(Quiz.findById(req.params.id));

        case 2:
          quiz = _context2.sent;

          if (quiz) {
            _context2.next = 5;
            break;
          }

          return _context2.abrupt("return", next(new AppError('No document found with this ID', 404)));

        case 5:
          index = quiz.questions.indexOf(req.body.question);
          quiz.questions.splice(index, 1);
          quiz.save();
          res.status(201).json({
            status: 'success',
            data: {
              Quiz: quiz
            }
          });

        case 9:
        case "end":
          return _context2.stop();
      }
    }
  });
});