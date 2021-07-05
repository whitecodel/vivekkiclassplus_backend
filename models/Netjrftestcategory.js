const mongoose = require("mongoose");

const netjrftestcategorySchema = new mongoose.Schema({
  name: {
    type: String,
    unique: true,
    required: true,
  },
  subcategory: {
    type: Boolean,
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

module.exports = mongoose.model("netjrfTestCategory", netjrftestcategorySchema);
