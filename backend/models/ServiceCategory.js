const mongoose = require('mongoose');

const ServiceCategorySchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  createdAt: { type: Date, default: Date.now }
}, { collection: 'service_categories' });

module.exports = mongoose.model('ServiceCategory', ServiceCategorySchema);
