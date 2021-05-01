const router = require('express').Router();
const Contact = require('../../models/Contact');
const {
    NotLoggedIn
} = require('../../middlewares/Adminauth');

router.get('/contact', NotLoggedIn, async (req, res) => {
    const saved = await Contact.findOne();
    const content = saved ? saved.content : '';
    res.render('admin/contact', {content});
});

router.post('/contact/update', NotLoggedIn, async (req, res) => {
    const formData = req.body;

    const exist = await Contact.find();
    if (exist.length == 0) {
        const contact = Contact(formData);

        try {
            const saved = await contact.save();
            return res.send(saved);
        } catch (error) {
            console.log(error);
            return res.send('error');
        }
    } else {
        try {
            await Contact.findOneAndUpdate({
                content: formData.content,
                last_update_time: Date.now()
            });
            const saved = await Contact.findOne();
            return res.send(saved);
        } catch (error) {
            console.log(error);
            return res.send('error');
        }
    }
});

module.exports = router