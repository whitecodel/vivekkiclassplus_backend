const mongoose = require('mongoose');

const qstudentSchema = new mongoose.Schema({
    image: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    subject: {
        type: String,
        required: true
    },
    qexam: {
        type: String,
        required: true
    },
    roll_number: {
        type: String,
    },
    created_at: {
        type: String,
        default: Date.now(),
    },
    updated_at: {
        type: String,
        default: Date.now(),
    },
});

module.exports = mongoose.model('Qstudent', qstudentSchema);