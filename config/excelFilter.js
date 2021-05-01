const excelFilter = function(req, file, cb) {
    // Accept images only
    if (!file.originalname.match(/\.(xlsx)$/)) {
        req.fileValidationError = 'Only excel files are allowed!';
        return cb(new Error('Only excel files are allowed!'), false);
    }
    cb(null, true);
};
module.exports = excelFilter;