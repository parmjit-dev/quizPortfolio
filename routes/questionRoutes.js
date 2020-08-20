const express = require('express');

const questionController = require('../controller/questionController');

const router = express.Router();
//router.param('id', tourController.checkID);

router.route('/').post(questionController.createQuestion);
router.route('/:id/:x?').get(questionController.getQuestion).patch(questionController.updateQuestion).delete(questionController.deleteQuestion);

module.exports = router;