const mongoose = require("mongoose");

const ppnotesubcategorySchema = new mongoose.Schema({
  category: {
    type: String,
    required: true,
  },
  name: {
    unique: true,
    type: String,
    required: true,
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

module.exports = mongoose.model("PpNotesubcategory", ppnotesubcategorySchema);
