const Plan = require('../models/Plan');

const NoActivePlan = async (req, res, next) => {
    const plans = await Plan.find({
        user: req.user._id
    });
    const activePlan = await longWork(plans);
    console.log(activePlan)
    req.activePlan = activePlan;
    next();
}

const longWork = (plans) => {
    return new Promise((resolve, reject) => {
        plans.forEach(p => {
            if (Date.now() <= parseInt(p.active_date) + 1000 * 60 * 60 * 24 * 30 * parseInt(p.months)) {
                let notes;
                let videos;
                let sociology_notes;
                let sociology_videos;
                p.notes ? notes = true : notes = false;
                p.videos ? videos = true : videos = false;
                p.sociology_notes ? sociology_notes = true : sociology_notes = false;
                p.sociology_videos ? sociology_videos = true : sociology_videos = false;
                resolve({
                    notes,
                    videos,
                    sociology_notes,
                    sociology_videos

                });
            }
        });
        resolve({
            notes: false,
            videos: false,
            sociology_videos: false,
            sociology_notes: false
        });
    });
}

module.exports = {
    NoActivePlan
}