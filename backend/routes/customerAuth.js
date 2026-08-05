const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const Registration = require('../models/Registration');
const { JWT_SECRET, requireAuth } = require('../middleware/auth');

// Login: POST /api/customer/login
router.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body || {};
    if (!username || !password) return res.status(400).json({ success: false, error: 'username and password required' });
    const user = await Registration.findOne({ username });
    if (!user || !user.password) return res.status(401).json({ success: false, error: 'Invalid credentials' });
    const ok = await bcrypt.compare(password, user.password);
    if (!ok) return res.status(401).json({ success: false, error: 'Invalid credentials' });
    const token = jwt.sign({ id: user._id, username: user.username }, JWT_SECRET, { expiresIn: '7d' });
    return res.json({ success: true, token });
  } catch (err) {
    console.error('Customer login error', err);
    return res.status(500).json({ success: false, error: err.message });
  }
});

// GET /api/customer/me
router.get('/me', requireAuth, async (req, res) => {
  try {
    const user = await Registration.findById(req.user.id).select('-password');
    if (!user) return res.status(404).json({ success: false, error: 'User not found' });
    return res.json({ success: true, data: user });
  } catch (err) {
    console.error('Customer me error', err);
    return res.status(500).json({ success: false, error: err.message });
  }
});

module.exports = router;
