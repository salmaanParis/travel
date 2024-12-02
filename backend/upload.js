// upload.js
const multer = require('multer');
const path = require('path');

// Set up storage for images
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // Uploads will be saved to the 'uploads' directory
  },
  filename: (req, file, cb) => {
    const fileName = Date.now() + path.extname(file.originalname); // Ensure unique filenames
    cb(null, fileName);
  }
});

// Create multer instance with the storage configuration
const upload = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    const ext = path.extname(file.originalname).toLowerCase();
    if (ext !== '.jpg' && ext !== '.jpeg' && ext !== '.png' && ext !== '.gif') {
      return cb(new Error('Only image files are allowed'), false);
    }
    cb(null, true);
  },
});

module.exports = upload;
