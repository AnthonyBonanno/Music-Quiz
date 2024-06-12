const { Schema, model } = require("mongoose");
const questionSchema = require("./Question");

const quizSchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    maxlength: 255,
    trim: true,
  },
  image: {
    type: String,
  },
  quizCreator: {
    type: String,
    trim: true,
  },
  questions: [questionSchema],
});

const Quiz = model("Quiz", quizSchema);

module.exports = Quiz;
