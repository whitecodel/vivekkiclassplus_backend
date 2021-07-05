const ppTest = require("../../models/Pptest");
const moment = require("moment");
const path = require("path");
const root = process.cwd();
const reader = require("xlsx");
const excelFilter = require("../../config/excelFilter");
const multer = require("multer");
const json2xls = require("json2xls");
const fs = require("fs");

// Set The Storage Engine
const storage = multer.diskStorage({
  destination: path.join(__dirname, "/../../tmp"),
  filename: function (req, files, cb) {
    cb(null, `questions.xlsx`);
  },
});

// Init Upload
const upload = multer({
  storage: storage,
  // limits: {
  //     fileSize: 5000000
  // },
  fileFilter: excelFilter,
}).single("excel");

module.exports = {
  addppTest: async (req, res) => {
    if (!req.body.name) return res.send("pp Test Name is Required");
    if (!req.body.duration) return res.send("Duration is Required");
    if (!req.body.category) return res.send("Category ID is Required");
    // if (!req.body.questions) return res.send("Question's is Required");

    try {
      const testRecords = await ppTest.find({
        name: req.body.name,
      });
      if (testRecords == "" || testRecords == null) {
        const postData = new ppTest({
          name: req.body.name,
          duration: req.body.duration,
          questions: req.body.questions ?? [],
          category: req.body.category,
        });
        await postData.save();
        return res.send("success");
      } else {
        return res.send(
          "pp Test Name Already Exist. Please Add new Test Records!!"
        );
      }
    } catch (error) {
      console.log(error);
      return res.send("Something went Wrong!! Try Again..");
    }
  },
  questionView: async (req, res) => {
    const test = await ppTest
      .findOne({ _id: req.query.id }, { questions: 1 })
      .sort({
        _id: -1,
      });
    return res.render("admin/pptestquestion.ejs", {
      questions: test.questions,
    });
  },
  importExcel: async (req, res) => {
    req.setTimeout(0);
    try {
      upload(req, res, async function (err) {
        if (req.fileValidationError) {
          return res.send(req.fileValidationError);
        } else if (!req.file) {
          return res.send("Please upload an excel file");
        } else if (err instanceof multer.MulterError) {
          console.log(err);
          return res.send(err);
        } else if (err) {
          console.log(err);
          return res.send(err);
        }

        const file = reader.readFile(path.join(root, "tmp/questions.xlsx"));

        const sheets = file.SheetNames;

        for (let i = 0; i < sheets.length; i++) {
          const questions = reader.utils.sheet_to_json(
            file.Sheets[file.SheetNames[i]]
          );
          try {
            const postResponse = await ppTest.findOneAndUpdate(
              { _id: req.body.id },
              { $addToSet: { questions: questions } }
            );
            return res.send("success");
          } catch (error) {
            console.log("error");
          }
        }
      });
    } catch (error) {
      console.log(error);
      return res.send("Somthing went wrong please try again later");
    }
  },
  addMoreQuestions: async (req, res) => {
    if (!req.body.id) return res.send("Please Pass pp Test id");

    // Checking test available in Document
    const testRecords = await ppTest
      .find({
        id: req.body.id,
      })
      .sort({
        created_at: -1,
      });

    // No Records Found with that test name
    if (testRecords == "" || testRecords == null)
      return res.send("No pp Test Records Found with that Test Id..");

    try {
      const postResponse = await ppTest.findOneAndUpdate(
        { name: testRecords[0].name },
        { $addToSet: { questions: req.body.questions } }
      );

      if (postResponse) {
        return res.send("pp Test Questions Added Successfully!!");
      }
    } catch (error) {
      return res.send("Something went Wrong!! Try Again..");
    }
  },
  updateppTest: async (req, res) => {
    if (!req.body.editid) return res.send("Test Id is Required");
    // if (!req.body.category) return res.status(404).json({ success: 0, message: 'Category Id is Required' });
    if (!req.body.editname) return res.send("Test Name is Required");
    if (!req.body.editduration) return res.send("Duration is Required");

    const filter = { _id: req.body.editid };
    const updateData = {
      name: req.body.editname,
      duration: req.body.editduration,
      last_update_time: Date.now(),
    };

    try {
      const tests = await ppTest.findById(req.body.editid);
      if (tests) {
        const postResponse = await ppTest.findOneAndUpdate(filter, updateData);
        if (postResponse) {
          return res.send("success");
        }
      } else {
        return res.send("pp Test Records not Found.!!");
      }
    } catch (error) {
      return res.send("Something went Wrong!! Try Again..");
    }
  },
  updateQuestionppTest: async (req, res) => {
    if (!req.body.test_id)
      return res
        .status(404)
        .json({ success: 0, message: "Test Id is Required" });
    if (!req.body.ques_id)
      return res
        .status(404)
        .json({ success: 0, message: "Question Id is Required" });
    if (!req.body.questions)
      return res
        .status(404)
        .json({ success: 0, message: "Questions is Required" });

    const updateData = {
      questions: req.body.questions,
    };

    try {
      const postResponse = await ppTest.findOneAndUpdate(
        { _id: req.body.test_id, "questions._id": req.body.ques_id },
        {
          $set: {
            "questions.$.question": updateData.questions[0].question,
            "questions.$.options": updateData.questions[0].options,
            "questions.$.answers": updateData.questions[0].answers,
          },
        }
      );
      if (postResponse) {
        return res.status(200).json({
          success: 1,
          message: "pp Test Questions Updated Successfully!!",
        });
      } else {
        return res.status(404).json({
          success: 0,
          message: "No pp Test Questions Record Found!!!",
        });
      }
    } catch (error) {
      return res
        .status(500)
        .json({ success: 0, message: "Something went Wrong!! Try Again.." });
    }
  },
  getppTest: async (req, res) => {
    try {
      var category = req.query.id;

      if (category) {
        if (req.query.param == "questions") {
          const tests = await ppTest
            .find({ category: category }, { questions: 1 })
            .sort({
              _id: -1,
            });
          if (tests) {
            return res.status(200).json({
              success: 1,
              result: tests,
            });
          } else {
            return res.status(500).json({
              success: 0,
              message: "No Records Found with that category ID!!!",
            });
          }
        } else {
          const tests = await ppTest
            .find({ category: category }, { name: 1, duration: 1, category: 1 })
            .sort({ created_at: -1 });
          if (tests) {
            return res.render("admin/pptest", { tests });
          } else {
            return res.send("No Records Found with that category ID!!!");
          }
        }
      } else {
        return res.send(
          "No Category Id Found.. Please pass valid Category ID!!!"
        );
      }
    } catch (error) {
      return res.send("Unable to Fetch Records. Please try again..");
    }
  },
  deleteppTest: async (req, res) => {
    try {
      var id = req.body.id;

      const test = await ppTest.findById(id);
      if (test) {
        const deleteResponse = await ppTest.deleteOne({ _id: id });
        if (deleteResponse) {
          return res.send("success");
        }
      } else {
        return res.send("pp Test Records not Found.!!");
      }
    } catch (error) {
      return res.send("Sorry!! pp Test deletion unsuccessful..");
    }
  },
  deleteQuestionppTest: async (req, res) => {
    try {
      var testId = req.body.testid;
      var quesId = req.body.quesid;

      const checkAvail = await ppTest.findOne(
        { _id: testId, "questions._id": quesId },
        { "questions.$": 1 }
      );

      if (checkAvail) {
        const deleteResponse = await ppTest.updateOne(
          { _id: testId },
          { $pull: { questions: { _id: quesId } } }
        );
        if (deleteResponse) {
          return res.send("success");
        }
      } else {
        return res.send("pp Test Questions Records not Found.!!");
      }
    } catch (error) {
      return res.send("Sorry!! Test deletion unsuccessful..");
    }
  },
};
