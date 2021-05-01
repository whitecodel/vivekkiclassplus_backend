const pdfFilter = function(req, files, cb) {
    // Accept video only
    if(files.fieldname == 'pdf'){
        if (!files.originalname.match(/\.(pdf)$/)) {
            req.fileValidationError = 'Only pdf file are allowed!';
            return cb(new Error('Only pdf file are allowed!'), false);
        }
    }
    // Accept image only
    if(files.fieldname == 'thumbnail'){
        if (!files.originalname.match(/\.(jpg|JPG|jpeg|JPEG|png|PNG)$/)) {
            req.fileValidationError = 'Only image file are allowed!';
            return cb(new Error('Only image file are allowed!'), false);
        }
    }
    cb(null, true);
};
module.exports = pdfFilter;