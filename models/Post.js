const mongoose = require('mongoose');
const { post } = require('../routes/backend-routes/post');

const postSchema = new mongoose.Schema({
    text: {
        type: String,
        required: true
    }, 
    image: {
        type: String,
        required: true
    },
    last_update_time: {
        type: String,
        default: Date.now
    },
    created_at: {
        type: String,
        default: Date.now
    },
});

module.exports = mongoose.model('Post', postSchema);
