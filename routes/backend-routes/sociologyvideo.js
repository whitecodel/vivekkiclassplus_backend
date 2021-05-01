const router = require('express').Router();
const SociologyVideo = require('../../models/SociologyVideo');
const multer = require('multer');
const path = require('path');
const videoFilter = require('../../config/videoFilter');
const fs = require('fs');
const root = process.cwd();
const ffmpeg = require('fluent-ffmpeg');
const {
    NotLoggedIn
} = require('../../middlewares/Adminauth');

let percent = 0;

// Set The Video Storage Engine
const storage = multer.diskStorage({
    destination: path.join(__dirname, '/../../tmp'),
    filename: function (req, files, cb) {
        if (files.fieldname == 'video') {
            cb(null, `${Date.now()}.mp4`);
        } else {
            cb(null, `${Date.now()}.jpg`);
        }
    }
});

// Init Video Upload
const upload = multer({
    storage: storage,
    // limits: {
    //     fileSize: 500000000
    // },
    fileFilter: videoFilter
}).fields([{
    name: 'video',
    maxCount: 1
}, {
    name: 'thumbnail',
    maxCount: 1
}]);

router.get('/sociologyvideos', NotLoggedIn, async (req, res) => {
    var category = req.query.id;
    const sociologyvideos = await SociologyVideo.find({category: category}).sort({
        created_at: -1
    });
    return res.render('admin/sociologylistvideo', {
        sociologyvideos, category
    });
});

router.get('/sociology-videos-add', NotLoggedIn, async (req, res) => {
    return res.render('admin/sociologyvideo');
});

router.post('/sociologyvideos/addvideo', NotLoggedIn, (req, res) => {
    req.setTimeout(0);
    upload(req, res, async function (err) {
        if (req.fileValidationError) {
            return res.send(req.fileValidationError);
        } else if (!req.files.video) {
            if (req.files.thumbnail) {
                // fs.unlinkSync('tmp/' + req.files.thumbnail[0].filename);
            }
            return res.send('Please upload a video');
        } else if (!req.files.thumbnail) {
            if (req.files.video) {
                // fs.unlinkSync('tmp/' + req.files.video[0].filename);
            }
            return res.send('Please upload a thumbnail');
        } else if (err instanceof multer.MulterError) {
            console.log(err);
            return res.send(err);
        } else if (err) {
            console.log(err);
            return res.send(err);
        }

        const basename = baseName(req.files.video[0].path);
        const filename = 'tmp/' + basename + '.mp4'
        const video_path = 'videos/sociology/';

        ffmpeg(filename)
            // Generate 360P video
            // .output(video_path + '360p/' + basename + '.mp4')
            // .videoCodec('libx264')
            // .size('640x360')

            // Generate 480P video
            .output(video_path + '480p/' + basename + '.mp4')
            .videoCodec('libx264')
            .size('854x480')

            // Generate 720P video
            .output(video_path + '720p/' + basename + '.mp4')
            .videoCodec('libx264')
            .size('1280x720')

            // Generate 1080P video
            // .output(video_path + '1080p/' + basename + '.mp4')
            // .videoCodec('libx264')
            // .size('1920x1080')

            .on('error', function (err) {
		console.log(err);
		percent = 0;
                fs.unlinkSync(filename);
                return res.send('Something went wrong please try again later');

            })
            .on('progress', function (progress) {
                percent = parseInt(progress.percent);
                console.log(parseInt(progress.percent) + '% percent');

            })
            .on('end', async function () {
                try {
                    fs.rename('tmp/' + req.files.thumbnail[0].filename, 'public/dist/thumbnail/sociology/' + req.files.thumbnail[0].filename, function (err) {
                        if (err) throw err
                        console.log('Successfully renamed - AKA moved!')
                    })
                    fs.unlinkSync(filename);
                    const sociologyvideo = SociologyVideo({
                        category: req.body.category,
                        title: req.body.title,
                        thumbnail: req.files.thumbnail[0].filename,
                        basename: basename + '.mp4'
                    });
                    await sociologyvideo.save();
                    percent = 0;
                    return res.send('success');
                } catch (error) {
                    percent = 0;
                    return res.send('Something went wrong please try again later');
                }
            })
            .run();
    });
});

function baseName(str) {
    var base = new String(str).substring(str.lastIndexOf('/') + 1);
    if (base.lastIndexOf(".") != -1) {
        base = base.substring(0, base.lastIndexOf("."));
    }
    return base;
}

router.post('/sociologyvideos/deletevideo', NotLoggedIn, async (req, res) => {
    try {
        const sociologyvideo = await SociologyVideo.findOne({_id: req.body.id});
        fs.unlinkSync('public/dist/thumbnail/sociology/' + sociologyvideo.thumbnail);
        // fs.unlinkSync('videos/sociology/360p/' + sociologyvideo.basename);
        fs.unlinkSync('videos/sociology/480p/' + sociologyvideo.basename);
        fs.unlinkSync('videos/sociology/720p/' + sociologyvideo.basename);
        // fs.unlinkSync('videos/sociology/1080p/' + sociologyvideo.basename);
        await SociologyVideo.deleteOne({_id: sociologyvideo.id});
        return res.send('success');
    } catch (error) {
        console.log(error)
        return res.send('Something went wrong please try again later');
    }
});

router.get('/sociologyvideos/ffmpeg-progress', NotLoggedIn, (req, res) => {
    return res.send(parseInt(percent).toString());
});

module.exports = router
