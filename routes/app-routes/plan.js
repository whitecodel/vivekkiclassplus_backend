const router = require('express').Router();
const Plan = require('../../models/Plan');
const {
    NotLoggedIn
} = require('../../middlewares/Auth');
const {
    NoActivePlan
} = require('../../middlewares/Plan');
const {
    route
} = require('./auth');
const moment = require('moment');


router.get('/', [NotLoggedIn, NoActivePlan], async (req, res) => {
    try {
        let plans = await Plan.find({
            user: req.user._id
        }).sort({
            active_date: 1
        });
        plans = await formatData(plans);
        return res.send({
            error: false,
            msg: plans
        });
    } catch (error) {
        console.log(error)
        return res.send({
            error: true,
            msg: 'Something went wrong please try again later'
        });
    }
});

const formatData = (data) => {
    let updatedData = [];
    return new Promise((resolve, reject) => {
        for (var i in data) {
            updatedData[i] = {};
            if (Date.now() > parseInt(data[i].active_date) + 1000 * 60 * 60 * 24 * 30 * parseInt(data[i].months)) {
                updatedData[i].expired = true;
            } else {
                updatedData[i].expired = false;
            }
            updatedData[i].expired_date = moment(parseInt(data[i].active_date)).add(data[i].months, 'M').format('DD MMM YYYY');
            updatedData[i].active_date = moment(parseInt(data[i].active_date)).format('DD MMM YYYY');
            updatedData[i].months = data[i].months;
            updatedData[i].amount = data[i].amount;
        }
        resolve(updatedData);
    })
}

module.exports = router