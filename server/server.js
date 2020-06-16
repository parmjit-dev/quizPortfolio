const mongoose = require('mongoose'); //mongoose allows for creating schemes for modeling data
const dotenv = require('dotenv');
//add the app.js file
const app = require('./../app'); 
dotenv.config({ path: './config.env' });

const DB = process.env.DATABASE.replace('<PASSWORD>', process.env.DATABASE_PASSWORD);
mongoose
	.connect(DB, {
		useNewUrlParser: true,
		useCreateIndex: true,
		useFindAndModify: false
	})
	.then((con) => {
		console.log(con.connections);
		console.log(`Connection Successful`);
	});

const port = process.env.PORT || 3000;

app.listen(port, () => {
	console.log('Liisten - Rengar');
});