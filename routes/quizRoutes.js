const express = require('express');

const quizController = require('../controller/quizController');

const router = express.Router();

router.route('/').get(quizController.getAllQuiz).post(quizController.createQuiz);
router.route('/:id').patch(quizController.updateAddQuestion).delete(quizController.updateDeleteQuestion).get(quizController.getQuiz);

module.exports = router;