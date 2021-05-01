const router = require('express').Router();
const Notecategory = require('../../models/Notecategory');
const {
    NotLoggedIn
} = require('../../middlewares/Auth');
const {
    NoActivePlan
} = require('../../middlewares/Plan');

router.get('/', [NotLoggedIn, NoActivePlan], async (req, res) => {
    try {
        if(!req.activePlan.notes){
            return res.send({
                error: true,
                msg: 'No active plan to access this content'
            });
        }
        const notecategories = await Notecategory.find().sort({
            created_at: 1
        });
        return res.send({
            error: false,
            msg: notecategories
        });
    } catch (error) {
        return res.send({
            error: true,
            msg: 'Something went wrong please try agian later'
        });
    }
});

module.exports = router