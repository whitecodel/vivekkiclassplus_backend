const router = require('express').Router();
const Qstudent = require('../../models/Qstudent');

router.get('/', async (req, res) => {
    try {
        const qstudents = await Qstudent.find().sort({
            created_at: -1
        });
        return res.send({
            error: false,
            msg: qstudents
        });
    } catch (error) {
        return res.send({
            error: true,
            msg: 'Something went wrong please try agian later'
        });
    }
});

module.exports = router