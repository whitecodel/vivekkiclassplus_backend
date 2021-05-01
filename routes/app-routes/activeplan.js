const router = require('express').Router();
const {
    NotLoggedIn
} = require('../../middlewares/Auth');
const {
    NoActivePlan
} = require('../../middlewares/Plan');

router.get('/', [NotLoggedIn, NoActivePlan], async (req, res) => {
    try {
        req.activePlan.msg = 'कोर्स परचेस करने के लिए अपना नाम और सब्जेक्ट इस नंबर पर व्हाट्सऐप्प करें - 943401811 अथवा कॉल करें - 790015710';
        return res.send({
            error: false,
            msg: req.activePlan
        });
    } catch (error) {
        return res.send({
            error: true,
            msg: 'Something went wrong please try agian later'
        });
    }
});

module.exports = router