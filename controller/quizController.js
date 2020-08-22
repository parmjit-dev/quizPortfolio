const Quiz = require('../models/quizModel');
const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');
const handler = require('../utils/handler');

exports.getAllQuiz = handler.getAll(Quiz, 'questions');
exports.getQuiz = handler.getOne(Quiz, 'questions');
exports.createQuiz = handler.createOne(Quiz);
exports.deleteQuiz = handler.deleteOne(Quiz);
exports.updateQuiz = handler.updateOne(Quiz);

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