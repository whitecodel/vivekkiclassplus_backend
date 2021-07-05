const router = require("express").Router();
const PpNotesubcategory = require("../../models/PpNotesubcategory");
const { NotLoggedIn } = require("../../middlewares/Auth");
const { NoActivePlan } = require("../../middlewares/Plan");

router.post("/", [NotLoggedIn, NoActivePlan], async (req, res) => {
  try {
    if (!req.activePlan.pp_notes) {
      return res.send({
        error: true,
        msg: "No active plan to access this content",
      });
    }
    const ppnotesubcategory = await PpNotesubcategory.find({
      category: req.body.category,
    }).sort({
      created_at: 1,
    });
    return res.send({
      error: false,
      msg: ppnotesubcategory,
    });
  } catch (error) {
    return res.send({
      error: true,
      msg: "Something went wrong please try agian later",
    });
  }
});

module.exports = router;
