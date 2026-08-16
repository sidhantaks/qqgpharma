const OptedService = require('../models/OptedService');
const Registration = require('../models/Registration');
const Service = require('../models/Service');
const ServiceCategory = require('../models/ServiceCategory');
const ServiceSubcategory = require('../models/ServiceSubcategory');
const IntegratedService = require('../models/IntegratedService');

exports.list = async (req, res) => {
  try {
    const items = await OptedService.find({ customer: req.user.id }).sort({ createdAt: -1 }).populate('integratedService category subcategory expertService');
    return res.json({ success: true, data: items });
  } catch (err) {
    console.error('OptedService list error', err);
    return res.status(500).json({ success: false, error: err.message });
  }
};

exports.create = async (req, res) => {
  try {
    const { expertServiceId, categoryId, subcategoryId, integratedServiceId, notes } = req.body || {};
    if (!categoryId) return res.status(400).json({ success: false, error: 'categoryId required' });
    const customer = await Registration.findById(req.user.id).select('fullName email');
    if (!customer) return res.status(400).json({ success: false, error: 'Customer not found' });

    const doc = {
      customer: customer._id,
      customerName: customer.fullName || customer.username || '',
      customerEmail: customer.email || '',
      notes: notes || ''
    };
    if (expertServiceId) {
      const s = await Service.findById(expertServiceId).select('serviceName');
      if (s) { doc.expertService = s._id; doc.expertServiceName = s.serviceName; }
    }
    if (categoryId) {
      const c = await ServiceCategory.findById(categoryId).select('name');
      if (c) { doc.category = c._id; doc.categoryName = c.name; }
    }
    if (subcategoryId) {
      const sc = await ServiceSubcategory.findById(subcategoryId).select('name');
      if (sc) { doc.subcategory = sc._id; doc.subcategoryName = sc.name; }
    }
    if (integratedServiceId) {
      const isv = await IntegratedService.findById(integratedServiceId).select('name');
      if (isv) { doc.integratedService = isv._id; doc.integratedServiceName = isv.name; }
    }

    const created = await OptedService.create(doc);
    return res.status(201).json({ success: true, data: created });
  } catch (err) {
    console.error('OptedService create error', err);
    return res.status(500).json({ success: false, error: err.message });
  }
};

exports.remove = async (req, res) => {
  try {
    const id = req.params.id;
    const doc = await OptedService.findById(id);
    if (!doc) return res.status(404).json({ success: false, error: 'Not found' });
    if (doc.customer.toString() !== req.user.id) return res.status(403).json({ success: false, error: 'Forbidden' });
    await OptedService.findByIdAndDelete(id);
    return res.json({ success: true });
  } catch (err) {
    console.error('OptedService delete error', err);
    return res.status(500).json({ success: false, error: err.message });
  }
};
