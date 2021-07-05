const router = require("express").Router();
const NetjrfTestcategory = require("../../models/Netjrftestcategory");
const { NotLoggedIn } = require("../../middlewares/Auth");
const { NoActivePlan } = require("../../middlewares/Plan");

router.get("/", [NotLoggedIn, NoActivePlan], async (req, res) => {
  console.log("test");
  try {
    if (!req.activePlan.videos) {
      return res.send({
        error: true,
        msg: "No active plan to access this content",
      });
    }
    const netjrftestcategories = await NetjrfTestcategory.find().sort({
      created_at: -1,
    });
    return res.send({
      error: false,
      msg: netjrftestcategories,
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
