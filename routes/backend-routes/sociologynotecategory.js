const router = require('express').Router();
const SociologyNotecategory = require('../../models/SociologyNotecategory');
const {
    NotLoggedIn
} = require('../../middlewares/Adminauth');
const moment = require('moment');
const SociologyNotesubcategory = require('../../models/SociologyNotesubcategory');
const SociologyNote = require('../../models/SociologyNote');
const fs = require('fs');

router.get('/sociology-note-categories', NotLoggedIn, async (req, res) => {
    try {
        let sociologynotecategories = await SociologyNotecategory.find().sort({
            created_at: -1
        });
        sociologynotecategories = await formatData(sociologynotecategories);
        return res.render('admin/sociology-note-categories', {
            sociologynotecategories
        });
    } catch (error) {
        console.log(error)
        return res.send('Something went wrong please try again later');
    }
});

router.post('/sociology-note-categories/addnewnotecategory', NotLoggedIn, async (req, res) => {
    try {
        const sociologynotecategory = SociologyNotecategory({
            name: req.body.name,
            subcategory: req.body.subcategory
        });
        await sociologynotecategory.save();
        return res.send('success');
    } catch (error) {
        console.log(error)
        return res.send('Somthing went wrong please try again later');
    }
});

router.post('/sociology-note-categories/editnotecategory', NotLoggedIn, async (req, res) => {
    try {
        await SociologyNotecategory.findOneAndUpdate({
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

router.post('/sociology-note-categories/deletenotecategory', NotLoggedIn, async (req, res) => {
    try {
        const sociologynotecategory = await SociologyNotecategory.findOne({
            _id: req.body.id,
        });

        if (sociologynotecategory.subcategory) {
            const sociologynotesubcategories = await SociologyNotesubcategory.find({
                category: req.body.id,
            });
            if (sociologynotesubcategories.length > 0) {
                return res.send('Category contains data you can not delete');
            }
            // sociologynotesubcategories.forEach(async sociologynotesubcategory => {
            //     const sociologynotes = await SociologyNote.find({
            //         category: sociologynotesubcategory._id,
            //     });
            //     sociologynotes.forEach(async note => {
            //         fs.unlinkSync('public/dist/thumbnail/sociology/' + note.thumbnail);
            //         fs.unlinkSync('notes/sociology/' + note.basename);
            //         await SociologyNote.findOneAndDelete({
            //             _id: note._id
            //         });
            //     });
            //     await SociologyNotesubcategory.findOneAndDelete({
            //         _id: sociologynotesubcategory._id
            //     });
            // });
        } else {
            const sociologynotes = await SociologyNote.find({
                category: sociologynotecategory._id,
            });
            if (sociologynotes.length > 0) {
                return res.send('Category contains data you can not delete');
            }
            // sociologynotes.forEach(async note => {
            //     fs.unlinkSync('public/dist/thumbnail/sociology/' + note.thumbnail);
            //     fs.unlinkSync('notes/sociology/' + note.basename);
            //     await SociologyNote.findOneAndDelete({
            //         _id: note._id
            //     });
            // });
        }
        await SociologyNotecategory.findOneAndDelete({
            _id: sociologynotecategory._id
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