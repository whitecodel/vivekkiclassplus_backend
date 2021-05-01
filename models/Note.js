const mongoose = require('mongoose');

const noteSchema = new mongoose.Schema({
    category: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    thumbnail: {
        type: String,
        required: true
    },
    basename: {
        type: String,
        required: true
    },
    last_update_time: {
        type: Date,
        default: Date.now
    },
    created_at: {
        type: Date,
        default: Date.now
    },
});

module.exports = mongoose.model('Note', noteSchema);