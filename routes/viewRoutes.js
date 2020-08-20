const express = require('express');
const router = express.Router();
const viewController = require('../controller/viewController');

router.route('/', viewController.getOverview);

module.exports = router;