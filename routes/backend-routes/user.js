const router = require("express").Router();
const User = require("../../models/User");
const Plan = require("../../models/Plan");
const { NotLoggedIn } = require("../../middlewares/Adminauth");
const bcrypt = require("bcrypt");
const moment = require("moment");
const path = require("path");
const root = process.cwd();
const reader = require("xlsx");
const excelFilter = require("../../config/excelFilter");
const multer = require("multer");
const json2xls = require("json2xls");
const fs = require("fs");

// Set The Video Storage Engine
const storage = multer.diskStorage({
  destination: path.join(__dirname, "/../../tmp"),
  filename: function (req, files, cb) {
    cb(null, `users.xlsx`);
  },
});

// Init Video Upload
const upload = multer({
  storage: storage,
  // limits: {
  //     fileSize: 5000000
  // },
  fileFilter: excelFilter,
}).single("excel");

router.get("/users", NotLoggedIn, async (req, res) => {
  try {
    d = new Date();
    console.log(d.toLocaleTimeString());
    let plans = await Plan.find().sort({
      active_date: -1,
    });
    plans = await formatData(plans);
    return res.render("admin/users", {
      plans,
    });
  } catch (error) {
    return res.send("Something went wrong please try again later");
  }
});

router.post("/users/addnewuser", NotLoggedIn, async (req, res) => {
  const phone = await User.findOne({
    phone: req.body.phone,
  });
  if (phone) return res.send("Mobile Number already registered");
  try {
    const user = User({
      name: req.body.name,
      phone: req.body.phone,
    });
    const savedUser = await user.save();
    const plan = Plan({
      user: savedUser._id,
      months: req.body.months,
      amount: req.body.amount,
      videos: req.body.videos,
      notes: req.body.notes,
      sociology_videos: req.body.sociology_videos,
      sociology_notes: req.body.sociology_notes,
    });
    await plan.save();
    return res.send("success");
  } catch (error) {
    console.log(error);
    return res.send("Somthing went wrong please try again later");
  }
});

router.post("/users/edituser", NotLoggedIn, async (req, res) => {
  let updateData;
  const phone = await User.findOne({
    _id: {
      $ne: req.body.id,
    },
    phone: req.body.phone,
  });
  if (phone) return res.send("Mobile Number already registered");
  try {
    await User.findOneAndUpdate(
      {
        _id: req.body.id,
      },
      {
        name: req.body.name,
        phone: req.body.phone,
        last_update_time: Date.now(),
      }
    );
    if (req.body.plan) {
      updateData = {
        months: req.body.months,
        amount: req.body.amount,
        videos: req.body.videos,
        notes: req.body.notes,
        sociology_videos: req.body.sociology_videos,
        sociology_notes: req.body.sociology_notes,
        last_update_time: Date.now(),
      };
    } else {
      updateData = {
        months: req.body.months,
        amount: req.body.amount,
        videos: req.body.videos,
        notes: req.body.notes,
        sociology_videos: req.body.sociology_videos,
        sociology_notes: req.body.sociology_notes,
        active_date: Date.now(),
        last_update_time: Date.now(),
      };
    }
    await Plan.updateOne(
      {
        user: req.body.id,
      },
      updateData
    );
    return res.send("success");
  } catch (error) {
    // console.log(error)
    return res.send("Somthing went wrong please try again later");
  }
});

router.post("/users/deleteuser", NotLoggedIn, async (req, res) => {
  try {
    var plans = await Plan.find({
      user: req.body.id,
    });
    plans.forEach(async (plan) => {
      await Plan.findOneAndDelete({
        _id: plan._id,
      });
    });
    await User.findOneAndDelete({
      _id: req.body.id,
    });
    return res.send("success");
  } catch (error) {
    return res.send("Somthing went wrong please try again later");
  }
});

router.post("/users/deletealluser", NotLoggedIn, async (req, res) => {
  try {
    await Plan.deleteMany({});
    await User.deleteMany({});
    return res.send("success");
  } catch (error) {
    return res.send("Somthing went wrong please try again later");
  }
});

router.get("/users/users.xlsx", NotLoggedIn, async (req, res) => {
  try {
    return res.sendFile(path.join(root + "/users.xlsx"));
  } catch (error) {
    return res.send("Somthing went wrong please try again later");
  }
});

router.post("/users/importexcel", NotLoggedIn, async (req, res) => {
  req.setTimeout(0);
  try {
    upload(req, res, async function (err) {
      if (req.fileValidationError) {
        return res.send(req.fileValidationError);
      } else if (!req.file) {
        return res.send("Please upload an excel file");
      } else if (err instanceof multer.MulterError) {
        console.log(err);
        return res.send(err);
      } else if (err) {
        console.log(err);
        return res.send(err);
      }

      const file = reader.readFile(path.join(root, "tmp/users.xlsx"));

      const sheets = file.SheetNames;

      for (let i = 0; i < sheets.length; i++) {
        const temp = reader.utils.sheet_to_json(
          file.Sheets[file.SheetNames[i]]
        );
        temp.forEach(async (item) => {
          const phone = await User.findOne({
            phone: item.Phone,
          });
          if (!phone) {
            try {
              const user = User({
                name: item.Name,
                phone: item.Phone,
              });
              const savedUser = await user.save();
              const plan = Plan({
                user: savedUser._id,
                months: item.Months,
                amount: item.Amount,
                videos:
                  item.Videos == "Yes" || item.Videos == "yes" ? true : false,
                notes:
                  item.Notes == "Yes" || item.Notes == "yes" ? true : false,
                sociology_videos:
                  item["Sociology Videos"] == "Yes" ||
                  item["Sociology Videos"] == "yes"
                    ? true
                    : false,
                sociology_notes:
                  item["Sociology Notes"] == "Yes" ||
                  item["Sociology Notes"] == "yes"
                    ? true
                    : false,
              });
              await plan.save();
            } catch (error) {
              // console.log(error);
            }
          }
        });
      }
      setTimeout(() => {
        return res.send("success");
      }, 2000);
    });
  } catch (error) {
    console.log(error);
    return res.send("Somthing went wrong please try again later");
  }
});

router.get("/users/exportexcel", NotLoggedIn, async (req, res) => {
  try {
    let users = await User.find();
    users = await addPlan(users);
    var xls = json2xls(users);
    fs.writeFileSync("data.xlsx", xls, "binary");
    return res.sendFile(path.join(root + "/data.xlsx"));
  } catch (error) {
    console.log(error);
    return res.send("Something went wrong please try again later");
  }
});

const formatData = (data) => {
  return new Promise(async (resolve, reject) => {
    for (var i in data) {
      try {
        data[i].expiry_date = moment(parseInt(data[i].active_date))
          .add(data[i].months, "M")
          .format("DD MMM YYYY");
        data[i].active_date = moment(parseInt(data[i].active_date)).format(
          "DD MMM YYYY"
        );
        const user = await User.findOne({
          _id: data[i].user,
        });
        data[i].phone = user.phone;
        data[i].name = user.name;
        data[i].last_update_time = moment(
          parseInt(user.last_update_time)
        ).format("DD MMM YYYY");
      } catch (error) {
        console.log(error);
      }
    }
    resolve(data);
  });
};

const addPlan = (data) => {
  let updateData = [];
  return new Promise(async (resolve, reject) => {
    for (var i in data) {
      try {
        const plan = await Plan.findOne({
          user: data[i]._id,
        });
        updateData[i] = {
          Name: data[i].name,
          Phone: data[i].phone,
          Months: plan.months,
          Amount: plan.amount,
          Videos: plan.videos ? "yes" : "no",
          Notes: plan.notes ? "yes" : "no",
          "Sociology Videos": plan.sociology_videos ? "yes" : "no",
          "Sociology Notes": plan.sociology_notes ? "yes" : "no",
          "Plan Expiry Date": moment(parseInt(plan.active_date))
            .add(plan.months, "M")
            .format("DD MMM YYYY"),
        };
      } catch (error) {
        console.log(error);
      }
    }
    resolve(updateData);
  });
};

module.exports = router;
