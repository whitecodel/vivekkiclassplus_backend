const mongoose = require("mongoose");

const pptestSchema = new mongoose.Schema({
  name: {
    type: String,
    unique: true,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  duration: {
    type: String,
    required: true,
  },
  questions: [
    {
      question: {
        type: String,
        required: true,
      },
      option_a: {
        type: String,
        required: true,
      },
      option_b: {
        type: String,
        required: true,
      },
      option_c: {
        type: String,
        required: true,
      },
      option_d: {
        type: String,
        required: true,
      },
      right_answer: {
        type: String,
        required: true,
      },
    },
  ],
  last_update_time: {
    type: Date,
    default: Date.now,
  },
  created_at: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("ppTest", pptestSchema);
