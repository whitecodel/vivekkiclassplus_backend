const router = require("express").Router();
const { NotLoggedIn } = require("../../middlewares/Adminauth");
const {
  getppTestCategory,
  addppTestCategory,
  updateppTestCategory,
  deleteppTestCategory,
} = require("../../controllers/admin/pptestcategory");

// router.get('/ppcategorytest/', NotLoggedIn, getppTestCategory);
// router.post('/ppcategorytest/add', NotLoggedIn, addppTestCategory);
// router.post('/ppcategorytest/update', NotLoggedIn, updateppTestCategory);
// router.delete('/ppcategorytest/delete/:id', NotLoggedIn, deleteppTestCategory);

router.get("/ppcategorytest/", NotLoggedIn, getppTestCategory);
router.post("/ppcategorytest/add", NotLoggedIn, addppTestCategory);
router.post("/ppcategorytest/update", NotLoggedIn, updateppTestCategory);
router.post("/ppcategorytest/delete/", NotLoggedIn, deleteppTestCategory);

module.exports = router;
