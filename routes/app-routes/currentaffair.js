const router = require('express').Router();
const CurrentAffair = require('../../models/CurrentAffair');
const {
    NotLoggedIn
} = require('../../middlewares/Auth');
// const { notify } = require('../backend-routes/video');
const {
    NoActivePlan
} = require('../../middlewares/Plan');
const root = process.cwd();

router.get('/', async (req, res) => {
    var error = false;
    var msg;
    try {
        // if (!req.activePlan.notes) {
        //     return res.send({
        //         error: true,
        //         msg: 'No active plan to access this content'
        //     });
        // }
        const currentaffairs = await CurrentAffair.find().sort({
            created_at: -1
        });
        msg = currentaffairs;
    } catch (err) {
        error = true;
        msg = 'Something went wrong please try again later';
    }
    return res.send({
        error,
        msg
    });
});

router.post('/getnote', async (req, res) => {
    var error = false;
    var msg;
    try {
        // if (!req.activePlan.notes) {
        //     error = true;
        //     msg = 'No active plan to access this content';
        // } else {
        //     return res.sendFile(root + '/notes/current-affairs/' + req.body.basename);
        // }
        return res.sendFile(root + '/notes/current-affairs/' + req.body.basename);
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