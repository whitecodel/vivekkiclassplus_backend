const router = require('express').Router();
const SociologyVideosubcategory = require('../../models/SociologyVideosubcategory');
const {
    NotLoggedIn
} = require('../../middlewares/Adminauth');
const moment = require('moment');
const SociologyVideo = require('../../models/SociologyVideo');
const fs = require('fs')

router.get('/sociology-video-subcategories', NotLoggedIn, async (req, res) => {
    try {
        let sociologyvideosubcategories = await SociologyVideosubcategory.find({
            category: req.query.id,
        }).sort({
            created_at: -1
        });
        sociologyvideosubcategories = await formatData(sociologyvideosubcategories);
        return res.render('admin/sociology-video-subcategories', {
            sociologyvideosubcategories
        });
    } catch (error) {
        return res.send('Something went wrong please try again later');
    }
});

router.post('/sociology-video-subcategories/addnewvideosubcategory', NotLoggedIn, async (req, res) => {
    try {
        const sociologyvideosubcategory = SociologyVideosubcategory({
            category: req.body.category,
            name: req.body.name,
        });
        await sociologyvideosubcategory.save();
        return res.send('success');
    } catch (error) {
        console.log(error)
        return res.send('Somthing went wrong please try again later');
    }
});

router.post('/sociology-video-subcategories/editvideosubcategory', NotLoggedIn, async (req, res) => {
    try {
        await SociologyVideosubcategory.findOneAndUpdate({
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

router.post('/sociology-video-subcategories/deletevideosubcategory', NotLoggedIn, async (req, res) => {
    try {
        const sociologyvideos = await SociologyVideo.find({
            category: req.body.id,
        });
        if(sociologyvideos.length > 0) {
            return res.send('Category contains data you can not delete');
        }
        // sociologyvideos.forEach(async sociologyvideo => {
        //     fs.unlinkSync('public/dist/thumbnail/sociology/' + sociologyvideo.thumbnail);
        //     // fs.unlinkSync('videos/sociology/360p/' + sociologyvideo.basename);
        //     fs.unlinkSync('videos/sociology/480p/' + sociologyvideo.basename);
        //     fs.unlinkSync('videos/sociology/720p/' + sociologyvideo.basename);
        //     // fs.unlinkSync('videos/sociology/1080p/' + sociologyvideo.basename);
        //     await SociologyVideo.findOneAndDelete({
        //         _id: sociologyvideo.id
        //     });
        // });
        await SociologyVideosubcategory.findOneAndDelete({
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