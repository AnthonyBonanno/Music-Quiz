const { Schema } = require("mongoose");

const choiceSchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  correctAnswer: {
    type: Boolean,
    required: true,
  },
});

module.exports = choiceSchema;
