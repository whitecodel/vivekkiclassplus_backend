const router = require("express").Router();
const { NotLoggedIn } = require("../../middlewares/Adminauth");

const {
  addSociologyTestSubCategory,
  getSociologyTestSubCategory,
  deleteSociologyTestSubCategory,
  updateSociologyTestSubCategory,
} = require("../../controllers/admin/sociologytestsubcategory");

// router.get('/sociologysubcategorytest/', NotLoggedIn, getSociologyTestSubCategory);
// router.post('/sociologysubcategorytest/add', NotLoggedIn, addSociologyTestSubCategory);
// router.post('/sociologysubcategorytest/update', NotLoggedIn, updateSociologyTestSubCategory);
// router.delete('/sociologysubcategorytest/delete/:id', NotLoggedIn, deleteSociologyTestSubCategory);

router.get("/sociologysubcategorytest/", getSociologyTestSubCategory);
router.post("/sociologysubcategorytest/add", addSociologyTestSubCategory);
router.post("/sociologysubcategorytest/update", updateSociologyTestSubCategory);
router.post(
  "/sociologysubcategorytest/delete/",
  deleteSociologyTestSubCategory
);

module.exports = router;
