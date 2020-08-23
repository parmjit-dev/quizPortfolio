"use strict";

var express = require('express');

var app = express();

var userController = require('../controller/userController');

var authController = require('../controller/authController');

var router = express.Router();
app.use('/api/v1/users', router); // creates a sub application

router.get('/me', authController.protect, userController.getMe, userController.getUser);
router.post('/signup', authController.signup);
router.post('/login', authController.login);
router.post('/forgotPassword', authController.forgotPassword);
router.patch('/resetPassword/:token', authController.resetPassword);
router.use(authController.protect); // middleware runs in sequence so every route beyond this point has the protect middleware.

router.patch('/updatePassword', authController.updatePassword);
router.patch('/updateMe', userController.updateMe);
router["delete"]('/deleteMe', userController.deleteMe);
router.use(authController.restrictTo('admin')); // restricts the following routes to admins

router["delete"]('/deleteUser', userController.deleteUser); // router.route('/').get(userController.getAllUser).post(userController.createUser);
// 100% rest as the url doesn't relate to the functions

module.exports = router;