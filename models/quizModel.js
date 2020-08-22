const mongoose = require('mongoose');
const Question = require('./questionModel');
const quizSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [ true, 'A quiz must have a title' ],
  },
  questions: [{
    type: mongoose.Schema.ObjectId,
    ref: 'Question'
  }],
  public: {
    type: Boolean,
    default: false,
  },
  createdBy: String,
},
{
  // makes sure virtual properties are shown in outputs
  toJSON: { virtuals: true },
  toObject: { virtuals: true },
})

quizSchema.pre(/^find/, function (next) { // whenever a find request is made - populates the questions field in the quiz with the requested data in Question
  this.populate({
    path: 'questions',
});
  next();
});

quizSchema.pre('save', async function(next) { // whenever a save is done on the db - fills the id in the questions field with the data in the 'Questions' document
  const questionsPromise = this.questions.map(async (id) => await Question.findById(id));
  
  this.questions = await Promise.all(questionsPromise); // overwrites the this.guides

  next();
})


const quizLayout = mongoose.model('Quiz', quizSchema);

module.exports = quizLayout;