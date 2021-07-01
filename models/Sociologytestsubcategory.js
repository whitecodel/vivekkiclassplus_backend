const mongoose = require("mongoose");

const sociologytestsubcategorySchema = new mongoose.Schema({
  name: {
    type: String,
    unique: true,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  last_update_time: {
    type: Date,
    default: Date.now,
  },
  created_at: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model(
  "sociologyTestSubCategory",
  sociologytestsubcategorySchema
);
