const ServiceCategory = require('../models/ServiceCategory');

exports.list = async (req, res) => {
  try {
    const items = await ServiceCategory.find().sort({ name: 1 });
    return res.json({ success: true, data: items });
  } catch (err) {
    console.error('ServiceCategory list error', err);
    return res.status(500).json({ success: false, error: err.message });
  }
};

exports.create = async (req, res) => {
  try {
    const { name } = req.body || {};
    if (!name) return res.status(400).json({ success: false, error: 'name required' });
    const existing = await ServiceCategory.findOne({ name });
    if (existing) return res.status(400).json({ success: false, error: 'Category already exists' });
    const item = await ServiceCategory.create({ name });
    return res.status(201).json({ success: true, data: item });
  } catch (err) {
    console.error('ServiceCategory create error', err);
    return res.status(500).json({ success: false, error: err.message });
  }
};

exports.update = async (req, res) => {
  try {
    const id = req.params.id;
    const { name } = req.body || {};
    if (!name) return res.status(400).json({ success: false, error: 'name required' });
    const existing = await ServiceCategory.findOne({ name });
    if (existing && existing._id.toString() !== id) return res.status(400).json({ success: false, error: 'Category name already used' });
    const updated = await ServiceCategory.findByIdAndUpdate(id, { $set: { name } }, { new: true });
    if (!updated) return res.status(404).json({ success: false, error: 'Not found' });
    return res.json({ success: true, data: updated });
  } catch (err) {
    console.error('ServiceCategory update error', err);
    return res.status(500).json({ success: false, error: err.message });
  }
};

exports.remove = async (req, res) => {
  try {
    const id = req.params.id;
    const deleted = await ServiceCategory.findByIdAndDelete(id);
    if (!deleted) return res.status(404).json({ success: false, error: 'Not found' });
    return res.json({ success: true });
  } catch (err) {
    console.error('ServiceCategory delete error', err);
    return res.status(500).json({ success: false, error: err.message });
  }
};
