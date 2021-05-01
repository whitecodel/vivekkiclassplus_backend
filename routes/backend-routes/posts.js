const router = require('express').Router();
const multer = require('multer');
const path = require('path');
const imageFilter = require('../../config/imageFilter');
const Post = require('../../models/Post');
const fs = require('fs');
const root = process.cwd();
const moment = require('moment');
const {
    NotLoggedIn
} = require('../../middlewares/Adminauth');

router.get('/posts', NotLoggedIn, async (req, res) => {
    try {
        let posts = await Post.find().sort({
            created_at: -1
        });
        posts = await formatData(posts);
        return res.render('admin/listpost', {
            posts
        });
    } catch (error) {
        console.log(error);
        return res.send('Something went wrong please try again later');
    }
});

router.get('/addpost', NotLoggedIn, (req, res) => {
    return res.render('admin/addpost');
});

router.get('/editpost', NotLoggedIn, async (req, res) => {
    const post = await Post.findOne({
        _id: req.param('id')
    });
    if (!post) {
        return res.send('post not found');
    }
    return res.render('admin/editpost', {
        post
    });
});
router.post('/addpost/postSubmit', NotLoggedIn, async (req, res) => {
    upload(req, res, async function (err) {
        // req.file contains information of uploaded file
        // req.body contains information of text fields, if there were any

        if (req.fileValidationError) {
            return res.send(req.fileValidationError);
        } else if (!req.file) {
            return res.send('Please select an image to upload');
        } else if (err instanceof multer.MulterError) {
            return res.send(err);
        } else if (err) {
            return res.send(err);
        }

        try {
            const post = Post({
                text: req.body.text,
                image: req.file.filename
            });
            await post.save();
            return res.send('Post saved successfully');
        } catch (error) {
            return res.send('Something went wrong please try again later');
        }
    });
});

router.post('/editpost/postSubmit', NotLoggedIn, async (req, res) => {
    upload(req, res, async function (err) {
        // data for update
        let data = {
            text: req.body.text,
            last_update_time: Date.now()
        };

        // req.file contains information of uploaded file
        // req.body contains information of text fields, if there were any

        if (req.fileValidationError) {
            return res.send(req.fileValidationError);
        } else if (req.file) {
            data.image = req.file.filename;
            fs.unlink(root + '/public/dist/post/' + req.body.oldImage, function (error) {
                if (error) {
                    console.log(error);
                }
            });
        } else if (err instanceof multer.MulterError) {
            return res.send(err);
        } else if (err) {
            return res.send(err);
        }

        try {
            await Post.findOneAndUpdate({
                _id: req.body.id
            }, data);
            return res.send('Post updated successfully');
        } catch (error) {
            console.log(error)
            return res.send('Something went wrong please try again later');
        }
    });
});

router.post('/deletepost/', NotLoggedIn, async (req, res) => {
    // res.setHeader('Content-Type', 'text/plain')
    try {
        const post = await Post.findOne({
            _id: req.body.id
        });
        fs.unlink(root + '/public/dist/post/' + post.image, function (error) {
            if (error) {
                console.log(error)
            }
        });
        await Post.deleteOne({
            _id: req.body.id
        });
        return res.send('success');
    } catch (error) {
        return res.send('Something went wrong please try again later');
    }
});

// Set The Storage Engine
const storage = multer.diskStorage({
    destination: path.join(__dirname, '/../../public/dist/post'),
    filename: function (req, file, cb) {
        cb(null, `${Date.now()}.jpg`);
    }
});

// Init Upload
const upload = multer({
    storage: storage,
    // limits: {
    //     fileSize: 1000000
    // },
    fileFilter: imageFilter
}).single('image');

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