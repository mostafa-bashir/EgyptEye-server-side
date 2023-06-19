const multer = require('multer');

const storage = multer.diskStorage({

    destination: function (req, file, cb) {
    // Specify the directory where the file will be saved
    cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
        // Specify the filename of the uploaded file
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
         cb(null, Date.now()+file.originalname) ;
    }
    });

// Create an instance of the multer middleware
const upload = multer({ storage: storage });

module.exports = upload