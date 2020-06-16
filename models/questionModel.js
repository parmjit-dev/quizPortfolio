const mongoose = require('mongoose');

const tourSchema = new mongoose.Schema({
	name: {
		type: String,
		required: [ true, 'A tour must have a name' ],
		unique: true,
		trim: true
	},
	description: {
		type: String,
		trim: true
	},
	duration: {
		type: Number,
		required: [ true, 'A tour must have a duration' ]
	},
	maxGroupSize: {
		type: Number,
		required: [ true, 'A tour must have a maxGroupSize' ]
	},
	difficulty: {
		type: String,
		required: [ true, 'A tour must have a difficulty' ]
	},
	ratingAverage: {
		type: Number,
		default: 4.5
	},
	ratingQuantity: {
		type: Number,
		default: 0
	},
	price: {
		type: Number,
		required: [ true, 'A tour must have a price' ]
	},
	priceDiscount: Number,
	summary: {
		type: String,
		trim: true
	},
	imageCover: {
		type: String,
		required: [ true, 'A tour must have a cover image' ]
	},
	images: [ String ],
	created: {
		type: Date,
		default: Date.now()
	},
	startDates: [ Date ]
});

const Tour = mongoose.model('Tour', tourSchema);
/*
const testTour = new Tour({
	name: 'The Forest',
	rating: 4.7,
	price: 497
});

testTour.save().then((doc) => console.log(doc)).catch((error) => console.log(error));
*/
module.exports = Tour;
