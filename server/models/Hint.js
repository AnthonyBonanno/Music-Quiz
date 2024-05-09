const { Schema } = require("mongoose");

const hintSchema = new Schema({
  name: {
    type: String,
    trim: true,
  },
});

module.exports = hintSchema;
