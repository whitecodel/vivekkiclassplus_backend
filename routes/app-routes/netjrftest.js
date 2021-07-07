const router = require("express").Router();
const Netjrftest = require("../../models/Netjrftest");
const { NotLoggedIn } = require("../../middlewares/Auth");
// const { notify } = require('../backend-routes/video');
const { NoActivePlan } = require("../../middlewares/Plan");
const root = process.cwd();

router.post("/", [NotLoggedIn, NoActivePlan], async (req, res) => {
  var error = false;
  var msg;
  try {
    if (!req.activePlan.tests) {
      return res.send({
        error: true,
        msg: "No active plan to access this content",
      });
    }
    const netjrftests = await Netjrftest.find({
      category: req.body.category,
    }).sort({
      created_at: 1,
    });
    msg = netjrftests;
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

router.post("/getnetjrftest", [NotLoggedIn, NoActivePlan], async (req, res) => {
  var error = false;
  var msg;
  try {
    if (!req.activePlan.tests) {
      return res.send({
        error: true,
        msg: "No active plan to access this content",
      });
    }
    const netjrftest = await Netjrftest.findById(req.body.id);
    msg = netjrftest;
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
