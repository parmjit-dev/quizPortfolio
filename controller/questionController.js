// controllers
const Question = require('../models/questionModel');

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

exports.updateQuestion = async (req, res) => {
  try {
    const quiz = await Question.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.status(200).json({ status: 'success', data: { quiz } });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: `${err}`,
    });
  }
};

exports.deleteQuestion = async (req, res) => {
  try {
    await Question.findByIdAndDelete(req.params.id);
    res.status(204).json({ status: 'success', data: null });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: `${err}`,
    });
  }
};
