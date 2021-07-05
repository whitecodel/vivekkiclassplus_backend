const mongoose = require("mongoose");

const ppnotecategorySchema = new mongoose.Schema({
  name: {
    unique: true,
    type: String,
    required: true,
  },
  subcategory: {
    type: Boolean,
    default: true,
  },
  last_update_time: {
    type: String,
    default: Date.now,
  },
  created_at: {
    type: String,
    default: Date.now,
  },
});

module.exports = mongoose.model("PpNotecategory", ppnotecategorySchema);
