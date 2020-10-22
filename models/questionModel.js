// @TODO:
/**
 * have the qestion be inserted to the user's decided quiz database
 * allow the user to create there own "database - quiz topic" and fill it up with these questions
 */
const mongoose = require('mongoose');
// const Quiz = require('./quizModel');

const questionSchema = new mongoose.Schema({
  quizID: [{
    type: mongoose.Schema.ObjectId,
    ref: 'Quiz',
  }],
  question: {
    type: String,
    required: [true, 'A question must have a question to ask'],
    trim: true,
  },
  answerSelectionOne: {
    type: String,
    required: [true, 'A question must have at least 2 or more answers to choose from'],
  },
  answerSelectionTwo: {
    type: String,
    required: [true, 'A question must have at least 2 or more answers to choose from'],
  },
  answerSelectionThree: {
    type: String,
  },
  answerSelectionFour: {
    type: String,
  },
  correctAnswer: {
    type: Number,
    min: 1,
    max: 4,
    required: [true, 'A question must have a correct answer'],
  },
  image: String,
  createdBy: String,
},
{
  // makes sure virtual properties are shown in outputs
  toJSON: { virtuals: true },
  toObject: { virtuals: true },
});

questionSchema.pre(/^find/, function (next) { // whenever a find request is made - populates the questions field in the quiz with the requested data in Question
  this.populate({
    path: 'Quiz',

  });
  next();
});

const questionLayout = mongoose.model('Question', questionSchema);

module.exports = questionLayout;
