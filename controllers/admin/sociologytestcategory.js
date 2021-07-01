const sociologyTestCategory = require("../../models/Sociologytestcategory");

module.exports = {
  addsociologyTestCategory: async (req, res) => {
    if (!req.body.name)
      return res
        .status(404)
        .json({ success: 0, message: "Test Name is Required" });
    // if (!req.body.subcategory) return res.status(404).json({ success: 0, message: 'Sub Category is Required' });

    try {
      const testRecords = await sociologyTestCategory.find({
        name: req.body.name,
      });
      if (testRecords == "") {
        const postData = new sociologyTestCategory({
          name: req.body.name,
          subcategory: req.body.subcategory,
        });

        const postResponse = await postData.save();
        if (postResponse) {
          return res.send("success");
        }
      } else {
        return res.send(
          "sociology Category Test Already Exist. Please Add new Test Records!!"
        );
      }
    } catch (error) {
      return res.send(
        "Something went wrong unable to Add Data.Please Try Some time..!!"
      );
    }
  },
  updatesociologyTestCategory: async (req, res) => {
    if (!req.body.id) return res.send("Test Id is Required");
    if (!req.body.name) return res.send("Test Name is Required");
    // if (!req.body.subcategory) return res.status(404).json({ success: 0, message: 'Sub Category is Required' });

    const filter = { _id: req.body.id };
    const updateData = {
      name: req.body.name,
      last_update_time: Date.now(),
    };

    try {
      const testList = await sociologyTestCategory.findById(req.body.id);
      if (testList) {
        const postResponse = await sociologyTestCategory.findOneAndUpdate(
          filter,
          updateData
        );
        if (postResponse) {
          return res.send("success");
        }
      } else {
        return res.send("sociology Category Test Records not Found.!!");
      }
    } catch (error) {
      return res.send("Something went Wrong!! Try Again..");
    }
  },
  getsociologyTestCategory: async (req, res) => {
    try {
      var id = req.query.id;
      if (id) {
        const testList = await sociologyTestCategory.findById(id).sort({
          created_at: -1,
        });
        if (testList) {
          return res.status(200).json({
            success: 1,
            result: testList,
          });
        } else {
          return res.send(
            "No Records Found with that sociology Category Test ID!!!"
          );
        }
      } else {
        const categories = await sociologyTestCategory.find().sort({
          created_at: -1,
        });
        if (categories) {
          return res.render("admin/sociology-test-categories", { categories });
        }
      }
    } catch (error) {
      return res.send("Unable to Fetch Records. Please try again..");
    }
  },
  deletesociologyTestCategory: async (req, res) => {
    try {
      var id = req.body.id;

      const testList = await sociologyTestCategory.findById(id);
      if (testList) {
        const deleteResponse = await sociologyTestCategory.deleteOne({
          _id: id,
        });
        if (deleteResponse) {
          return res.send("success");
        }
      } else {
        return res.send("sociology Category Test Records not Found.!!");
      }
    } catch (error) {
      return res.send("Something went wrong please try again later");
    }
  },
};
