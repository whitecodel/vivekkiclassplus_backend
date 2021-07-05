const router = require("express").Router();
const { NotLoggedIn } = require("../../middlewares/Adminauth");
const {
  getnetjrfTestCategory,
  addnetjrfTestCategory,
  updatenetjrfTestCategory,
  deletenetjrfTestCategory,
} = require("../../controllers/admin/netjrftestcategory");

// router.get('/netjrfcategorytest/', NotLoggedIn, getnetjrfTestCategory);
// router.post('/netjrfcategorytest/add', NotLoggedIn, addnetjrfTestCategory);
// router.post('/netjrfcategorytest/update', NotLoggedIn, updatenetjrfTestCategory);
// router.delete('/netjrfcategorytest/delete/:id', NotLoggedIn, deletenetjrfTestCategory);

router.get("/netjrfcategorytest/", NotLoggedIn, getnetjrfTestCategory);
router.post("/netjrfcategorytest/add", NotLoggedIn, addnetjrfTestCategory);
router.post(
  "/netjrfcategorytest/update",
  NotLoggedIn,
  updatenetjrfTestCategory
);
router.post(
  "/netjrfcategorytest/delete/",
  NotLoggedIn,
  deletenetjrfTestCategory
);

module.exports = router;
