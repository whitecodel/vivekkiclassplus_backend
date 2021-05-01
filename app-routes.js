// ROUTE FILES

// Test routes
const testR = require('./routes/backend-routes/test');

// App routes
const appauthR = require('./routes/app-routes/auth');
const appvideocategoryR = require('./routes/app-routes/videocategory');
const appsociologyvideocategoryR = require('./routes/app-routes/sociologyvideocategory');
const appvideosubcategoryR = require('./routes/app-routes/videosubcategory');
const appsociologyvideosubcategoryR = require('./routes/app-routes/sociologyvideosubcategory');
const appnotecategoryR = require('./routes/app-routes/notecategory');
const appsociologynotecategoryR = require('./routes/app-routes/sociologynotecategory');
const appnotesubcategoryR = require('./routes/app-routes/notesubcategory');
const appsociologynotesubcategoryR = require('./routes/app-routes/sociologynotesubcategory');
const plansR = require('./routes/app-routes/plan');
const announcementR = require('./routes/app-routes/announcement');
const contactR = require('./routes/app-routes/contact');
const postR = require('./routes/app-routes/post');
const videoR = require('./routes/app-routes/video');
const sociologyvideoR = require('./routes/app-routes/sociologyvideo');
const noteR = require('./routes/app-routes/note');
const sociologynoteR = require('./routes/app-routes/sociologynote');
const helpR = require('./routes/app-routes/help');
const activeplanR = require('./routes/app-routes/activeplan');
const sliderR = require('./routes/app-routes/slider');
const qstudentsR = require('./routes/app-routes/qstudent');
const appcurrentaffairR = require('./routes/app-routes/currentaffair');

// Admin routes
const authR = require('./routes/backend-routes/auth');
const videocategoryR = require('./routes/backend-routes/videocategory');
const videosubcategoryR = require('./routes/backend-routes/videosubcategory');
const notecategoryR = require('./routes/backend-routes/notecategory');
const notesubcategoryR = require('./routes/backend-routes/notesubcategory');
const userR = require('./routes/backend-routes/user');
const admin_postR = require('./routes/backend-routes/posts');
const admin_videoR = require('./routes/backend-routes/video');
const admin_noteR = require('./routes/backend-routes/note');
const admin_announcementR = require('./routes/backend-routes/announcement');
const admin_contactR = require('./routes/backend-routes/contact');
const admin_sliderR = require('./routes/backend-routes/slider');
const admin_qstudentR = require('./routes/backend-routes/qstudent');
const admin_sociologynoteR = require('./routes/backend-routes/sociologynote');
const sociologynotesubcategoryR = require('./routes/backend-routes/sociologynotesubcategory');
const sociologynotecategoryR = require('./routes/backend-routes/sociologynotecategory');
const admin_sociologyvideoR = require('./routes/backend-routes/sociologyvideo');
const sociologyvideosubcategoryR = require('./routes/backend-routes/sociologyvideosubcategory');
const sociologyvideocategoryR = require('./routes/backend-routes/sociologyvideocategory');
const currentaffairR = require('./routes/backend-routes/currentaffair');

// Upload routes
const uploadR = require('./routes/backend-routes/upload');

const AppRoutes = app => {
    // app routes
    app.use('/', appauthR);
    app.use('/videocategory', appvideocategoryR);
    app.use('/sociologyvideocategory', appsociologyvideocategoryR);
    app.use('/videosubcategory', appvideosubcategoryR);
    app.use('/sociologyvideosubcategory', appsociologyvideosubcategoryR);
    app.use('/videos', videoR);
    app.use('/sociologyvideos', sociologyvideoR);
    app.use('/notecategory', appnotecategoryR);
    app.use('/sociologynotecategory', appsociologynotecategoryR);
    app.use('/notesubcategory', appnotesubcategoryR);
    app.use('/sociologynotesubcategory', appsociologynotesubcategoryR);
    app.use('/notes', noteR);
    app.use('/sociologynotes', sociologynoteR);
    app.use('/plans', plansR);
    app.use('/help', helpR);
    app.use('/post', postR);
    app.use('/activeplan', activeplanR);
    app.use('/announcement', announcementR);
    app.use('/contact', contactR);
    app.use('/sliders', sliderR);
    app.use('/qstudents', qstudentsR);
    app.use('/currentaffair', appcurrentaffairR);

    // admin routes
    app.use('/', testR);
    app.use('/admin', authR);
    app.use('/admin', videocategoryR);
    app.use('/admin', videosubcategoryR);
    app.use('/admin', notecategoryR);
    app.use('/admin', notesubcategoryR);
    app.use('/admin', userR);
    app.use('/admin', admin_postR);
    app.use('/admin', admin_videoR);
    app.use('/admin', admin_noteR);
    app.use('/admin', uploadR);
    app.use('/admin', admin_announcementR);
    app.use('/admin', admin_contactR);
    app.use('/admin', admin_sliderR);
    app.use('/admin', admin_qstudentR);
    app.use('/admin', admin_sociologynoteR);
    app.use('/admin', sociologynotesubcategoryR);
    app.use('/admin', sociologynotecategoryR);
    app.use('/admin', admin_sociologyvideoR);
    app.use('/admin', sociologyvideosubcategoryR);
    app.use('/admin', sociologyvideocategoryR);
    app.use('/admin', currentaffairR);






};

module.exports = AppRoutes;