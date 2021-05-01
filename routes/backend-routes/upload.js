const router = require('express').Router();
const multipart = require('connect-multiparty');
const path = require('path')
const {
    NotLoggedIn
} = require('../../middlewares/Adminauth');

const multipartMiddleware = multipart({
    uploadDir: __dirname + '/../../public/uploads',
});

router.post('/uploadImage', NotLoggedIn, multipartMiddleware, async (req, res) => {
    let fileName = path.basename(req.files.upload.path);
    if(fileName) {
        return res.status(200).json({
            uploaded: true,
            url: 'http://localhost:3000/uploads/' + fileName
        });
    }
    return res.send(400);
});

module.exports = router