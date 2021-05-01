const router = require('express').Router();
const Qstudent = require('../../models/Qstudent');
const {
    NotLoggedIn
} = require('../../middlewares/Adminauth');
const multer = require('multer');
const path = require('path');
const root = process.cwd();
const imageFilter = require('../../config/imageFilter');
const fs = require('fs');

// Set The Storage Engine
const storage = multer.diskStorage({
    destination: path.join(root, '/public/dist/qstudents'),
    filename: function (req, file, cb) {
        cb(null, `${Date.now()}.jpg`);
    }
});

// Init Upload
const upload = multer({
    storage: storage,
    // limits: {
    //     fileSize: 5000000
    // },
    fileFilter: imageFilter
}).single('image');

// Init Upload
const editupload = multer({
    storage: storage,
    // limits: {
    //     fileSize: 5000000
    // },
    fileFilter: imageFilter
}).single('editimage');

router.get('/qstudents', NotLoggedIn, async (req, res) => {
    try {
        const qstudents = await Qstudent.find().sort({
            created_at: -1
        });
        return res.render('admin/qstudents', {
            qstudents
        });
    } catch (error) {
        return res.send('Something went wrong please try again later');
    }
});

router.post('/qstudents/addnewqstudent', NotLoggedIn, async (req, res) => {
    try {
        upload(req, res, async function (err) {
            if (req.fileValidationError) {
                return res.send(req.fileValidationError);
            } else if (!req.file) {
                return res.send('Please upload an image');
            } else if (err instanceof multer.MulterError) {
                console.log(err);
                return res.send(err);
            } else if (err) {
                console.log(err);
                return res.send(err);
            }

            const qstudent = Qstudent({
                image: req.file.filename,
                name: req.body.name,
                subject: req.body.subject,
                qexam: req.body.qexam,
                roll_number: req.body.roll_number
            });
            await qstudent.save();
            return res.send('success');
        });
    } catch (error) {
        console.log(error);
        return res.send('Somthing went wrong please try again later');
    }
});

router.post('/qstudents/editqstudent', NotLoggedIn, async (req, res) => {
    try {
        editupload(req, res, async function (err) {
            if (req.fileValidationError) {
                return res.send(req.fileValidationError);
            } else if (err instanceof multer.MulterError) {
                console.log(err);
                return res.send(err);
            } else if (err) {
                console.log(err);
                return res.send(err);
            }

            const qstudent = await Qstudent.findOne({
                _id: req.body.editid
            });
    
            await Qstudent.findOneAndUpdate({
                _id: req.body.editid
            }, {
                image: req.file ? req.file.filename : qstudent.image,
                name: req.body.editname,
                subject: req.body.editsubject,
                qexam: req.body.editqexam,
                roll_number: req.body.editroll_number,
                last_update_time: Date.now()
            });
            
            if(req.file) {
                fs.unlinkSync(root + '/public/dist/qstudents/' + qstudent.image);
            }
            return res.send('success');
        });
    } catch (error) {
        console.log(error)
        return res.send('Somthing went wrong please try again later');
    }
});

router.post('/qstudents/deleteqstudent', NotLoggedIn, async (req, res) => {
    try {
        const qstudent = await Qstudent.findOne({
            _id: req.body.id
        });
        fs.unlinkSync(root + '/public/dist/qstudents/' + qstudent.image);
        await Qstudent.deleteOne({
            _id: qstudent.id
        });
        return res.send('success');
    } catch (error) {
        return res.send('Something went wrong please try again later');
    }
});

module.exports = router