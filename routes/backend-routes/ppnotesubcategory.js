const router = require("express").Router();
const PpNotesubcategory = require("../../models/PpNotesubcategory");
const { NotLoggedIn } = require("../../middlewares/Adminauth");
const moment = require("moment");
const PpNote = require("../../models/PpNote");
const fs = require("fs");

router.get("/pp-note-subcategories", NotLoggedIn, async (req, res) => {
  try {
    let ppnotesubcategories = await PpNotesubcategory.find({
      category: req.query.id,
    }).sort({
      created_at: -1,
    });
    ppnotesubcategories = await formatData(ppnotesubcategories);
    return res.render("admin/pp-note-subcategories", {
      ppnotesubcategories,
    });
  } catch (error) {
    return res.send("Something went wrong please try again later");
  }
});

router.post(
  "/pp-note-subcategories/addnewnotesubcategory",
  NotLoggedIn,
  async (req, res) => {
    try {
      const ppnotesubcategory = PpNotesubcategory({
        category: req.body.category,
        name: req.body.name,
      });
      await ppnotesubcategory.save();
      return res.send("success");
    } catch (error) {
      console.log(error);
      return res.send("Somthing went wrong please try again later");
    }
  }
);

router.post(
  "/pp-note-subcategories/editnotesubcategory",
  NotLoggedIn,
  async (req, res) => {
    try {
      await PpNotesubcategory.findOneAndUpdate(
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
  "/pp-note-subcategories/deletenotesubcategory",
  NotLoggedIn,
  async (req, res) => {
    try {
      const ppnotes = await PpNote.find({
        category: req.body.id,
      });
      if (ppnotes.length > 0) {
        return res.send("Category contains data you can not delete");
      }
      // ppnotes.forEach(async ppnote => {
      //     fs.unlinkSync('public/dist/thumbnail/pp/' + sociolgoynote.thumbnail);
      //     fs.unlinkSync('notes/pp/' + ppnote.basename);
      //     await PpNote.findOneAndDelete({
      //         _id: ppnote.id
      //     });
      // });
      await PpNotesubcategory.findOneAndDelete({
        _id: req.body.id,
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
