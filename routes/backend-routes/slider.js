const router = require('express').Router();
const Slider = require('../../models/Slider');
const {
    NotLoggedIn
} = require('../../middlewares/Adminauth');
const multer = require('multer');
const path = require('path');
const root = process.cwd();
const imageFilter = require('../../config/imageFilter');
const fs = require('fs');
const moment = require('moment');

// Set The Storage Engine
const storage = multer.diskStorage({
    destination: path.join(root, '/public/dist/sliders'),
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

router.get('/sliders', NotLoggedIn, async (req, res) => {
    try {
        let sliders = await Slider.find().sort({
            created_at: -1
        });
        sliders = await formatData(sliders);
        return res.render('admin/sliders', {
            sliders
        });
    } catch (error) {
        return res.send('Something went wrong please try again later');
    }
});

router.post('/sliders/addnewslider', NotLoggedIn, async (req, res) => {
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
            const slider = Slider({
                basename: req.file.filename,
            });
            await slider.save();
            return res.send('success');
        });
    } catch (error) {
        console.log(error)
        return res.send('Somthing went wrong please try again later');
    }
});

router.post('/sliders/deleteslider', NotLoggedIn, async (req, res) => {
    try {
        const slider = await Slider.findOne({
            _id: req.body.id
        });
        fs.unlinkSync(root + '/public/dist/sliders/' + slider.basename);
        await Slider.deleteOne({
            _id: slider.id
        });
        return res.send('success');
    } catch (error) {
        return res.send('Something went wrong please try again later');
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