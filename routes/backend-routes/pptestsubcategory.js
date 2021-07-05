const router = require("express").Router();
const { NotLoggedIn } = require("../../middlewares/Adminauth");

const {
  addPpTestSubCategory,
  getPpTestSubCategory,
  deletePpTestSubCategory,
  updatePpTestSubCategory,
} = require("../../controllers/admin/pptestsubcategory");

// router.get('/ppsubcategorytest/', NotLoggedIn, getPpTestSubCategory);
// router.post('/ppsubcategorytest/add', NotLoggedIn, addPpTestSubCategory);
// router.post('/ppsubcategorytest/update', NotLoggedIn, updatePpTestSubCategory);
// router.delete('/ppsubcategorytest/delete/:id', NotLoggedIn, deletePpTestSubCategory);

router.get("/ppsubcategorytest/", getPpTestSubCategory);
router.post("/ppsubcategorytest/add", addPpTestSubCategory);
router.post("/ppsubcategorytest/update", updatePpTestSubCategory);
router.post("/ppsubcategorytest/delete/", deletePpTestSubCategory);

module.exports = router;
