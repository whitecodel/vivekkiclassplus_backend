const router = require("express").Router();
const { NotLoggedIn } = require("../../middlewares/Adminauth");
const {
  getsociologyTestCategory,
  addsociologyTestCategory,
  updatesociologyTestCategory,
  deletesociologyTestCategory,
} = require("../../controllers/admin/sociologytestcategory");

// router.get('/sociologycategorytest/', NotLoggedIn, getsociologyTestCategory);
// router.post('/sociologycategorytest/add', NotLoggedIn, addsociologyTestCategory);
// router.post('/sociologycategorytest/update', NotLoggedIn, updatesociologyTestCategory);
// router.delete('/sociologycategorytest/delete/:id', NotLoggedIn, deletesociologyTestCategory);

router.get("/sociologycategorytest/", NotLoggedIn, getsociologyTestCategory);
router.post(
  "/sociologycategorytest/add",
  NotLoggedIn,
  addsociologyTestCategory
);
router.post(
  "/sociologycategorytest/update",
  NotLoggedIn,
  updatesociologyTestCategory
);
router.post(
  "/sociologycategorytest/delete/",
  NotLoggedIn,
  deletesociologyTestCategory
);

module.exports = router;
