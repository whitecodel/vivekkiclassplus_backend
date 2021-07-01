const router = require("express").Router();
const { NotLoggedIn } = require("../../middlewares/Adminauth");
const {
  addsociologyTest,
  questionView,
  importExcel,
  addMoreQuestions,
  getsociologyTest,
  deletesociologyTest,
  updatesociologyTest,
  updateQuestionsociologyTest,
  deleteQuestionsociologyTest,
} = require("../../controllers/admin/sociologytest");

// router.get('/sociologytest/', NotLoggedIn, getsociologyTest);
// router.post('/sociologytest/add', NotLoggedIn, addsociologyTest);
// router.post('/sociologytest/addquestions', NotLoggedIn, addMoreQuestions);
// router.post('/sociologytest/update', NotLoggedIn, updatesociologyTest);
// router.post('/sociologytest/updatequestion', NotLoggedIn, updateQuestionsociologyTest);
// router.delete('/sociologytest/deletequestion/:testid/:quesid', NotLoggedIn, deleteQuestionsociologyTest);
// router.delete('/sociologytest/delete/:id', NotLoggedIn, deletesociologyTest);

router.get("/sociologytest/", getsociologyTest);
router.post("/sociologytest/add", addsociologyTest);
router.get("/sociologytest/questions", questionView);
router.post("/sociologytest/importexcel", importExcel);
router.post("/sociologytest/addquestions", addMoreQuestions);
router.post("/sociologytest/update", updatesociologyTest);
router.post("/sociologytest/updatequestion", updateQuestionsociologyTest);
router.post("/sociologytest/deletequestion", deleteQuestionsociologyTest);
router.post("/sociologytest/delete", deletesociologyTest);

module.exports = router;
