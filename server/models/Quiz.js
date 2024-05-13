const { Schema, model } = require("mongoose");

const quizSchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    maxlength: 20,
    trim: true,
  },
  image: {
    type: String,
  },
  userId: {
    type: String,
    required: true,
  },
  questions: [
    {
      type: Schema.Types.ObjectId,
      ref: "Question",
    },
  ],
});

const Quiz = model("Quiz", quizSchema);

module.exports = Quiz;
