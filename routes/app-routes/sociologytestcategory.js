const router = require("express").Router();
const SociologyTestcategory = require("../../models/Sociologytestcategory");
const { NotLoggedIn } = require("../../middlewares/Auth");
const { NoActivePlan } = require("../../middlewares/Plan");

router.get("/", [NotLoggedIn, NoActivePlan], async (req, res) => {
  try {
    if (!req.activePlan.sociology_videos) {
      return res.send({
        error: true,
        msg: "No active plan to access this content",
      });
    }
    const sociologytestcategories = await SociologyTestcategory.find().sort({
      created_at: -1,
    });
    return res.send({
      error: false,
      msg: sociologytestcategories,
    });
  } catch (error) {
    console.log(error);
    return res.send({
      error: true,
      msg: "Something went wrong please try agian later",
    });
  }
});

module.exports = router;
