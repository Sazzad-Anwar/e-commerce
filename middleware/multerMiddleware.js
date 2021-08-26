const multer = require('multer');
const path = require('path');
const { v4: uuidv4 } = require('uuid');

//@Description: Multer storage and file checking configurations
const checkFileType = (file, cb) => {
    const filetypes = /jpg|jpeg|png|JPG|JPEG|PNG/
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = filetypes.test(file.mimetype);

    if (extname && mimetype) {
        return cb(null, true)
    } else {
        cb(new Error(`Only ${filetypes} images can be uploaded`));
    }
};

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './public/uploads')
    },
    filename: function (req, file, cb) {
        let fileExt = path.extname(file.originalname);
        let fileName = uuidv4() + fileExt;
        cb(null, fileName);
    },
});

const upload = multer({
    storage: storage,
    fileFilter: function (req, file, cb) {
        checkFileType(file, cb)
    }
});

module.exports = {
    upload
}