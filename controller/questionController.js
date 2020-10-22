// controllers
const Question = require('../models/questionModel');
const handler = require('../utils/handler');

exports.getAllQuestions = handler.getAll(Question, 'quizID');
exports.updateQuestion = handler.updateOne(Question);
exports.deleteQuestion = handler.deleteOne(Question);

exports.getQuestion = async (req, res) => {
  if (!req.name || !req.price) {
    return res.status(400).json({
      status: 'Fail',
      message: 'Bad Request',
    });
  }
};
// 	next();
// }; //middlewate for checking if cetaain selections are found
// Quizs routes
exports.createQuestion = async (req, res) => {
  try {
    const newQuiz = await Question.create(req.body);
    newQuiz.correctAnswer = parseInt(newQuiz.correctAnswer);
    console.log(newQuiz);
    console.log(req.body);
    res.status(201).json({
      status: 'success',
      data: {
        Question: newQuiz,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: `Bad Request ${req.body.correctAnswer}`,
    });
  }
};