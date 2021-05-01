const router = require('express').Router();
const SociologyNote = require('../../models/SociologyNote');
const {
    NotLoggedIn
} = require('../../middlewares/Auth');
// const { notify } = require('../backend-routes/video');
const {
    NoActivePlan
} = require('../../middlewares/Plan');
const root = process.cwd();

router.post('/', [NotLoggedIn, NoActivePlan], async (req, res) => {
    var error = false;
    var msg;
    try {
        if (!req.activePlan.sociology_notes) {
            return res.send({
                error: true,
                msg: 'No active plan to access this content'
            });
        }
        const sociologynotes = await SociologyNote.find({
            category: req.body.category,
        }).sort({
            created_at: 1
        });
        msg = sociologynotes;
    } catch (err) {
        error = true;
        msg = 'Something went wrong please try again later';
    }
    return res.send({
        error,
        msg
    });
});

router.post('/getnote', [NotLoggedIn, NoActivePlan], async (req, res) => {
    var error = false;
    var msg;
    try {   
        if (!req.activePlan.sociology_notes) {
            error = true;
            msg = 'No active plan to access this content';
        } else {
            return res.sendFile(root + '/notes/sociology/' + req.body.basename);
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