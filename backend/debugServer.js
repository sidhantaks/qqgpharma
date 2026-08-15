const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();
const MONGO_URI = process.env.MONGO_URI || process.env.MONGODB_URI || 'mongodb://localhost:27017/qgpharma';

async function start() {
  await mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });
  const ServiceCategory = require('./models/ServiceCategory');
  const ServiceSubcategory = require('./models/ServiceSubcategory');
  const IntegratedService = require('./models/IntegratedService');

  app.get('/service-categories', async (req, res) => {
    const items = await ServiceCategory.find().sort({ name: 1 });
    res.json({ success: true, data: items });
  });
  app.get('/service-subcategories', async (req, res) => {
    const items = await ServiceSubcategory.find().populate('category', 'name').sort({ name: 1 });
    res.json({ success: true, data: items });
  });
  app.get('/integrated-services', async (req, res) => {
    const items = await IntegratedService.find().populate('category', 'name').populate('subcategory', 'name').sort({ name: 1 });
    res.json({ success: true, data: items });
  });

  const PORT = 5001;
  app.listen(PORT, () => console.log('Debug server listening on', PORT));
}

start().catch((e) => { console.error(e); process.exit(1); });
