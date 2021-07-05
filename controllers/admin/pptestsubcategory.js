const ppTestCategory = require("../../models/Pptestcategory");
const ppTestSubCategory = require("../../models/Pptestsubcategory");

module.exports = {
  addPpTestSubCategory: async (req, res) => {
    if (!req.body.name) return res.send("Sub Category Test Name is Required");
    if (!req.body.category) return res.send("Category ID is Required");

    try {
      const checkCategory = await ppTestCategory.findById(req.body.category);
      if (checkCategory) {
        const testRecords = await ppTestSubCategory.find({
          name: req.body.name,
        });
        if (testRecords == "" || testRecords == null) {
          const postData = new ppTestSubCategory({
            name: req.body.name,
            category: req.body.category,
          });

          const postResponse = await postData.save();
          if (postResponse) {
            return res.send("success");
          }
        } else {
          return res.send("pp Test Sub Category Already Exist");
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
  updatePpTestSubCategory: async (req, res) => {
    if (!req.body.id) return res.send("pp Sub Category Test Id is Required");
    console.log("check");
    if (!req.body.name)
      return res.send("pp Test Sub Category Name is Required");

    const filter = { _id: req.body.id };
    const updateData = {
      name: req.body.name,
      last_update_time: Date.now(),
    };

    try {
      const check = await ppTestSubCategory.findById(req.body.id);
      if (check) {
        const postResponse = await ppTestSubCategory.findOneAndUpdate(
          filter,
          updateData
        );
        if (postResponse) {
          return res.send("pp Test Sub Category Updated Successfully!!");
        }
      } else {
        return res.send(
          "pp Test Sub Category Records not Found.!! Pass Valid ppb Test Sub Category ID"
        );
      }
    } catch (error) {
      console.log("ikujhiouj");
      return res.send("Something went Wrong!! Try Again..");
    }
  },

  getPpTestSubCategory: async (req, res) => {
    try {
      var id = req.query.id;

      if (id) {
        const subcategories = await ppTestSubCategory
          .find({
            category: id,
          })
          .sort({
            created_at: -1,
          });
        return res.render("admin/pp-test-subcategories", {
          subcategories,
        });
      } else {
        const subcategories = await ppTestSubCategory.find().sort({
          created_at: -1,
        });
        return res.render("admin/pp-test-subcategories", {
          subcategories,
        });
      }
    } catch (error) {
      return res.send("Unable to Fetch Records. Please try again..");
    }
  },
  deletePpTestSubCategory: async (req, res) => {
    try {
      var id = req.body.id;

      const check = await ppTestSubCategory.findById(id);
      if (check) {
        const deleteResponse = await ppTestSubCategory.deleteOne({
          _id: id,
        });
        if (deleteResponse) {
          return res.send("success");
        }
      } else {
        return res.send(
          "pp Test Sub Category Records not Found.!! Unable to Delete.."
        );
      }
    } catch (error) {
      return res.send("Sorry!! pp Test Sub Category deletion unsuccessful..");
    }
  },
};
