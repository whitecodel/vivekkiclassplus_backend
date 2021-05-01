const router = require('express').Router();
const Slider = require('../../models/Slider');

router.get('/', async (req, res) => {
    try {
        const sliders = await Slider.find().sort({
            created_at: -1
        });
        return res.send({
            error: false,
            msg: sliders
        });
    } catch (error) {
        return res.send({
            error: true,
            msg: 'Something went wrong please try agian later'
        });
    }
});

module.exports = router