const express = require('express');
const path = require('path');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const mongoSanitize = require('express-mongo-sanitize');
const xss = require('xss-clean');
const hpp = require('hpp');
const questionRouter = require('./routes/questionRoutes');
const quizRouter = require('./routes/quizRoutes');
const viewRouter = require('./routes/viewRoutes');
const userRouter = require('./routes/userRoutes');
const app = express(); //you don't need to manully define the content type in express

app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'public'))); // any static images will be found in public

app.use(helmet()); // Set security HTTP headers

const limiter = rateLimit({ // Limit request from the same IP
  max: 100, // allows 100 request
  windowMs: 60 * 60 * 1000, // in 60 minutes
  message: 'Too many requests from this IP, please try again in an hour!',
});

app.use('/api', limiter); // applies to routes which start with /api

app.use(express.json());
app.use(express.json({ limit: '10kb' })); // limit how big the req data can be
app.use(mongoSanitize()); // Data sanitization against query injections
app.use(xss()); // Data sanitization again cross site scripting attacks, XSS

if (process.env.NODE_ENV === 'development') {
	app.use(morgan('dev'));
}
app.use(express.static(`${__dirname}/public`)); //creates a static page which is linked to the url
app.use(express.json());

app.use((req, res, next) => { //creates a time for the console
	req.requestTime = new Date().toISOString();
	next();
});
app.use('/', viewRouter)
app.use('/api/v1/question', questionRouter); //creates a sub application
app.use('/api/v1/quiz', quizRouter);
app.use('/api/v1/users', userRouter);
module.exports = app; //need to export app