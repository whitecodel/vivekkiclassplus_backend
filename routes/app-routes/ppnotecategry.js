const router = require("express").Router();
const PpNotecategory = require("../../models/PpNotecategory");
const { NotLoggedIn } = require("../../middlewares/Auth");
const { NoActivePlan } = require("../../middlewares/Plan");

router.get("/", [NotLoggedIn, NoActivePlan], async (req, res) => {
  try {
    if (!req.activePlan.pp_notes) {
      return res.send({
        error: true,
        msg: "No active plan to access this content",
      });
    }
    const ppnotecategories = await PpNotecategory.find().sort({
      created_at: 1,
    });
    return res.send({
      error: false,
      msg: ppnotecategories,
    });
  } catch (error) {
    return res.send({
      error: true,
      msg: "Something went wrong please try agian later",
    });
  }
});

module.exports = router;
