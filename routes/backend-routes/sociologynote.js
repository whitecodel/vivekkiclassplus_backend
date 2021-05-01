const router = require('express').Router();
const SociologyNote = require('../../models/SociologyNote');
const multer = require('multer');
const path = require('path');
const pdfFilter = require('../../config/pdfFilter');
const fs = require('fs');
const root = process.cwd();
const ffmpeg = require('fluent-ffmpeg');
const {
    NotLoggedIn
} = require('../../middlewares/Adminauth');

// Set The Video Storage Engine
const storage = multer.diskStorage({
    destination: path.join(__dirname, '/../../tmp'),
    filename: function (req, files, cb) {
        if (files.fieldname == 'pdf') {
            cb(null, `${Date.now()}.pdf`);
        } else {
            cb(null, `${Date.now()}.jpg`);
        }
        
    }
});

// Init Video Upload
const upload = multer({
    storage: storage,
    // limits: {
    //     fileSize: 5000000
    // },
    fileFilter: pdfFilter
}).fields([{
    name: 'pdf',
    maxCount: 1
}, {
    name: 'thumbnail',
    maxCount: 1
}]);

router.get('/sociologynotes', NotLoggedIn, async (req, res) => {
    var category = req.query.id;
    const sociologynotes = await SociologyNote.find({category: category}).sort({
        created_at: -1
    });
    return res.render('admin/sociologylistnote', {
        sociologynotes, category
    });
});

router.get('/sociology-notes-add', NotLoggedIn, async (req, res) => {
    return res.render('admin/sociologynote');
});

router.post('/sociologynotes/addnote', NotLoggedIn, (req, res) => {
    upload(req, res, async function (err) {
        if (req.fileValidationError) {
            return res.send(req.fileValidationError);
        } else if (!req.files.pdf) {
            if (req.files.thumbnail) {
                fs.unlinkSync('tmp/' + req.files.thumbnail[0].filename);
            }
            return res.send('Please upload a note');
        } else if (!req.files.thumbnail) {
            if (req.files.video) {
                fs.unlinkSync('tmp/' + req.files.pdf[0].filename);
            }
            return res.send('Please upload a thumbnail');
        } else if (err instanceof multer.MulterError) {
            console.log(err);
            return res.send(err);
        } else if (err) {
            console.log(err);
            return res.send(err);
        }
        
        try {
            fs.rename('tmp/' + req.files.thumbnail[0].filename, 'public/dist/thumbnail/sociology/' + req.files.thumbnail[0].filename, function (err) {
                if (err) throw err
                console.log('Successfully renamed - AKA moved!');
            });
            fs.rename('tmp/' + req.files.pdf[0].filename, 'notes/sociology/' + req.files.pdf[0].filename, function (err) {
                if (err) throw err
                console.log('Successfully renamed - AKA moved!');
            });
            // fs.unlinkSync('tmp/' + req.files.thumbnail[0].filename);
            // fs.unlinkSync('tmp/' + req.files.pdf[0].filename);
            const sociologynote = SociologyNote({
                category: req.body.category,
                title: req.body.title,
                thumbnail: req.files.thumbnail[0].filename,
                basename: req.files.pdf[0].filename
            });
            await sociologynote.save();
            return res.send('success');
        } catch (error) {
            console.log(error)
            return res.send('Something went wrong please try again later');
        }
    });
});

router.post('/sociolgynotes/deletenote', NotLoggedIn, async (req, res) => {
    try {
        const sociologynote = await SociologyNote.findOne({_id: req.body.id});
        fs.unlinkSync('public/dist/thumbnail/sociology/' + sociologynote.thumbnail);
        fs.unlinkSync('notes/sociology/' + sociologynote.basename);
        await SociologyNote.deleteOne({_id: sociologynote.id});
        return res.send('success');
    } catch (error) {
        console.log(error)
        return res.send('Something went wrong please try again later');
    }
});

module.exports = router