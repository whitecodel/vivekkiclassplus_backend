const router = require('express').Router();
const Videocategory = require('../../models/Videocategory');
const {
    NotLoggedIn
} = require('../../middlewares/Auth');
const {
    NoActivePlan
} = require('../../middlewares/Plan');

router.get('/', [NotLoggedIn, NoActivePlan], async (req, res) => {
    try {
        if(!req.activePlan.videos){
            return res.send({
                error: true,
                msg: 'No active plan to access this content'
            });
        }
        const vidoeocategories = await Videocategory.find().sort({
            created_at: -1
        });
        return res.send({
            error: false,
            msg: vidoeocategories
        });
    } catch (error) {
        return res.send({
            error: true,
            msg: 'Something went wrong please try agian later'
        });
    }
});

module.exports = router