const router = require("express").Router();
const PpNotecategory = require("../../models/PpNotecategory");
const { NotLoggedIn } = require("../../middlewares/Adminauth");
const moment = require("moment");
const PpNotesubcategory = require("../../models/PpNotesubcategory");
const PpNote = require("../../models/PpNote");
const fs = require("fs");

router.get("/pp-note-categories", NotLoggedIn, async (req, res) => {
  try {
    let ppnotecategories = await PpNotecategory.find().sort({
      created_at: -1,
    });
    ppnotecategories = await formatData(ppnotecategories);
    return res.render("admin/pp-note-categories", {
      ppnotecategories,
    });
  } catch (error) {
    console.log(error);
    return res.send("Something went wrong please try again later");
  }
});

router.post(
  "/pp-note-categories/addnewnotecategory",
  NotLoggedIn,
  async (req, res) => {
    try {
      const ppnotecategory = PpNotecategory({
        name: req.body.name,
        subcategory: req.body.subcategory,
      });
      await ppnotecategory.save();
      return res.send("success");
    } catch (error) {
      console.log(error);
      return res.send("Somthing went wrong please try again later");
    }
  }
);

router.post(
  "/pp-note-categories/editnotecategory",
  NotLoggedIn,
  async (req, res) => {
    try {
      await PpNotecategory.findOneAndUpdate(
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
  "/pp-note-categories/deletenotecategory",
  NotLoggedIn,
  async (req, res) => {
    try {
      const ppnotecategory = await PpNotecategory.findOne({
        _id: req.body.id,
      });

      if (ppnotecategory.subcategory) {
        const ppnotesubcategories = await PpNotesubcategory.find({
          category: req.body.id,
        });
        if (ppnotesubcategories.length > 0) {
          return res.send("Category contains data you can not delete");
        }
        // ppnotesubcategories.forEach(async ppnotesubcategory => {
        //     const ppnotes = await PpNote.find({
        //         category: ppnotesubcategory._id,
        //     });
        //     ppnotes.forEach(async note => {
        //         fs.unlinkSync('public/dist/thumbnail/pp/' + note.thumbnail);
        //         fs.unlinkSync('notes/pp/' + note.basename);
        //         await PpNote.findOneAndDelete({
        //             _id: note._id
        //         });
        //     });
        //     await PpNotesubcategory.findOneAndDelete({
        //         _id: ppnotesubcategory._id
        //     });
        // });
      } else {
        const ppnotes = await PpNote.find({
          category: ppnotecategory._id,
        });
        if (ppnotes.length > 0) {
          return res.send("Category contains data you can not delete");
        }
        // ppnotes.forEach(async note => {
        //     fs.unlinkSync('public/dist/thumbnail/pp/' + note.thumbnail);
        //     fs.unlinkSync('notes/pp/' + note.basename);
        //     await PpNote.findOneAndDelete({
        //         _id: note._id
        //     });
        // });
      }
      await PpNotecategory.findOneAndDelete({
        _id: ppnotecategory._id,
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
