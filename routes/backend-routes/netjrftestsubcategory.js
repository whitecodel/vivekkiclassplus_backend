const router = require("express").Router();
const { NotLoggedIn } = require("../../middlewares/Adminauth");

const {
  addNetjrfTestSubCategory,
  getNetjrfTestSubCategory,
  deleteNetjrfTestSubCategory,
  updateNetjrfTestSubCategory,
} = require("../../controllers/admin/netjrftestsubcategory");

// router.get('/netjrfsubcategorytest/', NotLoggedIn, getNetjrfTestSubCategory);
// router.post('/netjrfsubcategorytest/add', NotLoggedIn, addNetjrfTestSubCategory);
// router.post('/netjrfsubcategorytest/update', NotLoggedIn, updateNetjrfTestSubCategory);
// router.delete('/netjrfsubcategorytest/delete/:id', NotLoggedIn, deleteNetjrfTestSubCategory);

router.get("/netjrfsubcategorytest/", getNetjrfTestSubCategory);
router.post("/netjrfsubcategorytest/add", addNetjrfTestSubCategory);
router.post("/netjrfsubcategorytest/update", updateNetjrfTestSubCategory);
router.post("/netjrfsubcategorytest/delete/", deleteNetjrfTestSubCategory);

module.exports = router;
