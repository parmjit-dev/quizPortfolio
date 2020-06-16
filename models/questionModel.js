//@TODO: 
/**
 * have the qestion be inserted to the user's decided quiz database
 * allow the user to create there own "database - quiz topic" and fill it up with these questions
 */
const mongoose = require('mongoose');
const quizSchema = new mongoose.Schema({
	question: {
		type: String,
		required: [ true, 'A question must have a question to ask' ],
		unique: true,
		trim: true
	},
	answerSelectionOne: {
		type: String,
		required: [ true, 'A question must have at least 2 or more answers to choose from' ],
	},
	answerSelectionTwo: {
		type: String,
		required: [ true, 'A question must have at least 2 or more answers to choose from' ],
	},
	answerSelectionThree: {
		type: String,
	},
	answerSelectionFour: {
		type: String,
	},
	image: {
		type: String,
	},
	images: [ String ],
	startDates: [ Date ]
});

const quizLayout = mongoose.model('Quiz', quizSchema);
/*
const testTour = new Tour({
	name: 'The Forest',
	rating: 4.7,
	price: 497
});

testTour.save().then((doc) => console.log(doc)).catch((error) => console.log(error));
*/
module.exports = quizLayout;
