const express = require('express');

const tourController = require('./quizController');

const router = express.Router();
//router.param('id', tourController.checkID);

router.route('/').get(tourController.getAllTour).post(tourController.createTour);
router.route('/:id/:x?').get(tourController.getTour).patch(tourController.updateTour).delete(tourController.deleteTour);

module.exports = router;