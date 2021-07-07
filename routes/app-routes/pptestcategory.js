const router = require("express").Router();
const PpTestcategory = require("../../models/Pptestcategory");
const { NotLoggedIn } = require("../../middlewares/Auth");
const { NoActivePlan } = require("../../middlewares/Plan");

router.get("/", [NotLoggedIn, NoActivePlan], async (req, res) => {
  try {
    if (!req.activePlan.pp_tests) {
      return res.send({
        error: true,
        msg: "No active plan to access this content",
      });
    }
    const pptestcategories = await PpTestcategory.find().sort({
      created_at: -1,
    });
    return res.send({
      error: false,
      msg: pptestcategories,
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
