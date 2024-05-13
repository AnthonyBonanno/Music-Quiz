const { Schema, model } = require("mongoose");
const choiceSchema = require("./Choice");
const hintSchema = require("./Hint");

const questionSchema = new Schema({
  name: {
    type: String,
    trim: true,
  },
  image: {
    type: String,
  },
  audio: {
    type: String,
    required: true,
  },
  correctAnswer: {
    type: Boolean,
    required: true,
  },
  choices: [choiceSchema],
  hint: hintSchema,
});

const Question = model("Question", questionSchema);

module.exports = Question;
