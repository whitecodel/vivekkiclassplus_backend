const router = require('express').Router();
const SociologyVideocategory = require('../../models/SociologyVideocategory');
const {
    NotLoggedIn
} = require('../../middlewares/Adminauth');
const moment = require('moment');
const SociologyVideosubcategory = require('../../models/SociologyVideosubcategory');
const SociologyVideo = require('../../models/SociologyVideo');
const fs = require('fs');

router.get('/sociology-video-categories', NotLoggedIn, async (req, res) => {
    try {
        let sociologyvideocategories = await SociologyVideocategory.find().sort({
            created_at: -1
        });
        sociologyvideocategories = await formatData(sociologyvideocategories);
        return res.render('admin/sociology-video-categories', {
            sociologyvideocategories
        });
    } catch (error) {
        return res.send('Something went wrong please try again later');
    }
});

router.post('/sociology-video-categories/addnewvideocategory', NotLoggedIn, async (req, res) => {
    try {
        const sociologyvideocategory = SociologyVideocategory({
            name: req.body.name,
            subcategory: req.body.subcategory
        });
        await sociologyvideocategory.save();
        return res.send('success');
    } catch (error) {
        console.log(error)
        return res.send('Somthing went wrong please try again later');
    }
});

router.post('/sociology-video-categories/editvideocategory', NotLoggedIn, async (req, res) => {
    try {
        await SociologyVideocategory.findOneAndUpdate({
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

router.post('/sociology-video-categories/deletevideocategory', NotLoggedIn, async (req, res) => {
    try {
        const sociologyvideocategory = await SociologyVideocategory.findOne({
            _id: req.body.id,
        });

        if (sociologyvideocategory.subcategory) {
            const sociologyvideosubcategories = await SociologyVideosubcategory.find({
                category: req.body.id,
            });
            if(sociologyvideosubcategories.length > 0) {
                return res.send('Category contains data you can not delete');
            }
            // sociologyvideosubcategories.forEach(async sociologyvideosubcategory => {
            //     const sociologyvideos = await SociologyVideo.find({
            //         category: sociologyvideosubcategory._id,
            //     });
            //     sociologyvideos.forEach(async video => {
            //         fs.unlinkSync('public/dist/thumbnail/sociology' + sociologyvideo.thumbnail);
            //         // fs.unlinkSync('videos/sociology/360p/' + sociologyvideo.basename);
            //         fs.unlinkSync('videos/sociology/480p/' + sociologyvideo.basename);
            //         fs.unlinkSync('videos/sociology/720p/' + sociologyvideo.basename);
            //         // fs.unlinkSync('videos/sociology/1080p/' + sociologyvideo.basename);
            //         await SociologyVideo.findOneAndDelete({
            //             _id: sociogyvideo.id
            //         });
            //     });
            //     await sociologyVideosubcategory.findOneAndDelete({
            //         _id: sociologyvideosubcategory._id
            //     });
            // });
        } else {
            const sociologyvideos = await SociologyVideo.find({
                category: sociologyvideocategory._id,
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
        }
        await SociologyVideocategory.findOneAndDelete({
            _id: sociologyvideocategory._id
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