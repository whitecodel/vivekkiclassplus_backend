const router = require('express').Router();
const Announcement = require('../../models/Announcement');

router.get('/', async (req, res) => {
    const saved = await Announcement.findOne();
    const content = saved ? saved.content : '';
    res.render('app/base', {content});
});

module.exports = router;