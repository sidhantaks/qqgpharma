const express = require('express');
const router = express.Router();
const path = require('path');
const multer = require('multer');
const fs = require('fs');
const registrationController = require('../controllers/registrationController');

// Multer setup
const uploadDir = path.join(__dirname, '..', 'uploads', 'registrations');
if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir, { recursive: true });

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadDir);
  },
  filename: function (req, file, cb) {
    const unique = Date.now() + '-' + Math.round(Math.random() * 1E9);
    const ext = path.extname(file.originalname) || '';
    cb(null, file.fieldname + '-' + unique + ext);
  }
});

const upload = multer({ storage });

// Fields: photograph (single), supportingDocuments (multiple)
router.post('/', upload.fields([
  { name: 'photograph', maxCount: 1 },
  { name: 'supportingDocuments', maxCount: 10 }
]), registrationController.create);

router.get('/', registrationController.list);

// Username availability
router.get('/check-username', registrationController.checkUsername);

// Update profile (protected)
const { requireAuth } = require('../middleware/auth');
router.patch('/:id', requireAuth, registrationController.update);

module.exports = router;
