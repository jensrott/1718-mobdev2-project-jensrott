/* Multer file uploading setup */

module.exports = function() {

    const multer = require('multer');
    const storage = multer.diskStorage({
    destination: 'client/public/uploads',
    filename: function(req, file,cb) {
        cb(null, file.fieldname + '-' + Date.now() + file.originalname);
    }
    })
    const upload = multer({
    storage: storage
    }).single("myFile");

}