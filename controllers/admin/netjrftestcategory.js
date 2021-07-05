const netjrfTestCategory = require("../../models/Netjrftestcategory");

module.exports = {
  addnetjrfTestCategory: async (req, res) => {
    if (!req.body.name)
      return res
        .status(404)
        .json({ success: 0, message: "Test Name is Required" });
    // if (!req.body.subcategory) return res.status(404).json({ success: 0, message: 'Sub Category is Required' });

    try {
      const testRecords = await netjrfTestCategory.find({
        name: req.body.name,
      });
      if (testRecords == "") {
        const postData = new netjrfTestCategory({
          name: req.body.name,
          subcategory: req.body.subcategory,
        });

        const postResponse = await postData.save();
        if (postResponse) {
          return res.send("success");
        }
      } else {
        return res.send(
          "netjrf Category Test Already Exist. Please Add new Test Records!!"
        );
      }
    } catch (error) {
      return res.send(
        "Something went wrong unable to Add Data.Please Try Some time..!!"
      );
    }
  },
  updatenetjrfTestCategory: async (req, res) => {
    if (!req.body.id) return res.send("Test Id is Required");
    if (!req.body.name) return res.send("Test Name is Required");
    // if (!req.body.subcategory) return res.status(404).json({ success: 0, message: 'Sub Category is Required' });

    const filter = { _id: req.body.id };
    const updateData = {
      name: req.body.name,
      last_update_time: Date.now(),
    };

    try {
      const testList = await netjrfTestCategory.findById(req.body.id);
      if (testList) {
        const postResponse = await netjrfTestCategory.findOneAndUpdate(
          filter,
          updateData
        );
        if (postResponse) {
          return res.send("success");
        }
      } else {
        return res.send("netjrf Category Test Records not Found.!!");
      }
    } catch (error) {
      return res.send("Something went Wrong!! Try Again..");
    }
  },
  getnetjrfTestCategory: async (req, res) => {
    try {
      var id = req.query.id;
      if (id) {
        const testList = await netjrfTestCategory.findById(id).sort({
          created_at: -1,
        });
        if (testList) {
          return res.status(200).json({
            success: 1,
            result: testList,
          });
        } else {
          return res.send(
            "No Records Found with that netjrf Category Test ID!!!"
          );
        }
      } else {
        const categories = await netjrfTestCategory.find().sort({
          created_at: -1,
        });
        if (categories) {
          return res.render("admin/netjrf-test-categories", { categories });
        }
      }
    } catch (error) {
      return res.send("Unable to Fetch Records. Please try again..");
    }
  },
  deletenetjrfTestCategory: async (req, res) => {
    try {
      var id = req.body.id;

      const testList = await netjrfTestCategory.findById(id);
      if (testList) {
        const deleteResponse = await netjrfTestCategory.deleteOne({
          _id: id,
        });
        if (deleteResponse) {
          return res.send("success");
        }
      } else {
        return res.send("netjrf Category Test Records not Found.!!");
      }
    } catch (error) {
      return res.send("Something went wrong please try again later");
    }
  },
};
