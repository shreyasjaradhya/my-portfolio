const express = require('express');
const multer = require('multer');
const path = require('path');
const { protect } = require('../middleware/authMiddleware');
const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');

const router = express.Router();

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

// Configure Multer to use Cloudinary Storage
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: async (req, file) => {
    // Determine folder and resource type based on file type
    const isPdfOrDoc = /pdf|docx?/.test(path.extname(file.originalname).toLowerCase()) || file.mimetype.includes('pdf') || file.mimetype.includes('document');
    
    // Sanitize extension and name
    const safeExt = path.extname(file.originalname).toLowerCase().replace(/[^a-z0-9.]/g, '');
    const filename = `${file.fieldname}-${Date.now()}${safeExt}`;

    return {
      folder: 'portfolio_uploads',
      resource_type: isPdfOrDoc ? 'raw' : 'image', // Cloudinary uses 'raw' for PDFs and docs
      public_id: filename // The file name in Cloudinary
    };
  },
});

function checkFileType(file, cb) {
  const filetypes = /jpg|jpeg|png|gif|pdf|docx|doc/;
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = filetypes.test(file.mimetype);

  if (extname && mimetype) {
    return cb(null, true);
  } else {
    cb(new Error('Images and Documents only!'));
  }
}

const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5 MB
  fileFilter: function (req, file, cb) {
    checkFileType(file, cb);
  },
});

router.post('/', protect, (req, res) => {
  upload.single('file')(req, res, function (err) {
    if (err instanceof multer.MulterError) {
      return res.status(400).json({ message: err.message });
    } else if (err) {
      return res.status(400).json({ message: err.message });
    }
    
    if (!req.file) {
      return res.status(400).json({ message: 'No file uploaded.' });
    }
    
    // Cloudinary returns the full URL in req.file.path or req.file.secure_url
    const fileUrl = req.file.path || req.file.secure_url;
    res.json({ url: fileUrl });
  });
});

module.exports = router;
