const router = require('express').Router();
const User = require('../../models/User');
const bcrypt = require('bcrypt');
require('dotenv').config();
const jwt = require('jsonwebtoken');

router.post('/signin', async (req, res) => {

    // check imei
    if (req.body.imei == null) {
        return res.status(400).send({
            error: true,
            msg: 'Something went wrong please try again later'
        });
    }

    //check if user exists
    const user = await User.findOne({
        phone: req.body.phone
    });
    if (!user) return res.status(400).send({
        error: true,
        msg: 'User Not Registered'
    });

    //checking password
    // const validPassword = await bcrypt.compare(req.body.password, user.name);
    if (req.body.password != user.name) return res.status(400).send({
        error: true,
        msg: 'Invalid Authentication'
    });

    // set imei if not yet done
    if (user.imei == null) {
        await User.findOneAndUpdate({
            _id: user._id,
        }, {
            imei: req.body.imei
        });
    } else if (user.imei != req.body.imei) {
        return res.status(400).send({
            error: true,
            msg: 'This is not your first time device'
        });
    }

    //create and assign a token 
    const token = jwt.sign({
        _id: user._id
    }, process.env.TOKEN_SECRET);

    return res.send({
        msg: 'success',
        token
    });
});

module.exports = router;
