const express = require('express');

const quizController = require('./../controller/quizController');

const router = express.Router();
//router.param('id', tourController.checkID);

router.route('/').get(quizController.getAllQuiz).post(quizController.createQuiz);
router.route('/:id/:x?').get(quizController.getQuiz).patch(quizController.updateQuiz).delete(quizController.deleteQuiz);

module.exports = router;