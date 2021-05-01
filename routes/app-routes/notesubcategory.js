const router = require('express').Router();
const Notesubcategory = require('../../models/Notesubcategory');
const {
    NotLoggedIn
} = require('../../middlewares/Auth');
const {
    NoActivePlan
} = require('../../middlewares/Plan');

router.post('/',  [NotLoggedIn, NoActivePlan], async (req, res) => {
    try {
        if(!req.activePlan.notes){
            return res.send({
                error: true,
                msg: 'No active plan to access this content'
            });
        }
        const notesubcategory = await Notesubcategory.find(
            {category: req.body.category}
        ).sort({
            created_at: 1
        });
        return res.send({
            error: false,
            msg: notesubcategory
        });
    } catch (error) {
        return res.send({
            error: true,
            msg: 'Something went wrong please try agian later'
        });
    }
});

module.exports = router