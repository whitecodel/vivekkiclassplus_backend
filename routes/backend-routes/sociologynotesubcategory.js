const router = require('express').Router();
const SociologyNotesubcategory = require('../../models/SociologyNotesubcategory');
const {
    NotLoggedIn
} = require('../../middlewares/Adminauth');
const moment = require('moment');
const SociologyNote = require('../../models/SociologyNote');
const fs = require('fs');

router.get('/sociology-note-subcategories', NotLoggedIn, async (req, res) => {
    try {
        let sociologynotesubcategories = await SociologyNotesubcategory.find({
            category: req.query.id,
        }).sort({
            created_at: -1
        });
        sociologynotesubcategories = await formatData(sociologynotesubcategories);
        return res.render('admin/sociology-note-subcategories', {
            sociologynotesubcategories
        });
    } catch (error) {
        return res.send('Something went wrong please try again later');
    }
});

router.post('/sociology-note-subcategories/addnewnotesubcategory', NotLoggedIn, async (req, res) => {
    try {
        const sociologynotesubcategory = SociologyNotesubcategory({
            category: req.body.category,
            name: req.body.name,
        });
        await sociologynotesubcategory.save();
        return res.send('success');
    } catch (error) {
        console.log(error)
        return res.send('Somthing went wrong please try again later');
    }
});

router.post('/sociology-note-subcategories/editnotesubcategory', NotLoggedIn, async (req, res) => {
    try {
        await SociologyNotesubcategory.findOneAndUpdate({
            _id: req.body.id
        }, {
            name: req.body.name,
            last_update_time: Date.now()
        })
        return res.send('success');
    } catch (error) {
        return res.send('Somthing went wrong please try again later');
    }
});

router.post('/sociology-note-subcategories/deletenotesubcategory', NotLoggedIn, async (req, res) => {
    try {
        const sociologynotes = await SociologyNote.find({
            category: req.body.id,
        });
        if (sociologynotes.length > 0) {
            return res.send('Category contains data you can not delete');
        }
        // sociologynotes.forEach(async sociologynote => {
        //     fs.unlinkSync('public/dist/thumbnail/sociology/' + sociolgoynote.thumbnail);
        //     fs.unlinkSync('notes/sociology/' + sociologynote.basename);
        //     await SociologyNote.findOneAndDelete({
        //         _id: sociologynote.id
        //     });
        // });
        await SociologyNotesubcategory.findOneAndDelete({
            _id: req.body.id
        })
        return res.send('success');
    } catch (error) {
        console.log(error)
        return res.send('Somthing went wrong please try again later');
    }
});

const formatData = (data) => {
    return new Promise(async (resolve, reject) => {
        for (var i in data) {
            data[i].created_at = moment(parseInt(data[i].created_at)).format('MMM DD HH:MM, YYYY');
            data[i].last_update_time = moment(parseInt(data[i].last_update_time)).format('MMM DD HH:MM, YYYY');
        }
        resolve(data);
    });
}

module.exports = router