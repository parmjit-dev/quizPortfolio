"use strict";

var express = require('express');

var path = require('path');

var morgan = require('morgan');

var rateLimit = require('express-rate-limit');

var helmet = require('helmet');

var mongoSanitize = require('express-mongo-sanitize');

var xss = require('xss-clean');

var hpp = require('hpp');

var questionRouter = require('./routes/questionRoutes');

var quizRouter = require('./routes/quizRoutes');

var viewRouter = require('./routes/viewRoutes');

var userRouter = require('./routes/userRoutes');

var app = express(); //you don't need to manully define the content type in express

app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));
app.use(express["static"](path.join(__dirname, 'public'))); // any static images will be found in public

app.use(helmet()); // Set security HTTP headers

var limiter = rateLimit({
  // Limit request from the same IP
  max: 100,
  // allows 100 request
  windowMs: 60 * 60 * 1000,
  // in 60 minutes
  message: 'Too many requests from this IP, please try again in an hour!'
});
app.use('/api', limiter); // applies to routes which start with /api

app.use(express.json());
app.use(express.json({
  limit: '10kb'
})); // limit how big the req data can be

app.use(mongoSanitize()); // Data sanitization against query injections

app.use(xss()); // Data sanitization again cross site scripting attacks, XSS

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

app.use(express["static"]("".concat(__dirname, "/public"))); //creates a static page which is linked to the url

app.use(express.json());
app.use(function (req, res, next) {
  //creates a time for the console
  req.requestTime = new Date().toISOString();
  next();
});
app.use('/', viewRouter);
app.use('/api/v1/question', questionRouter); //creates a sub application

app.use('/api/v1/quiz', quizRouter);
app.use('/api/v1/users', userRouter);
module.exports = app; //need to export app