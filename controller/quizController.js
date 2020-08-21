const Quiz = require('../models/quizModel');
const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');

exports.getAllQuiz = catchAsync( async (req, res, next) => {
		const quiz = await Quiz.find().populate('Question'); // populate the quizzes with the questions in the question document
		console.log(req.requestTime);
		res.status(200).json({
			status: 'success',
			requestAt: req.requestTime,
			results: quiz.length,
			data: { quiz: quiz }
		});
});

exports.getQuiz = catchAsync( async (req, res, next) => {
		const quiz = await Quiz.findById(req.params.id); //params give access to the url req
		if (!quiz) { return next(new AppError('No quiz found with that ID', 404)); }
		res.status(200).json({
			status: 'success',
			requestAt: req.requestTime,
			data: { quiz: quiz }
		});
});

exports.createQuiz = catchAsync( async (req, res, next) => {
    const quiz = await Quiz.create(req.body);
    res.status(201).json({
			status: 'success',
			data: {
				Quiz: quiz
			}
		});
  })

exports.updateAddQuestion = catchAsync( async (req, res, next) => {
		const quiz = await Quiz.findById(req.params.id);
		if (!quiz) { return next(new AppError('No document found with this ID', 404)); }
		quiz.questions.push(req.body.question);
		quiz.save();
		res.status(201).json({
			status: 'success',
			data: {
				Quiz: quiz,
			}
		});
})

exports.updateDeleteQuestion = catchAsync ( async (req, res, next) => {
	const quiz = await Quiz.findById(req.params.id);
	if (!quiz) { return next(new AppError('No document found with this ID', 404)); }
	const index = quiz.questions.indexOf(req.body.question);
	quiz.questions.splice(index, 1);
	quiz.save();
	res.status(201).json({
		status: 'success',
		data: {
			Quiz: quiz,
		}
	});
})