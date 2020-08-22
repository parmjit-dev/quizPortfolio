"use strict";

var express = require('express');

var quizController = require('../controller/quizController');

var authController = require('../controller/authController');

var router = express.Router();
router.route('/').get(quizController.getAllQuiz).post(authController.protect, quizController.createQuiz);
router.route('/:id').patch(authController.protect, quizController.updateAddQuestion)["delete"](authController.protect, quizController.updateDeleteQuestion).get(quizController.getQuiz);
module.exports = router;