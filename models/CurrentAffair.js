const mongoose = require('mongoose');

const schema = new mongoose.Schema({
    title: {
        type: String,
        require: true,
    },
    thumbnail: {
        type: String,
        require: true,
    },
    basename: {
        type: String,
        required: true
    },
    created_at: {
        type: String,
        default: Date.now
    },
    updated_at: {
        type: String,
        default: Date.now
    },
});

module.exports = mongoose.model('CurrentAffair', schema);