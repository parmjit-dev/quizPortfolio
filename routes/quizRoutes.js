const express = require('express');

const quizController = require('../controller/quizController');
const authController = require('../controller/authController');

const router = express.Router();

router.route('/').get(quizController.getAllQuiz).post(authController.protect, quizController.createQuiz);
router.route('/:id').patch(authController.protect, quizController.updateAddQuestion).delete(authController.protect, quizController.updateDeleteQuestion).get(quizController.getQuiz);

module.exports = router;