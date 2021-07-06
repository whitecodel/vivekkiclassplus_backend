const mongoose = require("mongoose");

const planSchema = new mongoose.Schema({
  user: {
    type: String,
    required: true,
  },
  months: {
    type: String,
    required: true,
  },
  amount: {
    type: String,
    required: true,
  },
  videos: {
    type: Boolean,
    default: false,
  },
  notes: {
    type: Boolean,
    default: false,
  },
  tests: {
    type: Boolean,
    default: false,
  },
  sociology_videos: {
    type: Boolean,
    default: false,
  },
  sociology_notes: {
    type: Boolean,
    default: false,
  },
  sociology_tests: {
    type: Boolean,
    default: false,
  },
  pp_videos: {
    type: Boolean,
    default: false,
  },
  pp_notes: {
    type: Boolean,
    default: false,
  },
  pp_tests: {
    type: Boolean,
    default: false,
  },
  active_date: {
    type: String,
    default: Date.now(),
  },
  last_update_time: {
    type: String,
    default: Date.now,
  },
});

module.exports = mongoose.model("Plan", planSchema);
