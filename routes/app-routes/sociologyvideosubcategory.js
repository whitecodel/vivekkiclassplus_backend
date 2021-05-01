const router = require('express').Router();
const SociologyVideosubcategory = require('../../models/SociologyVideosubcategory');
const {
    NotLoggedIn
} = require('../../middlewares/Auth');
const {
    NoActivePlan
} = require('../../middlewares/Plan');

router.post('/', [NotLoggedIn, NoActivePlan], async (req, res) => {
    try {
        if(!req.activePlan.sociology_videos){
            return res.send({
                error: true,
                msg: 'No active plan to access this content'
            });
        }
        const sociologyvideosubcategory = await SociologyVideosubcategory.find(
            {category: req.body.category}
        ).sort({
            created_at: -1
        });
        return res.send({
            error: false,
            msg: sociologyvideosubcategory
        });
    } catch (error) {
        return res.send({
            error: true,
            msg: 'Something went wrong please try agian later'
        });
    }
});

module.exports = router