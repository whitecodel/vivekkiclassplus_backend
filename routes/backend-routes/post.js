const router = require('express').Router();
const Post = require('../../models/Post');
const {
    NotLoggedIn
} = require('../../middlewares/Adminauth');

router.get('/', NotLoggedIn, async (req, res) => {
    let data = [];
    var error = false;
    try {
        const posts = await Post.find().sort({
            created_at: -1
        });
        data = posts;
    } catch (err) {
        error = err;
    }
    return res.send({
        error,
        data
    });
});

module.exports = router;