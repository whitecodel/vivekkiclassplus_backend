const router = require('express').Router();
const sendEmail = require('../../config/mailer');

router.post('/', async (req, res) => {
    try {
        var error = false;
        var msg;
        var name = req.body.name;
        var email = req.body.email;
        var phone = req.body.phone;
        var details = req.body.details;
        var body = `Name: ${name}\nEmail: ${email}\nPhone: ${phone}\nInquiry: ${details}\n`;
        var result = await sendEmail('Help', body);
        console.log('result: ', result);
        if (!result) {
            error = true;
            msg = 'Something went wrong please try again later';
        }
        msg = result;
    } catch (error) {
        console.log(error);
        error = true;
        msg = 'Something went wrong please try again later';
    }
    return res.send({
        error,
        msg
    });
});

module.exports = router