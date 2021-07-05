const netjrfTestCategory = require("../../models/Netjrftestcategory");
const netjrfTestSubCategory = require("../../models/Netjrftestsubcategory");

module.exports = {
  addNetjrfTestSubCategory: async (req, res) => {
    if (!req.body.name) return res.send("Sub Category Test Name is Required");
    if (!req.body.category) return res.send("Category ID is Required");

    try {
      const checkCategory = await netjrfTestCategory.findById(
        req.body.category
      );
      if (checkCategory) {
        const testRecords = await netjrfTestSubCategory.find({
          name: req.body.name,
        });
        if (testRecords == "" || testRecords == null) {
          const postData = new netjrfTestSubCategory({
            name: req.body.name,
            category: req.body.category,
          });

          const postResponse = await postData.save();
          if (postResponse) {
            return res.send("success");
          }
        } else {
          return res.send("netjrf Test Sub Category Already Exist");
        }
      } else {
        return res.send(
          "Category Id Not Found!! Please pass Valid Category Id.."
        );
      }
    } catch (error) {
      return res.send("Something went Wrong!! Try Again..");
    }
  },
  updateNetjrfTestSubCategory: async (req, res) => {
    if (!req.body.id)
      return res.send("netjrf Sub Category Test Id is Required");
    console.log("check");
    if (!req.body.name)
      return res.send("netjrf Test Sub Category Name is Required");

    const filter = { _id: req.body.id };
    const updateData = {
      name: req.body.name,
      last_update_time: Date.now(),
    };

    try {
      const check = await netjrfTestSubCategory.findById(req.body.id);
      if (check) {
        const postResponse = await netjrfTestSubCategory.findOneAndUpdate(
          filter,
          updateData
        );
        if (postResponse) {
          return res.send("netjrf Test Sub Category Updated Successfully!!");
        }
      } else {
        return res.send(
          "netjrf Test Sub Category Records not Found.!! Pass Valid netjrfb Test Sub Category ID"
        );
      }
    } catch (error) {
      console.log("ikujhiouj");
      return res.send("Something went Wrong!! Try Again..");
    }
  },

  getNetjrfTestSubCategory: async (req, res) => {
    try {
      var id = req.query.id;

      if (id) {
        const subcategories = await netjrfTestSubCategory
          .find({
            category: id,
          })
          .sort({
            created_at: -1,
          });
        return res.render("admin/netjrf-test-subcategories", {
          subcategories,
        });
      } else {
        const subcategories = await netjrfTestSubCategory.find().sort({
          created_at: -1,
        });
        return res.render("admin/netjrf-test-subcategories", {
          subcategories,
        });
      }
    } catch (error) {
      return res.send("Unable to Fetch Records. Please try again..");
    }
  },
  deleteNetjrfTestSubCategory: async (req, res) => {
    try {
      var id = req.body.id;

      const check = await netjrfTestSubCategory.findById(id);
      if (check) {
        const deleteResponse = await netjrfTestSubCategory.deleteOne({
          _id: id,
        });
        if (deleteResponse) {
          return res.send("success");
        }
      } else {
        return res.send(
          "netjrf Test Sub Category Records not Found.!! Unable to Delete.."
        );
      }
    } catch (error) {
      return res.send(
        "Sorry!! netjrf Test Sub Category deletion unsuccessful.."
      );
    }
  },
};
