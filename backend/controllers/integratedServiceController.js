const IntegratedService = require('../models/IntegratedService');
const ServiceCategory = require('../models/ServiceCategory');
const ServiceSubcategory = require('../models/ServiceSubcategory');

exports.list = async (req, res) => {
  try {
    const items = await IntegratedService.find().populate('category', 'name').populate('subcategory', 'name').sort({ name: 1 });
    return res.json({ success: true, data: items });
  } catch (err) {
    console.error('IntegratedService list error', err);
    return res.status(500).json({ success: false, error: err.message });
  }
};

exports.create = async (req, res) => {
  try {
    const { categoryId, subcategoryId, name } = req.body || {};
    if (!categoryId || !name) return res.status(400).json({ success: false, error: 'categoryId and name required' });
    const cat = await ServiceCategory.findById(categoryId);
    if (!cat) return res.status(400).json({ success: false, error: 'Invalid category' });
    if (subcategoryId) {
      const sub = await ServiceSubcategory.findById(subcategoryId);
      if (!sub) return res.status(400).json({ success: false, error: 'Invalid subcategory' });
    }
    // check uniqueness depending on whether subcategory provided
    let existing;
    if (subcategoryId) {
      existing = await IntegratedService.findOne({ category: categoryId, subcategory: subcategoryId, name });
    } else {
      existing = await IntegratedService.findOne({ category: categoryId, name, $or: [ { subcategory: { $exists: false } }, { subcategory: null } ] });
    }
    if (existing) return res.status(400).json({ success: false, error: 'Service already exists for this category/subcategory combination' });
    const toCreate = { category: categoryId, name };
    if (subcategoryId) toCreate.subcategory = subcategoryId;
    const item = await IntegratedService.create(toCreate);
    // Query the created document and populate relations to ensure consistent behavior
    const created = await IntegratedService.findById(item._id).populate('category', 'name').populate('subcategory', 'name');
    return res.status(201).json({ success: true, data: created });
  } catch (err) {
    console.error('IntegratedService create error', err);
    return res.status(500).json({ success: false, error: err.message });
  }
};

exports.update = async (req, res) => {
  try {
    const id = req.params.id;
    const { categoryId, subcategoryId, name } = req.body || {};
    if (!categoryId || !name) return res.status(400).json({ success: false, error: 'categoryId and name required' });
    if (subcategoryId) {
      const sub = await ServiceSubcategory.findById(subcategoryId);
      if (!sub) return res.status(400).json({ success: false, error: 'Invalid subcategory' });
    }
    // uniqueness check
    let existing;
    if (subcategoryId) {
      existing = await IntegratedService.findOne({ category: categoryId, subcategory: subcategoryId, name });
    } else {
      existing = await IntegratedService.findOne({ category: categoryId, name, $or: [ { subcategory: { $exists: false } }, { subcategory: null } ] });
    }
    if (existing && existing._id.toString() !== id) return res.status(400).json({ success: false, error: 'Service name already used for this category/subcategory combination' });
    const updateOps = subcategoryId ? { $set: { category: categoryId, subcategory: subcategoryId, name } } : { $set: { category: categoryId, name }, $unset: { subcategory: 1 } };
    const updated = await IntegratedService.findByIdAndUpdate(id, updateOps, { new: true }).populate('category', 'name').populate('subcategory', 'name');
    if (!updated) return res.status(404).json({ success: false, error: 'Not found' });
    return res.json({ success: true, data: updated });
  } catch (err) {
    console.error('IntegratedService update error', err);
    return res.status(500).json({ success: false, error: err.message });
  }
};

exports.remove = async (req, res) => {
  try {
    const id = req.params.id;
    const deleted = await IntegratedService.findByIdAndDelete(id);
    if (!deleted) return res.status(404).json({ success: false, error: 'Not found' });
    return res.json({ success: true });
  } catch (err) {
    console.error('IntegratedService delete error', err);
    return res.status(500).json({ success: false, error: err.message });
  }
};
