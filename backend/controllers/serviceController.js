const Service = require('../models/Service');

exports.list = async (req, res) => {
  try {
    const page = Math.max(1, parseInt(req.query.page || '1', 10));
    const limit = Math.min(200, Math.max(1, parseInt(req.query.limit || '100', 10)));
    const q = (req.query.q || '').trim();
    const filter = {};
    if (q) filter.serviceName = { $regex: q, $options: 'i' };

    const total = await Service.countDocuments(filter);
    const items = await Service.find(filter).sort({ createdAt: -1 }).skip((page - 1) * limit).limit(limit);
    return res.json({ success: true, data: items, total, page, limit });
  } catch (err) {
    console.error('Service list error', err);
    return res.status(500).json({ success: false, error: err.message });
  }
};

exports.create = async (req, res) => {
  try {
    console.log('Service create called, body:', req.body);
    const { serviceName } = req.body || {};
    if (!serviceName) return res.status(400).json({ success: false, error: 'serviceName required' });
    const existing = await Service.findOne({ serviceName });
    if (existing) return res.status(400).json({ success: false, error: 'Service already exists' });
    const s = await Service.create({ serviceName });
    return res.status(201).json({ success: true, data: s });
  } catch (err) {
    console.error('Service create error', err && err.message, err);
    // If mongoose validation error, provide message
    if (err && err.code === 11000) {
      return res.status(400).json({ success: false, error: 'Duplicate serviceName' });
    }
    return res.status(500).json({ success: false, error: err.message || String(err) });
  }
};

exports.update = async (req, res) => {
  try {
    const id = req.params.id;
    const { serviceName } = req.body;
    if (!serviceName) return res.status(400).json({ success: false, error: 'serviceName required' });
    const existing = await Service.findOne({ serviceName });
    if (existing && existing._id.toString() !== id) return res.status(400).json({ success: false, error: 'Service name already used' });
    const updated = await Service.findByIdAndUpdate(id, { $set: { serviceName } }, { new: true });
    if (!updated) return res.status(404).json({ success: false, error: 'Not found' });
    return res.json({ success: true, data: updated });
  } catch (err) {
    console.error('Service update error', err);
    return res.status(500).json({ success: false, error: err.message });
  }
};

exports.remove = async (req, res) => {
  try {
    const id = req.params.id;
    const deleted = await Service.findByIdAndDelete(id);
    if (!deleted) return res.status(404).json({ success: false, error: 'Not found' });
    return res.json({ success: true });
  } catch (err) {
    console.error('Service delete error', err);
    return res.status(500).json({ success: false, error: err.message });
  }
};
