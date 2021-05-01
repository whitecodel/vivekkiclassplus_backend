const router = require('express').Router();
const Videosubcategory = require('../../models/Videosubcategory');
const {
    NotLoggedIn
} = require('../../middlewares/Adminauth');
const moment = require('moment');
const Video = require('../../models/Video');
const fs = require('fs');

router.get('/video-subcategories', NotLoggedIn, async (req, res) => {
    try {
        let videosubcategories = await Videosubcategory.find({
            category: req.query.id,
        }).sort({
            created_at: -1
        });
        videosubcategories = await formatData(videosubcategories);
        return res.render('admin/video-subcategories', {
            videosubcategories
        });
    } catch (error) {
        return res.send('Something went wrong please try again later');
    }
});

router.post('/video-subcategories/addnewvideosubcategory', NotLoggedIn, async (req, res) => {
    try {
        const videosubcategory = Videosubcategory({
            category: req.body.category,
            name: req.body.name,
        });
        await videosubcategory.save();
        return res.send('success');
    } catch (error) {
        console.log(error)
        return res.send('Somthing went wrong please try again later');
    }
});

router.post('/video-subcategories/editvideosubcategory', NotLoggedIn, async (req, res) => {
    try {
        await Videosubcategory.findOneAndUpdate({
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

router.post('/video-subcategories/deletevideosubcategory', NotLoggedIn, async (req, res) => {
    try {
        const videos = await Video.find({
            category: req.body.id,
        });
        if (videos.length > 0) {
            return res.send('Category contains data you can not delete');
        }
        // videos.forEach(async video => {
        //     fs.unlinkSync('public/dist/thumbnail/' + video.thumbnail);
        //     // fs.unlinkSync('videos/360p/' + video.basename);
        //     fs.unlinkSync('videos/480p/' + video.basename);
        //     fs.unlinkSync('videos/720p/' + video.basename);
        //     // fs.unlinkSync('videos/1080p/' + video.basename);
        //     await Video.findOneAndDelete({
        //         _id: video.id
        //     });
        // });
        await Videosubcategory.findOneAndDelete({
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