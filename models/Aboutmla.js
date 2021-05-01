const mongoose = require('mongoose');

const aboutmlaSchema = new mongoose.Schema({
    content: {
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

module.exports = mongoose.model('Aboutmla', aboutmlaSchema);
