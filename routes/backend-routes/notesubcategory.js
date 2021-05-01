const router = require('express').Router();
const Notesubcategory = require('../../models/Notesubcategory');
const {
    NotLoggedIn
} = require('../../middlewares/Adminauth');
const moment = require('moment');
const Note = require('../../models/Note');
const fs = require('fs');

router.get('/note-subcategories', NotLoggedIn, async (req, res) => {
    try {
        let notesubcategories = await Notesubcategory.find({
            category: req.query.id,
        }).sort({
            created_at: -1
        });
        notesubcategories = await formatData(notesubcategories);
        return res.render('admin/note-subcategories', {
            notesubcategories
        });
    } catch (error) {
        return res.send('Something went wrong please try again later');
    }
});

router.post('/note-subcategories/addnewnotesubcategory', NotLoggedIn, async (req, res) => {
    try {
        const notesubcategory = Notesubcategory({
            category: req.body.category,
            name: req.body.name,
        });
        await notesubcategory.save();
        return res.send('success');
    } catch (error) {
        console.log(error)
        return res.send('Somthing went wrong please try again later');
    }
});

router.post('/note-subcategories/editnotesubcategory', NotLoggedIn, async (req, res) => {
    try {
        await Notesubcategory.findOneAndUpdate({
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

router.post('/note-subcategories/deletenotesubcategory', NotLoggedIn, async (req, res) => {
    try {
        const notes = await Note.find({
            category: req.body.id,
        });
        if(notes.length > 0) {
            return res.send('Category contains data you can not delete');
        }
        // notes.forEach(async note => {
        //     fs.unlinkSync('public/dist/thumbnail/' + note.thumbnail);
        //     fs.unlinkSync('notes/' + note.basename);
        //     await Note.findOneAndDelete({
        //         _id: note.id
        //     });
        // });
        await Notesubcategory.findOneAndDelete({
            _id: req.body.id
        })
        return res.send('success');
    } catch (error) {
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