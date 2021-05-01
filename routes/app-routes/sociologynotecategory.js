const router = require('express').Router();
const SociologyNotecategory = require('../../models/SociologyNotecategory');
const {
    NotLoggedIn
} = require('../../middlewares/Auth');
const {
    NoActivePlan
} = require('../../middlewares/Plan');

router.get('/', [NotLoggedIn, NoActivePlan], async (req, res) => {
    try {
        if(!req.activePlan.sociology_notes){
            return res.send({
                error: true,
                msg: 'No active plan to access this content'
            });
        }
        const sociologynotecategories = await SociologyNotecategory.find().sort({
            created_at: 1
        });
        return res.send({
            error: false,
            msg: sociologynotecategories
        });
    } catch (error) {
        return res.send({
            error: true,
            msg: 'Something went wrong please try agian later'
        });
    }
});

module.exports = router