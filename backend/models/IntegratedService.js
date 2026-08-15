const mongoose = require('mongoose');

const IntegratedServiceSchema = new mongoose.Schema({
  category: { type: mongoose.Schema.Types.ObjectId, ref: 'ServiceCategory', required: true },
  subcategory: { type: mongoose.Schema.Types.ObjectId, ref: 'ServiceSubcategory', required: false },
  name: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
}, { collection: 'integrated_services' });

// Unique when subcategory is present
IntegratedServiceSchema.index({ category: 1, subcategory: 1, name: 1 }, { unique: true, partialFilterExpression: { subcategory: { $exists: true } } });
// Unique for entries without subcategory (category + name must be unique when no subcategory)
IntegratedServiceSchema.index({ category: 1, name: 1 }, { unique: true, partialFilterExpression: { subcategory: { $exists: false } } });

module.exports = mongoose.model('IntegratedService', IntegratedServiceSchema);
