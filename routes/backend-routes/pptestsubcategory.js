const router = require("express").Router();
const { NotLoggedIn } = require("../../middlewares/Adminauth");

const {
  addPpTestSubCategory,
  getPpTestSubCategory,
  deletePpTestSubCategory,
  updatePpTestSubCategory,
} = require("../../controllers/admin/pptestsubcategory");

// router.get('/sociologysubcategorytest/', NotLoggedIn, getPpTestSubCategory);
// router.post('/sociologysubcategorytest/add', NotLoggedIn, addPpTestSubCategory);
// router.post('/sociologysubcategorytest/update', NotLoggedIn, updatePpTestSubCategory);
// router.delete('/sociologysubcategorytest/delete/:id', NotLoggedIn, deletePpTestSubCategory);

router.get("/sociologysubcategorytest/", getPpTestSubCategory);
router.post("/sociologysubcategorytest/add", addPpTestSubCategory);
router.post("/sociologysubcategorytest/update", updatePpTestSubCategory);
router.post("/sociologysubcategorytest/delete/", deletePpTestSubCategory);

module.exports = router;
