const router = require('express').Router();
const Announcement = require('../../models/Announcement');
const {
    NotLoggedIn
} = require('../../middlewares/Adminauth');

router.get('/announcement', NotLoggedIn, async (req, res) => {
    const saved = await Announcement.findOne();
    const content = saved ? saved.content : '';
    res.render('admin/announcement', {content});
});

router.post('/announcement/update', NotLoggedIn, async (req, res) => {
    const formData = req.body;

    const exist = await Announcement.find();
    if (exist.length == 0) {
        const announcement = Announcement(formData);

        try {
            const saved = await announcement.save();
            return res.send(saved);
        } catch (error) {
            console.log(error);
            return res.send('error');
        }
    } else {
        try {
            await Announcement.findOneAndUpdate({
                content: formData.content,
                last_update_time: Date.now()
            });
            const saved = await Announcement.findOne();
            return res.send(saved);
        } catch (error) {
            console.log(error);
            return res.send('error');
        }
    }
});

module.exports = router