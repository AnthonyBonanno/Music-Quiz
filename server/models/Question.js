const { Schema, model } = require("mongoose");
const choiceSchema = require("./Choice");

const questionSchema = new Schema({
  name: {
    type: String,
    trim: true,
  },
  image: {
    type: String,
  },
  lyric: {
    type: String,
    required: true,
  },
  choices: [choiceSchema],
  hint: { 
    type: String, 
    trim: true 
  },
});

const Question = model("Question", questionSchema);

module.exports = Question;
