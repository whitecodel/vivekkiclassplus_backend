const router = require("express").Router();
const PpVideocategory = require("../../models/PpVideocategory");
const { NotLoggedIn } = require("../../middlewares/Adminauth");
const moment = require("moment");
const PpVideosubcategory = require("../../models/PpVideosubcategory");
const PpVideo = require("../../models/PpVideo");
const fs = require("fs");

router.get("/pp-video-categories", NotLoggedIn, async (req, res) => {
  try {
    let ppvideocategories = await PpVideocategory.find().sort({
      created_at: -1,
    });
    ppvideocategories = await formatData(ppvideocategories);
    return res.render("admin/pp-video-categories", {
      ppvideocategories,
    });
  } catch (error) {
    return res.send("Something went wrong please try again later");
  }
});

router.post(
  "/pp-video-categories/addnewvideocategory",
  NotLoggedIn,
  async (req, res) => {
    try {
      const ppvideocategory = PpVideocategory({
        name: req.body.name,
        subcategory: req.body.subcategory,
      });
      await ppvideocategory.save();
      return res.send("success");
    } catch (error) {
      console.log(error);
      return res.send("Somthing went wrong please try again later");
    }
  }
);

router.post(
  "/pp-video-categories/editvideocategory",
  NotLoggedIn,
  async (req, res) => {
    try {
      await PpVideocategory.findOneAndUpdate(
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
  "/pp-video-categories/deletevideocategory",
  NotLoggedIn,
  async (req, res) => {
    try {
      const ppvideocategory = await PpVideocategory.findOne({
        _id: req.body.id,
      });

      if (ppvideocategory.subcategory) {
        const ppvideosubcategories = await PpVideosubcategory.find({
          category: req.body.id,
        });
        if (ppvideosubcategories.length > 0) {
          return res.send("Category contains data you can not delete");
        }
        // ppvideosubcategories.forEach(async ppvideosubcategory => {
        //     const ppvideos = await PpVideo.find({
        //         category: ppvideosubcategory._id,
        //     });
        //     ppvideos.forEach(async video => {
        //         fs.unlinkSync('public/dist/thumbnail/pp' + ppvideo.thumbnail);
        //         // fs.unlinkSync('videos/pp/360p/' + ppvideo.basename);
        //         fs.unlinkSync('videos/pp/480p/' + ppvideo.basename);
        //         fs.unlinkSync('videos/pp/720p/' + ppvideo.basename);
        //         // fs.unlinkSync('videos/pp/1080p/' + ppvideo.basename);
        //         await PpVideo.findOneAndDelete({
        //             _id: sociogyvideo.id
        //         });
        //     });
        //     await ppVideosubcategory.findOneAndDelete({
        //         _id: ppvideosubcategory._id
        //     });
        // });
      } else {
        const ppvideos = await PpVideo.find({
          category: ppvideocategory._id,
        });
        if (ppvideos.length > 0) {
          return res.send("Category contains data you can not delete");
        }
        // ppvideos.forEach(async ppvideo => {
        //     fs.unlinkSync('public/dist/thumbnail/pp/' + ppvideo.thumbnail);
        //     // fs.unlinkSync('videos/pp/360p/' + ppvideo.basename);
        //     fs.unlinkSync('videos/pp/480p/' + ppvideo.basename);
        //     fs.unlinkSync('videos/pp/720p/' + ppvideo.basename);
        //     // fs.unlinkSync('videos/pp/1080p/' + ppvideo.basename);
        //     await PpVideo.findOneAndDelete({
        //         _id: ppvideo.id
        //     });
        // });
      }
      await PpVideocategory.findOneAndDelete({
        _id: ppvideocategory._id,
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
