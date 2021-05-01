const router = require('express').Router();
const Contact = require('../../models/Contact');

router.get('/', async (req, res) => {
    const saved = await Contact.findOne();
    const content = saved ? saved.content : '';
    res.render('app/base', {content});
});

module.exports = router;