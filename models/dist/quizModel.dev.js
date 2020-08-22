"use strict";

var mongoose = require('mongoose');

var Question = require('./questionModel');

var quizSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'A quiz must have a title']
  },
  questions: [{
    type: mongoose.Schema.ObjectId,
    ref: 'Question'
  }],
  "public": {
    type: Boolean,
    "default": false
  },
  createdBy: String
}, {
  // makes sure virtual properties are shown in outputs
  toJSON: {
    virtuals: true
  },
  toObject: {
    virtuals: true
  }
});
quizSchema.pre(/^find/, function (next) {
  // whenever a find request is made - populates the questions field in the quiz with the requested data in Question
  this.populate({
    path: 'questions'
  });
  next();
});
quizSchema.pre('save', function _callee2(next) {
  var questionsPromise;
  return regeneratorRuntime.async(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          // whenever a save is done on the db - fills the id in the questions field with the data in the 'Questions' document
          questionsPromise = this.questions.map(function _callee(id) {
            return regeneratorRuntime.async(function _callee$(_context) {
              while (1) {
                switch (_context.prev = _context.next) {
                  case 0:
                    _context.next = 2;
                    return regeneratorRuntime.awrap(Question.findById(id));

                  case 2:
                    return _context.abrupt("return", _context.sent);

                  case 3:
                  case "end":
                    return _context.stop();
                }
              }
            });
          });
          _context2.next = 3;
          return regeneratorRuntime.awrap(Promise.all(questionsPromise));

        case 3:
          this.questions = _context2.sent;
          // overwrites the this.guides
          next();

        case 5:
        case "end":
          return _context2.stop();
      }
    }
  }, null, this);
});
var quizLayout = mongoose.model('Quiz', quizSchema);
module.exports = quizLayout;