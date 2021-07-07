const router = require("express").Router();
const Pptest = require("../../models/Pptest");
const { NotLoggedIn } = require("../../middlewares/Auth");
// const { notify } = require('../backend-routes/video');
const { NoActivePlan } = require("../../middlewares/Plan");
const root = process.cwd();

router.post("/", [NotLoggedIn, NoActivePlan], async (req, res) => {
  var error = false;
  var msg;
  try {
    if (!req.activePlan.pp_tests) {
      return res.send({
        error: true,
        msg: "No active plan to access this content",
      });
    }
    const pptests = await Pptest.find({
      category: req.body.category,
    }).sort({
      created_at: 1,
    });
    msg = pptests;
  } catch (err) {
    console.log(err);
    error = true;
    msg = "Something went wrong please try again later";
  }
  return res.send({
    error,
    msg,
  });
});

router.post("/getpptest", [NotLoggedIn, NoActivePlan], async (req, res) => {
  var error = false;
  var msg;
  try {
    if (!req.activePlan.pp_tests) {
      return res.send({
        error: true,
        msg: "No active plan to access this content",
      });
    }
    const pptest = await Pptest.findById(req.body.id);
    msg = pptest;
  } catch (err) {
    error = true;
    msg = "Something went wrong please try again later";
  }
  return res.send({
    error,
    msg,
  });
});

module.exports = router;
