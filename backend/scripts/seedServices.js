const mongoose = require('mongoose');
require('dotenv').config();

const ServiceCategory = require('../models/ServiceCategory');
const ServiceSubcategory = require('../models/ServiceSubcategory');
const IntegratedService = require('../models/IntegratedService');

const MONGO_URI = process.env.MONGO_URI || process.env.MONGODB_URI || 'mongodb://localhost:27017/qgpharma';

async function seed() {
  await mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });
  console.log('Connected to MongoDB for seeding');

  try {
    const categories = [
      { name: 'Consulting' },
      { name: 'Manufacturing' },
      { name: 'Quality Control' }
    ];

    const createdCats = [];
    for (const c of categories) {
      const doc = await ServiceCategory.findOneAndUpdate({ name: c.name }, { $set: c }, { upsert: true, new: true });
      createdCats.push(doc);
    }

    const subcategories = [
      { categoryName: 'Consulting', name: 'GMP Consulting' },
      { categoryName: 'Manufacturing', name: 'API Manufacturing' },
      { categoryName: 'Quality Control', name: 'Analytical Services' }
    ];

    const createdSubs = [];
    for (const s of subcategories) {
      const cat = createdCats.find((cc) => cc.name === s.categoryName);
      if (!cat) continue;
      const doc = await ServiceSubcategory.findOneAndUpdate(
        { category: cat._id, name: s.name },
        { $set: { category: cat._id, name: s.name } },
        { upsert: true, new: true }
      ).populate('category', 'name');
      createdSubs.push(doc);
    }

    const integrated = [
      { categoryName: 'Consulting', subName: 'GMP Consulting', name: 'Site GMP Audit' },
      { categoryName: 'Manufacturing', subName: 'API Manufacturing', name: 'Small-batch API' },
      { categoryName: 'Quality Control', subName: 'Analytical Services', name: 'Stability Testing' }
    ];

    const createdIntegrated = [];
    for (const it of integrated) {
      const cat = createdCats.find((cc) => cc.name === it.categoryName);
      const sub = createdSubs.find((ss) => ss.name === it.subName && ss.category && ss.category.name === it.categoryName);
      if (!cat || !sub) continue;
      const doc = await IntegratedService.findOneAndUpdate(
        { category: cat._id, subcategory: sub._id, name: it.name },
        { $set: { category: cat._id, subcategory: sub._id, name: it.name } },
        { upsert: true, new: true }
      ).populate('category', 'name').populate('subcategory', 'name');
      createdIntegrated.push(doc);
    }

    console.log('Seed complete:', {
      categories: createdCats.map((c) => ({ id: c._id, name: c.name })),
      subcategories: createdSubs.map((s) => ({ id: s._id, name: s.name, category: s.category?.name })),
      integrated: createdIntegrated.map((i) => ({ id: i._id, name: i.name, category: i.category?.name, subcategory: i.subcategory?.name }))
    });
  } catch (err) {
    console.error('Seeding error', err);
  } finally {
    await mongoose.disconnect();
    console.log('Disconnected from MongoDB');
  }
}

seed().catch((e) => { console.error(e); process.exit(1); });
