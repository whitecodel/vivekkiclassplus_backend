const router = require("express").Router();
const Sociologytest = require("../../models/Sociologytest");
const { NotLoggedIn } = require("../../middlewares/Auth");
// const { notify } = require('../backend-routes/video');
const { NoActivePlan } = require("../../middlewares/Plan");
const root = process.cwd();

router.post("/", [NotLoggedIn, NoActivePlan], async (req, res) => {
  var error = false;
  var msg;
  try {
    if (!req.activePlan.notes) {
      return res.send({
        error: true,
        msg: "No active plan to access this content",
      });
    }
    const sociologytests = await Sociologytest.find({
      category: req.body.category,
    }).sort({
      created_at: 1,
    });
    msg = sociologytests;
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

router.post(
  "/getsociologytest",
  [NotLoggedIn, NoActivePlan],
  async (req, res) => {
    var error = false;
    var msg;
    try {
      if (!req.activePlan.notes) {
        return res.send({
          error: true,
          msg: "No active plan to access this content",
        });
      }
      const sociologytest = await Sociologytest.findById(req.body.id);
      msg = sociologytest;
    } catch (err) {
      error = true;
      msg = "Something went wrong please try again later";
    }
    return res.send({
      error,
      msg,
    });
  }
);

module.exports = router;
