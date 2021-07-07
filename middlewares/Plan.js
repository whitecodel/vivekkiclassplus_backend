const Plan = require("../models/Plan");

const NoActivePlan = async (req, res, next) => {
  const plans = await Plan.find({
    user: req.user._id,
  });
  const activePlan = await longWork(plans);
  // console.log(activePlan)
  req.activePlan = activePlan;
  next();
};

const longWork = (plans) => {
  return new Promise((resolve, reject) => {
    plans.forEach((p) => {
      if (
        Date.now() <=
        parseInt(p.active_date) + 1000 * 60 * 60 * 24 * 30 * parseInt(p.months)
      ) {
        let notes;
        let videos;
        let tests;
        let sociology_notes;
        let sociology_videos;
        let sociology_tests;
        let pp_notes;
        let pp_videos;
        let pp_tests;
        p.notes ? (notes = true) : (notes = false);
        p.videos ? (videos = true) : (videos = false);
        p.tests ? (tests = true) : (tests = false);
        p.sociology_notes
          ? (sociology_notes = true)
          : (sociology_notes = false);
        p.sociology_videos
          ? (sociology_videos = true)
          : (sociology_videos = false);
        p.sociology_tests
          ? (sociology_tests = true)
          : (sociology_tests = false);
        p.pp_notes ? (pp_notes = true) : (pp_notes = false);
        p.pp_videos ? (pp_videos = true) : (pp_videos = false);
        p.pp_tests ? (pp_tests = true) : (pp_tests = false);
        resolve({
          notes,
          videos,
          tests,
          sociology_notes,
          sociology_videos,
          sociology_tests,
          pp_notes,
          pp_videos,
          pp_tests,
        });
      }
    });
    resolve({
      notes: false,
      videos: false,
      tests: false,
      sociology_videos: false,
      sociology_notes: false,
      sociology_tests: false,
      pp_videos: false,
      pp_notes: false,
      pp_tests: false,
    });
  });
};

module.exports = {
  NoActivePlan,
};
