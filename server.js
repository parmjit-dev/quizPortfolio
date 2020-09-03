const mongoose = require('mongoose'); // mongoose allows for creating schemes for modeling data
const dotenv = require('dotenv');
// add the app.js file
const app = require('./app');

process.on('unhandleExecption', (err) => { // handles sync errors - like defineing errors
  console.log('unhandled execption! goodbye 👋');
  console.log(err);
    process.exit(1);
});

dotenv.config({ path: './config.env' });

const DB = process.env.DATABASE.replace('<PASSWORD>', process.env.DATABASE_PASSWORD);
mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  })
  .then((con) => {
    //console.log(con.connections);
    console.log('Connection Successful');
  });
const port = process.env.PORT || 8000;

const server = app.listen(port, () => {
  console.log('Liisten - Rengar 🦁🦁');
});

process.on('unhandledRejection', (err) => {
  console.log('unhandled rejection! goodbye 👋');
  console.log(err);

  server.close(() => { // closing server gracefully
    process.exit(1);
  });
});