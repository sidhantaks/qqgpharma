const ServiceSubcategory = require('../models/ServiceSubcategory');
const ServiceCategory = require('../models/ServiceCategory');

exports.list = async (req, res) => {
  try {
    const items = await ServiceSubcategory.find().populate('category', 'name').sort({ name: 1 });
    return res.json({ success: true, data: items });
  } catch (err) {
    console.error('ServiceSubcategory list error', err);
    return res.status(500).json({ success: false, error: err.message });
  }
};

exports.create = async (req, res) => {
  try {
    const { categoryId, name } = req.body || {};
    if (!categoryId || !name) return res.status(400).json({ success: false, error: 'categoryId and name required' });
    const cat = await ServiceCategory.findById(categoryId);
    if (!cat) return res.status(400).json({ success: false, error: 'Invalid category' });
    const existing = await ServiceSubcategory.findOne({ category: categoryId, name });
    if (existing) return res.status(400).json({ success: false, error: 'Subcategory already exists for this category' });
    const item = await ServiceSubcategory.create({ category: categoryId, name });
    const created = await ServiceSubcategory.findById(item._id).populate('category', 'name');
    return res.status(201).json({ success: true, data: created });
  } catch (err) {
    console.error('ServiceSubcategory create error', err);
    return res.status(500).json({ success: false, error: err.message });
  }
};

exports.update = async (req, res) => {
  try {
    const id = req.params.id;
    const { categoryId, name } = req.body || {};
    if (!categoryId || !name) return res.status(400).json({ success: false, error: 'categoryId and name required' });
    const existing = await ServiceSubcategory.findOne({ category: categoryId, name });
    if (existing && existing._id.toString() !== id) return res.status(400).json({ success: false, error: 'Subcategory name already used for this category' });
    const updated = await ServiceSubcategory.findByIdAndUpdate(id, { $set: { category: categoryId, name } }, { new: true }).populate('category', 'name');
    if (!updated) return res.status(404).json({ success: false, error: 'Not found' });
    return res.json({ success: true, data: updated });
  } catch (err) {
    console.error('ServiceSubcategory update error', err);
    return res.status(500).json({ success: false, error: err.message });
  }
};

exports.remove = async (req, res) => {
  try {
    const id = req.params.id;
    const deleted = await ServiceSubcategory.findByIdAndDelete(id);
    if (!deleted) return res.status(404).json({ success: false, error: 'Not found' });
    return res.json({ success: true });
  } catch (err) {
    console.error('ServiceSubcategory delete error', err);
    return res.status(500).json({ success: false, error: err.message });
  }
};
