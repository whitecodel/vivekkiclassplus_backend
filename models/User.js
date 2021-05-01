const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        max: 50,
        required: true
    },
    phone: {
        unique: true,
        type: String,
        max: 10,
        required: true
    },
    imei: {
        type: String,
    },
    created_at: {
        type: String,
        default: Date.now(),
    },
    last_update_time: {
        type: String,
        default: Date.now(),
    },
});

module.exports = mongoose.model('User', userSchema);
