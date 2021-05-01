const router = require('express').Router();
const Notecategory = require('../../models/Notecategory');
const {
    NotLoggedIn
} = require('../../middlewares/Adminauth');
const moment = require('moment');
const Notesubcategory = require('../../models/Notesubcategory');
const Note = require('../../models/Note');
const fs = require('fs');

router.get('/note-categories', NotLoggedIn, async (req, res) => {
    try {
        let notecategories = await Notecategory.find().sort({
            created_at: -1
        });
        notecategories = await formatData(notecategories);
        return res.render('admin/note-categories', {
            notecategories
        });
    } catch (error) {
        return res.send('Something went wrong please try again later');
    }
});

router.post('/note-categories/addnewnotecategory', NotLoggedIn, async (req, res) => {
    try {
        const notecategory = Notecategory({
            name: req.body.name,
            subcategory: req.body.subcategory
        });
        await notecategory.save();
        return res.send('success');
    } catch (error) {
        console.log(error)
        return res.send('Somthing went wrong please try again later');
    }
});

router.post('/note-categories/editnotecategory', NotLoggedIn, async (req, res) => {
    try {
        await Notecategory.findOneAndUpdate({
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

router.post('/note-categories/deletenotecategory', NotLoggedIn, async (req, res) => {
    try {
        const notecategory = await Notecategory.findOne({
            _id: req.body.id,
        });

        if (notecategory.subcategory) {
            const notesubcategories = await Notesubcategory.find({
                category: req.body.id,
            });
            if(notesubcategories.length > 0) {
                return res.send('Category contains data you can not delete');
            }
            // notesubcategories.forEach(async notesubcategory => {
            //     const notes = await Note.find({
            //         category: notesubcategory._id,
            //     });
            //     notes.forEach(async note => {
            //         fs.unlinkSync('public/dist/thumbnail/' + note.thumbnail);
            //         fs.unlinkSync('notes/' + note.basename);
            //         await Note.findOneAndDelete({
            //             _id: note._id
            //         });
            //     });
            //     await Notesubcategory.findOneAndDelete({
            //         _id: notesubcategory._id
            //     });
            // });
        } else {
            const notes = await Note.find({
                category: notecategory._id,
            });
            if(notes.length > 0) {
                return res.send('Category contains data you can not delete');
            }
            // notes.forEach(async note => {
            //     fs.unlinkSync('public/dist/thumbnail/' + note.thumbnail);
            //     fs.unlinkSync('notes/' + note.basename);
            //     await Note.findOneAndDelete({
            //         _id: note._id
            //     });
            // });
        }
        await Notecategory.findOneAndDelete({
            _id: notecategory._id
        });
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