// Require packages to enable file storage in cloudinary through multer middleware
const cloudinary = require('cloudinary');
const cloudinaryStorage = require('multer-storage-cloudinary');
const multer = require('multer');

// Cloudinary environment variables to link app with cloudinary account
cloudinary.config(
  {
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUD_KEY,
    api_secret: process.env.CLOUD_SECRET
  }
);

// Cloudinary packages configuration
const storage = cloudinaryStorage(
  {
    cloudinary: cloudinary,
    folder: 'meduele-images',
    allowedFormats: ['jpg', 'png', 'jpeg', 'pdf'],
    filename: function (req, file, cb) {
    cb(null, file.originalname);
    }
  }
);

// Export cloudinary storage configuration as part of multer middleware
module.exports = multer({ storage });