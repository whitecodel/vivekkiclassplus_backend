const router = require('express').Router();
const Post = require('../../models/Post');
const moment = require('moment');

router.get('/', async (req, res) => {
    let data = [];
    var error = false;
    try {
        let posts = await Post.find().sort({
            created_at: -1
        });
        posts = await formatData(posts);
        data = posts;
    } catch (err) {
        error = true;
    }
    return res.send({
        error,
        data
    });
});

const formatData = (data) => {
    return new Promise(async (resolve, reject) => {
        for (var i in data) {
            data[i].created_at = moment(parseInt(data[i].created_at)).format('MMM DD HH:MM, YYYY');
            data[i].last_update_time = moment(parseInt(data[i].last_update_time)).format('MMM DD HH:MM, YYYY');
        }
        resolve(data);
    });
}

module.exports = router;