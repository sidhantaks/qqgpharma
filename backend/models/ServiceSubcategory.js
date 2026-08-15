const mongoose = require('mongoose');

const ServiceSubcategorySchema = new mongoose.Schema({
  category: { type: mongoose.Schema.Types.ObjectId, ref: 'ServiceCategory', required: true },
  name: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
}, { collection: 'service_subcategories' });

ServiceSubcategorySchema.index({ category: 1, name: 1 }, { unique: true });

module.exports = mongoose.model('ServiceSubcategory', ServiceSubcategorySchema);
