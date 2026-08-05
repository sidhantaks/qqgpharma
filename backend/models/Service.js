const mongoose = require('mongoose');

const ServiceSchema = new mongoose.Schema({
  serviceName: { type: String, required: true, unique: true },
  createdAt: { type: Date, default: Date.now }
}, { collection: 'services' });

module.exports = mongoose.model('Service', ServiceSchema);
