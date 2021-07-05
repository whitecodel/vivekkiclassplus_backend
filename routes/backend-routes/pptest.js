const router = require("express").Router();
const { NotLoggedIn } = require("../../middlewares/Adminauth");
const {
  addppTest,
  questionView,
  importExcel,
  addMoreQuestions,
  getppTest,
  deleteppTest,
  updateppTest,
  updateQuestionppTest,
  deleteQuestionppTest,
} = require("../../controllers/admin/pptest");

// router.get('/pptest/', NotLoggedIn, getppTest);
// router.post('/pptest/add', NotLoggedIn, addppTest);
// router.post('/pptest/addquestions', NotLoggedIn, addMoreQuestions);
// router.post('/pptest/update', NotLoggedIn, updateppTest);
// router.post('/pptest/updatequestion', NotLoggedIn, updateQuestionppTest);
// router.delete('/pptest/deletequestion/:testid/:quesid', NotLoggedIn, deleteQuestionppTest);
// router.delete('/pptest/delete/:id', NotLoggedIn, deleteppTest);

router.get("/pptest/", getppTest);
router.post("/pptest/add", addppTest);
router.get("/pptest/questions", questionView);
router.post("/pptest/importexcel", importExcel);
router.post("/pptest/addquestions", addMoreQuestions);
router.post("/pptest/update", updateppTest);
router.post("/pptest/updatequestion", updateQuestionppTest);
router.post("/pptest/deletequestion", deleteQuestionppTest);
router.post("/pptest/delete", deleteppTest);

module.exports = router;
