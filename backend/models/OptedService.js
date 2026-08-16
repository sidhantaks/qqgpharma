const mongoose = require('mongoose');

const OptedServiceSchema = new mongoose.Schema({
  customer: { type: mongoose.Schema.Types.ObjectId, ref: 'Registration', required: true },
  customerName: { type: String },
  customerEmail: { type: String },
  expertService: { type: mongoose.Schema.Types.ObjectId, ref: 'Service' },
  expertServiceName: { type: String },
  category: { type: mongoose.Schema.Types.ObjectId, ref: 'ServiceCategory' },
  categoryName: { type: String },
  subcategory: { type: mongoose.Schema.Types.ObjectId, ref: 'ServiceSubcategory' },
  subcategoryName: { type: String },
  integratedService: { type: mongoose.Schema.Types.ObjectId, ref: 'IntegratedService' },
  integratedServiceName: { type: String },
  notes: { type: String },
}, { timestamps: true });

module.exports = mongoose.model('OptedService', OptedServiceSchema);
