const express = require('express');
const morgan = require('morgan');
const quizRouter = require('./routes/quizRoutes');

const app = express(); //you don't need to manully define the content type in express

if (process.env.NODE_ENV === 'development') {
	app.use(morgan('dev'));
}
app.use(express.static(`${__dirname}/public`)); //creates a static page which is linked to the url
app.use(express.json());

app.use((req, res, next) => { //creates a time for the console
	req.requestTime = new Date().toISOString();
	next();
});
app.use('/api/v1/quiz', quizRouter); //creates a sub application
module.exports = app; //need to export app