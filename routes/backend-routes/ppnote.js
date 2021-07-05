const router = require("express").Router();
const PpNote = require("../../models/PpNote");
const multer = require("multer");
const path = require("path");
const pdfFilter = require("../../config/pdfFilter");
const fs = require("fs");
const root = process.cwd();
const ffmpeg = require("fluent-ffmpeg");
const { NotLoggedIn } = require("../../middlewares/Adminauth");

// Set The Video Storage Engine
const storage = multer.diskStorage({
  destination: path.join(__dirname, "/../../tmp"),
  filename: function (req, files, cb) {
    if (files.fieldname == "pdf") {
      cb(null, `${Date.now()}.pdf`);
    } else {
      cb(null, `${Date.now()}.jpg`);
    }
  },
});

// Init Video Upload
const upload = multer({
  storage: storage,
  // limits: {
  //     fileSize: 5000000
  // },
  fileFilter: pdfFilter,
}).fields([
  {
    name: "pdf",
    maxCount: 1,
  },
  {
    name: "thumbnail",
    maxCount: 1,
  },
]);

router.get("/ppnotes", NotLoggedIn, async (req, res) => {
  var category = req.query.id;
  const ppnotes = await PpNote.find({ category: category }).sort({
    created_at: -1,
  });
  return res.render("admin/pplistnote", {
    ppnotes,
    category,
  });
});

router.get("/pp-notes-add", NotLoggedIn, async (req, res) => {
  return res.render("admin/ppnote");
});

router.post("/ppnotes/addnote", NotLoggedIn, (req, res) => {
  upload(req, res, async function (err) {
    if (req.fileValidationError) {
      return res.send(req.fileValidationError);
    } else if (!req.files.pdf) {
      if (req.files.thumbnail) {
        fs.unlinkSync("tmp/" + req.files.thumbnail[0].filename);
      }
      return res.send("Please upload a note");
    } else if (!req.files.thumbnail) {
      if (req.files.video) {
        fs.unlinkSync("tmp/" + req.files.pdf[0].filename);
      }
      return res.send("Please upload a thumbnail");
    } else if (err instanceof multer.MulterError) {
      console.log(err);
      return res.send(err);
    } else if (err) {
      console.log(err);
      return res.send(err);
    }

    try {
      fs.rename(
        "tmp/" + req.files.thumbnail[0].filename,
        "public/dist/thumbnail/pp/" + req.files.thumbnail[0].filename,
        function (err) {
          if (err) throw err;
          console.log("Successfully renamed - AKA moved!");
        }
      );
      fs.rename(
        "tmp/" + req.files.pdf[0].filename,
        "notes/pp/" + req.files.pdf[0].filename,
        function (err) {
          if (err) throw err;
          console.log("Successfully renamed - AKA moved!");
        }
      );
      // fs.unlinkSync('tmp/' + req.files.thumbnail[0].filename);
      // fs.unlinkSync('tmp/' + req.files.pdf[0].filename);
      const ppnote = PpNote({
        category: req.body.category,
        title: req.body.title,
        thumbnail: req.files.thumbnail[0].filename,
        basename: req.files.pdf[0].filename,
      });
      await ppnote.save();
      return res.send("success");
    } catch (error) {
      console.log(error);
      return res.send("Something went wrong please try again later");
    }
  });
});

router.post("/ppnotes/deletenote", NotLoggedIn, async (req, res) => {
  try {
    const ppnote = await PpNote.findOne({ _id: req.body.id });
    fs.unlinkSync("public/dist/thumbnail/pp/" + ppnote.thumbnail);
    fs.unlinkSync("notes/pp/" + ppnote.basename);
    await PpNote.deleteOne({ _id: ppnote.id });
    return res.send("success");
  } catch (error) {
    console.log(error);
    return res.send("Something went wrong please try again later");
  }
});

module.exports = router;
