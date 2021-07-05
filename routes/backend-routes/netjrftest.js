const router = require("express").Router();
const { NotLoggedIn } = require("../../middlewares/Adminauth");
const {
  addnetjrfTest,
  questionView,
  importExcel,
  addMoreQuestions,
  getnetjrfTest,
  deletenetjrfTest,
  updatenetjrfTest,
  updateQuestionnetjrfTest,
  deleteQuestionnetjrfTest,
} = require("../../controllers/admin/netjrftest");

// router.get('/netjrftest/', NotLoggedIn, getnetjrfTest);
// router.post('/netjrftest/add', NotLoggedIn, addnetjrfTest);
// router.post('/netjrftest/addquestions', NotLoggedIn, addMoreQuestions);
// router.post('/netjrftest/update', NotLoggedIn, updatenetjrfTest);
// router.post('/netjrftest/updatequestion', NotLoggedIn, updateQuestionnetjrfTest);
// router.delete('/netjrftest/deletequestion/:testid/:quesid', NotLoggedIn, deleteQuestionnetjrfTest);
// router.delete('/netjrftest/delete/:id', NotLoggedIn, deletenetjrfTest);

router.get("/netjrftest/", getnetjrfTest);
router.post("/netjrftest/add", addnetjrfTest);
router.get("/netjrftest/questions", questionView);
router.post("/netjrftest/importexcel", importExcel);
router.post("/netjrftest/addquestions", addMoreQuestions);
router.post("/netjrftest/update", updatenetjrfTest);
router.post("/netjrftest/updatequestion", updateQuestionnetjrfTest);
router.post("/netjrftest/deletequestion", deleteQuestionnetjrfTest);
router.post("/netjrftest/delete", deletenetjrfTest);

module.exports = router;
