const { Schema } = require("mongoose");

const choiceSchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
});

module.exports = choiceSchema;
