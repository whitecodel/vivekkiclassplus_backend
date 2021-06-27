const router = require("express").Router();
const Videocategory = require("../../models/Videocategory");
const { NotLoggedIn } = require("../../middlewares/Adminauth");
const moment = require("moment");
const Videosubcategory = require("../../models/Videosubcategory");
const Video = require("../../models/Video");
const fs = require("fs");

router.get("/video-categories", NotLoggedIn, async (req, res) => {
  try {
    let videocategories = await Videocategory.find().sort({
      created_at: -1,
    });
    videocategories = await formatData(videocategories);
    return res.render("admin/video-categories", {
      videocategories,
    });
  } catch (error) {
    return res.send("Something went wrong please try again later");
  }
});

router.post(
  "/video-categories/addnewvideocategory",
  NotLoggedIn,
  async (req, res) => {
    try {
      const videocategory = Videocategory({
        name: req.body.name,
        subcategory: req.body.subcategory,
      });
      await videocategory.save();
      return res.send("success");
    } catch (error) {
      console.log(error);
      return res.send("Somthing went wrong please try again later");
    }
  }
);

router.post(
  "/video-categories/editvideocategory",
  NotLoggedIn,
  async (req, res) => {
    try {
      await Videocategory.findOneAndUpdate(
        {
          _id: req.body.id,
        },
        {
          name: req.body.name,
          last_update_time: Date.now(),
        }
      );
      return res.send("success");
    } catch (error) {
      return res.send("Somthing went wrong please try again later");
    }
  }
);

router.post(
  "/video-categories/deletevideocategory",
  NotLoggedIn,
  async (req, res) => {
    try {
      const videocategory = await Videocategory.findOne({
        _id: req.body.id,
      });

      if (videocategory.subcategory) {
        const videosubcategories = await Videosubcategory.find({
          category: req.body.id,
        });
        if (videosubcategories.length > 0) {
          return res.send("Category contains data you can not delete");
        }
        // videosubcategories.forEach(async videosubcategory => {
        //     const videos = await Video.find({
        //         category: videosubcategory._id,
        //     });
        //     videos.forEach(async video => {
        //         fs.unlinkSync('public/dist/thumbnail/' + video.thumbnail);
        //         // fs.unlinkSync('videos/360p/' + video.basename);
        //         fs.unlinkSync('videos/480p/' + video.basename);
        //         fs.unlinkSync('videos/720p/' + video.basename);
        //         // fs.unlinkSync('videos/1080p/' + video.basename);
        //         await Video.findOneAndDelete({
        //             _id: video.id
        //         });
        //     });
        //     await Videosubcategory.findOneAndDelete({
        //         _id: videosubcategory._id
        //     });
        // });
      } else {
        const videos = await Video.find({
          category: videocategory._id,
        });
        if (videos.length > 0) {
          return res.send("Category contains data you can not delete");
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
      }
      await Videocategory.findOneAndDelete({
        _id: videocategory._id,
      });
      return res.send("success");
    } catch (error) {
      console.log(error);
      return res.send("Somthing went wrong please try again later");
    }
  }
);

const formatData = (data) => {
  return new Promise(async (resolve, reject) => {
    for (var i in data) {
      data[i].created_at = moment(parseInt(data[i].created_at)).format(
        "MMM DD HH:MM, YYYY"
      );
      data[i].last_update_time = moment(
        parseInt(data[i].last_update_time)
      ).format("MMM DD HH:MM, YYYY");
    }
    resolve(data);
  });
};

module.exports = router;
