const router = require('express').Router();
const Video = require('../../models/Video');
const {NotLoggedIn} = require('../../middlewares/Auth');
const { notify } = require('../backend-routes/video');
const {
    NoActivePlan
} = require('../../middlewares/Plan');
const root = process.cwd();

router.post('/', NotLoggedIn, async (req, res) => {
    var error = false;
    var msg;
    try {
        const videos = await Video.find({
            category: req.body.category,
        });
        msg = videos
    } catch (err) {
        error = true;
    }
    return res.send({
        error,
        msg
    });
});

router.get('/getvideo', [NotLoggedIn, NoActivePlan], async (req, res) => {
    var error = false;
    var msg;
    try {
        if (!req.activePlan.videos) {
            error = true;
            msg = 'No active plan to access this content';
        } else {
            return res.sendFile(root + '/videos/' + req.query.quality + '/' + req.query.basename);
        }
    } catch (err) {
        console.log(err)
        error = true;
        msg = 'Something went wrong please try again later';
    }
    return res.send({
        error,
        msg
    });
});

module.exports = router;