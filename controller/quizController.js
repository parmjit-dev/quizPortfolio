const Quiz = require('../models/quizModel');

exports.getAllQuiz = async (req, res) => {
	try {
		const quiz = await Quiz.find().populate('Question');
		console.log(req.requestTime);
		res.status(200).json({
			status: 'success',
			requestAt: req.requestTime,
			results: quiz.length,
			data: { quiz: quiz }
		});
	} catch (err) {
		res.status(404).json({
			status: 'fail',
			message: `${err}`
		});
	}
};

exports.getQuiz = async (req, res) => {
	try {
		const quiz = await Quiz.findById(req.params.id); //params give access to the url req
		res.status(200).json({
			status: 'success',
			requestAt: req.requestTime,
			data: { quiz: quiz }
		});
	} catch (err) {
		res.status(404).json({
			status: 'fail',
			message: `${err}`
		});
	}
};

exports.createQuiz = async (req, res) => {
  try {
    const quiz = await Quiz.create(req.body);
    res.status(201).json({
			status: 'success',
			data: {
				Quiz: quiz
			}
		});
  } catch (err) {
    res.status(404).json({
			status: 'fail',
			message: `${err}`
		});
  }
}