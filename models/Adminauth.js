const mongoose = require('mongoose');

const adminauthSchema = new mongoose.Schema({
    username: {
        type: String,
        max: 50,
        required: true
    }, 
    password: {
        type: String,
        min: 6,
        max: 255,
        required: true
    },
});

module.exports = mongoose.model('Adminauth', adminauthSchema);
