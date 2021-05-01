const root = process.cwd();
const multer  = require('multer');
const path = require('path');

// Set The Storage Engine
const storage = multer.diskStorage({
    destination: `${root}/tmp/students_image`,
    filename: function (req, file, cb) {
        cb(null, `student-profile-${req.user._id}.jpg`);
    }
});

// Check File Type
function checkFileType(file, cb) {
    // Allowed ext
    const filetypes = /jpeg|jpg|png|gif/;

    // Check ext
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());

    // Check mime
    const mimetype = filetypes.test(file.mimetype);

    // Check image size
    // sizeOf('images/funny-cats.png')
    // .then(dimensions => { console.log(dimensions.width, dimensions.height); })
    // .catch(err => console.error(err));

    if (mimetype && extname) {
        return cb(null, true);
    } else {
        return cb('Error: Images Only!');
    }
}

// Init Upload
const upload = multer({
    storage: storage,
    // limits: {
    //     fileSize: 1000000
    // },
    fileFilter: function (req, file, cb) {
        checkFileType(file, cb);
    }
});

module.exports = {upload};