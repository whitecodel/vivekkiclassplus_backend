// ROUTE FILES

// Test routes
const testR = require("./routes/backend-routes/test");

// App routes
const appauthR = require("./routes/app-routes/auth");
const appvideocategoryR = require("./routes/app-routes/videocategory");
const appsociologyvideocategoryR = require("./routes/app-routes/sociologyvideocategory");
const appvideosubcategoryR = require("./routes/app-routes/videosubcategory");
const appsociologyvideosubcategoryR = require("./routes/app-routes/sociologyvideosubcategory");
const appnotecategoryR = require("./routes/app-routes/notecategory");
const appsociologynotecategoryR = require("./routes/app-routes/sociologynotecategory");
const appnotesubcategoryR = require("./routes/app-routes/notesubcategory");
const appsociologynotesubcategoryR = require("./routes/app-routes/sociologynotesubcategory");
const plansR = require("./routes/app-routes/plan");
const announcementR = require("./routes/app-routes/announcement");
const contactR = require("./routes/app-routes/contact");
const postR = require("./routes/app-routes/post");
const videoR = require("./routes/app-routes/video");
const sociologyvideoR = require("./routes/app-routes/sociologyvideo");
const noteR = require("./routes/app-routes/note");
const sociologynoteR = require("./routes/app-routes/sociologynote");
const helpR = require("./routes/app-routes/help");
const activeplanR = require("./routes/app-routes/activeplan");
const sliderR = require("./routes/app-routes/slider");
const qstudentsR = require("./routes/app-routes/qstudent");
const appcurrentaffairR = require("./routes/app-routes/currentaffair");
const sociologytestcategoryR = require("./routes/app-routes/sociologytestcategory");
const sociologytestsubcategoryR = require("./routes/app-routes/sociologytestsubcategory");
const sociologytestR = require("./routes/app-routes/sociologytest");
const netjrftestcategoryR = require("./routes/app-routes/netjrftestcategory");
const netjrftestsubcategoryR = require("./routes/app-routes/netjrftestsubcategory");
const netjrftestR = require("./routes/app-routes/netjrftest");

// Admin routes
const authR = require("./routes/backend-routes/auth");
const videocategoryR = require("./routes/backend-routes/videocategory");
const videosubcategoryR = require("./routes/backend-routes/videosubcategory");
const notecategoryR = require("./routes/backend-routes/notecategory");
const notesubcategoryR = require("./routes/backend-routes/notesubcategory");
const userR = require("./routes/backend-routes/user");
const admin_postR = require("./routes/backend-routes/posts");
const admin_videoR = require("./routes/backend-routes/video");
const admin_noteR = require("./routes/backend-routes/note");
const admin_announcementR = require("./routes/backend-routes/announcement");
const admin_contactR = require("./routes/backend-routes/contact");
const admin_sliderR = require("./routes/backend-routes/slider");
const admin_qstudentR = require("./routes/backend-routes/qstudent");
const admin_sociologynoteR = require("./routes/backend-routes/sociologynote");
const sociologynotesubcategoryR = require("./routes/backend-routes/sociologynotesubcategory");
const sociologynotecategoryR = require("./routes/backend-routes/sociologynotecategory");
const admin_sociologyvideoR = require("./routes/backend-routes/sociologyvideo");
const sociologyvideosubcategoryR = require("./routes/backend-routes/sociologyvideosubcategory");
const sociologyvideocategoryR = require("./routes/backend-routes/sociologyvideocategory");
const currentaffairR = require("./routes/backend-routes/currentaffair");
const admin_systeminfoR = require("./routes/backend-routes/systeminfo");
const admin_sociologytestcategoryR = require("./routes/backend-routes/sociologytestcategory");
const admin_sociologytestsubcategoryR = require("./routes/backend-routes/sociologytestsubcategory");
const admin_sociologytestR = require("./routes/backend-routes/sociologytest");
const admin_pptestcategoryR = require("./routes/backend-routes/pptestcategory");
const admin_pptestsubcategoryR = require("./routes/backend-routes/pptestsubcategory");
const admin_pptestR = require("./routes/backend-routes/pptest");
const admin_netjrftestcategoryR = require("./routes/backend-routes/netjrftestcategory");
const admin_netjrftestsubcategoryR = require("./routes/backend-routes/netjrftestsubcategory");
const admin_netjrftestR = require("./routes/backend-routes/netjrftest");

// Upload routes
const uploadR = require("./routes/backend-routes/upload");

const AppRoutes = (app) => {
  // app routes
  app.use("/", appauthR);
  app.use("/videocategory", appvideocategoryR);
  app.use("/sociologyvideocategory", appsociologyvideocategoryR);
  app.use("/videosubcategory", appvideosubcategoryR);
  app.use("/sociologyvideosubcategory", appsociologyvideosubcategoryR);
  app.use("/videos", videoR);
  app.use("/sociologyvideos", sociologyvideoR);
  app.use("/notecategory", appnotecategoryR);
  app.use("/sociologynotecategory", appsociologynotecategoryR);
  app.use("/notesubcategory", appnotesubcategoryR);
  app.use("/sociologynotesubcategory", appsociologynotesubcategoryR);
  app.use("/notes", noteR);
  app.use("/sociologynotes", sociologynoteR);
  app.use("/plans", plansR);
  app.use("/help", helpR);
  app.use("/post", postR);
  app.use("/activeplan", activeplanR);
  app.use("/announcement", announcementR);
  app.use("/contact", contactR);
  app.use("/sliders", sliderR);
  app.use("/qstudents", qstudentsR);
  app.use("/currentaffair", appcurrentaffairR);
  // app test routes
  app.use("/sociologytestcategory", sociologytestcategoryR);
  app.use("/sociologytestsubcategory", sociologytestsubcategoryR);
  app.use("/sociologytests", sociologytestR);
  app.use("/netjrftestcategory", netjrftestcategoryR);
  app.use("/netjrftestsubcategory", netjrftestsubcategoryR);
  app.use("/netjrftests", netjrftestR);

  // admin routes
  app.use("/", testR);
  app.use("/admin", authR);
  app.use("/admin", videocategoryR);
  app.use("/admin", videosubcategoryR);
  app.use("/admin", notecategoryR);
  app.use("/admin", notesubcategoryR);
  app.use("/admin", userR);
  app.use("/admin", admin_postR);
  app.use("/admin", admin_videoR);
  app.use("/admin", admin_noteR);
  app.use("/admin", uploadR);
  app.use("/admin", admin_announcementR);
  app.use("/admin", admin_contactR);
  app.use("/admin", admin_sliderR);
  app.use("/admin", admin_qstudentR);
  app.use("/admin", admin_sociologynoteR);
  app.use("/admin", sociologynotesubcategoryR);
  app.use("/admin", sociologynotecategoryR);
  app.use("/admin", admin_sociologyvideoR);
  app.use("/admin", sociologyvideosubcategoryR);
  app.use("/admin", sociologyvideocategoryR);
  app.use("/admin", currentaffairR);
  app.use("/admin", admin_systeminfoR);
  // admin test routes
  app.use("/admin", admin_sociologytestcategoryR);
  app.use("/admin", admin_sociologytestsubcategoryR);
  app.use("/admin", admin_sociologytestR);
  app.use("/admin", admin_pptestcategoryR);
  app.use("/admin", admin_pptestsubcategoryR);
  app.use("/admin", admin_pptestR);
  app.use("/admin", admin_netjrftestcategoryR);
  app.use("/admin", admin_netjrftestsubcategoryR);
  app.use("/admin", admin_netjrftestR);
};

module.exports = AppRoutes;
