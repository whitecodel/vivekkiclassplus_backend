const sociologyTestCategory = require("../../models/Sociologytestcategory");
const sociologyTestSubCategory = require("../../models/Sociologytestsubcategory");

module.exports = {
  addSociologyTestSubCategory: async (req, res) => {
    if (!req.body.name) return res.send("Sub Category Test Name is Required");
    if (!req.body.category) return res.send("Category ID is Required");

    try {
      const checkCategory = await sociologyTestCategory.findById(
        req.body.category
      );
      if (checkCategory) {
        const testRecords = await sociologyTestSubCategory.find({
          name: req.body.name,
        });
        if (testRecords == "" || testRecords == null) {
          const postData = new sociologyTestSubCategory({
            name: req.body.name,
            category: req.body.category,
          });

          const postResponse = await postData.save();
          if (postResponse) {
            return res.send("success");
          }
        } else {
          return res.send("sociology Test Sub Category Already Exist");
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
  updateSociologyTestSubCategory: async (req, res) => {
    if (!req.body.id)
      return res.send("sociology Sub Category Test Id is Required");
    console.log("check");
    if (!req.body.name)
      return res.send("sociology Test Sub Category Name is Required");

    const filter = { _id: req.body.id };
    const updateData = {
      name: req.body.name,
      last_update_time: Date.now(),
    };

    try {
      const check = await sociologyTestSubCategory.findById(req.body.id);
      if (check) {
        const postResponse = await sociologyTestSubCategory.findOneAndUpdate(
          filter,
          updateData
        );
        if (postResponse) {
          return res.send("sociology Test Sub Category Updated Successfully!!");
        }
      } else {
        return res.send(
          "sociology Test Sub Category Records not Found.!! Pass Valid sociologyb Test Sub Category ID"
        );
      }
    } catch (error) {
      console.log("ikujhiouj");
      return res.send("Something went Wrong!! Try Again..");
    }
  },

  getSociologyTestSubCategory: async (req, res) => {
    try {
      var id = req.query.id;

      if (id) {
        const subcategories = await sociologyTestSubCategory
          .find({
            category: id,
          })
          .sort({
            created_at: -1,
          });
        return res.render("admin/sociology-test-subcategories", {
          subcategories,
        });
      } else {
        const subcategories = await sociologyTestSubCategory.find().sort({
          created_at: -1,
        });
        return res.render("admin/sociology-test-subcategories", {
          subcategories,
        });
      }
    } catch (error) {
      return res.send("Unable to Fetch Records. Please try again..");
    }
  },
  deleteSociologyTestSubCategory: async (req, res) => {
    try {
      var id = req.body.id;

      const check = await sociologyTestSubCategory.findById(id);
      if (check) {
        const deleteResponse = await sociologyTestSubCategory.deleteOne({
          _id: id,
        });
        if (deleteResponse) {
          return res.send("success");
        }
      } else {
        return res.send(
          "sociology Test Sub Category Records not Found.!! Unable to Delete.."
        );
      }
    } catch (error) {
      return res.send(
        "Sorry!! sociology Test Sub Category deletion unsuccessful.."
      );
    }
  },
};
