const express = require('express');

const questionController = require('../controller/questionController');

const router = express.Router();
//router.param('id', tourController.checkID)

router.route('/').get(questionController.getAllQuestions).post(questionController.createQuestion);
router.route('/:id').patch(questionController.updateQuestion).delete(questionController.deleteQuestion);
router.route('/:quizID').get(questionController.getAllQuestions);
module.exports = router;
