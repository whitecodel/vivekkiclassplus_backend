const router = require("express").Router();
const PpVideosubcategory = require("../../models/PpVideosubcategory");
const { NotLoggedIn } = require("../../middlewares/Adminauth");
const moment = require("moment");
const PpVideo = require("../../models/PpVideo");
const fs = require("fs");

router.get("/pp-video-subcategories", NotLoggedIn, async (req, res) => {
  try {
    let ppvideosubcategories = await PpVideosubcategory.find({
      category: req.query.id,
    }).sort({
      created_at: -1,
    });
    ppvideosubcategories = await formatData(ppvideosubcategories);
    return res.render("admin/pp-video-subcategories", {
      ppvideosubcategories,
    });
  } catch (error) {
    return res.send("Something went wrong please try again later");
  }
});

router.post(
  "/pp-video-subcategories/addnewvideosubcategory",
  NotLoggedIn,
  async (req, res) => {
    try {
      const ppvideosubcategory = PpVideosubcategory({
        category: req.body.category,
        name: req.body.name,
      });
      await ppvideosubcategory.save();
      return res.send("success");
    } catch (error) {
      console.log(error);
      return res.send("Somthing went wrong please try again later");
    }
  }
);

router.post(
  "/pp-video-subcategories/editvideosubcategory",
  NotLoggedIn,
  async (req, res) => {
    try {
      await PpVideosubcategory.findOneAndUpdate(
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
  "/pp-video-subcategories/deletevideosubcategory",
  NotLoggedIn,
  async (req, res) => {
    try {
      const ppvideos = await PpVideo.find({
        category: req.body.id,
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
      await PpVideosubcategory.findOneAndDelete({
        _id: req.body.id,
      });
      return res.send("success");
    } catch (error) {
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
