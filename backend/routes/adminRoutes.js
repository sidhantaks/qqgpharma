const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const Admin = require('../models/Admin');
const { requireAuth } = require('../middleware/auth');

// Create new admin (protected)
router.post('/create', requireAuth, async (req, res) => {
  try {
    const { username, password } = req.body || {};
    if (!username || !password) return res.status(400).json({ success: false, message: 'Missing username or password' });
    const exists = await Admin.findOne({ username });
    if (exists) return res.status(400).json({ success: false, message: 'User exists' });
    const hash = await bcrypt.hash(password, 10);
    await Admin.create({ username, password: hash });
    return res.json({ success: true });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ success: false, message: 'Server error' });
  }
});

// Change password for current user
router.post('/change-password', requireAuth, async (req, res) => {
  try {
    const { oldPassword, newPassword } = req.body || {};
    if (!oldPassword || !newPassword) return res.status(400).json({ success: false, message: 'Missing passwords' });
    const admin = await Admin.findById(req.user.id);
    if (!admin) return res.status(404).json({ success: false, message: 'Admin not found' });
    const match = await bcrypt.compare(oldPassword, admin.password);
    if (!match) return res.status(401).json({ success: false, message: 'Invalid old password' });
    const hash = await bcrypt.hash(newPassword, 10);
    admin.password = hash;
    await admin.save();
    return res.json({ success: true });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ success: false, message: 'Server error' });
  }
});

module.exports = router;
