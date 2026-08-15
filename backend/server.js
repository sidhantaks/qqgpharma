const express = require("express");
const cors = require("cors");
require('dotenv').config();
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const app = express();

// Database URI (from .env) with sensible local fallback
const MONGO_URI = process.env.MONGO_URI || process.env.MONGODB_URI || 'mongodb://localhost:27017/qgpharma';

app.use(cors());
app.use(express.json());

// Simple request logger to help debug incoming requests
const fs = require('fs');
const reqLog = (msg) => {
  try { fs.appendFileSync('./requests.log', msg + '\n'); } catch (e) { /* ignore */ }
};
app.use((req, res, next) => {
  const line = `${new Date().toISOString()} ${req.method} ${req.originalUrl}`;
  console.log(line);
  reqLog(line);
  next();
});

// Mount admin auth routes
const authRoutes = require('./routes/authRoutes');
app.use('/api/admin', authRoutes);

// Admin management routes (protected)
const adminRoutes = require('./routes/adminRoutes');
app.use('/api/admin/manage', adminRoutes);

// Registration routes
const registrationRoutes = require('./routes/registrationRoutes');
app.use('/api/registration', registrationRoutes);

// Customer auth (login + profile) for frontend customers
const customerAuth = require('./routes/customerAuth');
app.use('/api/customer', customerAuth);

// Services CRUD (renamed to expert-services)
const serviceRoutes = require('./routes/serviceRoutes');
app.use('/api/expert-services', serviceRoutes);

// Service categories, subcategories and integrated services
const serviceCategoryRoutes = require('./routes/serviceCategoryRoutes');
app.use('/api/service-categories', serviceCategoryRoutes);
// console.log('Mounted /api/service-categories');
const serviceSubcategoryRoutes = require('./routes/serviceSubcategoryRoutes');
app.use('/api/service-subcategories', serviceSubcategoryRoutes);
// console.log('Mounted /api/service-subcategories');
const integratedServiceRoutes = require('./routes/integratedServiceRoutes');
app.use('/api/integrated-services', integratedServiceRoutes);
// console.log('Mounted /api/integrated-services');

// Directly mount controllers as fallback in case router mounting fails
try {
  const serviceCategoryController = require('./controllers/serviceCategoryController');
  app.get('/api/service-categories', serviceCategoryController.list);
  app.post('/api/service-categories', serviceCategoryController.create);
  app.put('/api/service-categories/:id', serviceCategoryController.update);
  app.delete('/api/service-categories/:id', serviceCategoryController.remove);

  const serviceSubcategoryController = require('./controllers/serviceSubcategoryController');
  app.get('/api/service-subcategories', serviceSubcategoryController.list);
  app.post('/api/service-subcategories', serviceSubcategoryController.create);
  app.put('/api/service-subcategories/:id', serviceSubcategoryController.update);
  app.delete('/api/service-subcategories/:id', serviceSubcategoryController.remove);

  const integratedServiceController = require('./controllers/integratedServiceController');
  app.get('/api/integrated-services', integratedServiceController.list);
  app.post('/api/integrated-services', integratedServiceController.create);
  app.put('/api/integrated-services/:id', integratedServiceController.update);
  app.delete('/api/integrated-services/:id', integratedServiceController.remove);
} catch (e) {
  console.warn('Failed to mount direct service controllers fallback', e && e.message);
}

// Debug: list mounted API routes
app.get('/api/_routes', (req, res) => {
  const routes = [];
  function parseStack(stack, prefix = '') {
    stack.forEach(layer => {
      if (layer.route && layer.route.path) {
        const methods = Object.keys(layer.route.methods).map(m => m.toUpperCase()).join(',');
        routes.push({ path: prefix + layer.route.path, methods });
      } else if (layer.name === 'router' && layer.handle && layer.handle.stack) {
        // router mounted with path in layer.regexp or layer.regexp?.toString()
        let mountPath = '';
        if (layer.regexp && layer.regexp.source) {
          // try to recover simple mount path
          const m = layer.regexp.source.replace('^\\', '').replace('\\/?(?=\/|$)', '');
          mountPath = m.replace('(?:', '').replace(')?', '').replace('\\', '');
        }
        parseStack(layer.handle.stack, prefix + (mountPath || ''));
      }
    });
  }
  if (app._router && app._router.stack) parseStack(app._router.stack, '');
  res.json({ success: true, routes });
});

app.get("/", (req, res) => {
  res.json({
    status: true,
    message: "QG Pharma API Running"
  });
});

// 404 handler for unknown API routes
app.use((req, res, next) => {
  if (req.originalUrl.startsWith('/api/')) {
    console.warn('No API route matched:', req.method, req.originalUrl);
    return res.status(404).json({ success: false, error: 'Not Found' });
  }
  next();
});

async function start() {
  try {
    await mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });
    console.log('Connected to MongoDB');

    // Seed default admin if not exists
    // const Admin = require('./models/Admin');
    // const existing = await Admin.findOne({ username: 'admin' });
    // if (!existing) {
    //   const hash = await bcrypt.hash('admin', 10);
    //   await Admin.create({ username: 'admin', password: hash });
    //   console.log('Default admin user created (username: admin, password: admin)');
    // }

  const PORT = process.env.PORT || 5000;

  app.listen(PORT, () => {
      console.log(`Server running on ${PORT}`);
  });
      // Debug direct model readers
      app.get('/debug/service-categories', async (req, res) => {
        try {
          const ServiceCategory = require('./models/ServiceCategory');
          const items = await ServiceCategory.find().sort({ name: 1 });
          return res.json({ success: true, data: items });
        } catch (e) { return res.status(500).json({ success: false, error: String(e) }); }
      });
      app.get('/debug/service-subcategories', async (req, res) => {
        try {
          const ServiceSubcategory = require('./models/ServiceSubcategory');
          const items = await ServiceSubcategory.find().populate('category', 'name').sort({ name: 1 });
          return res.json({ success: true, data: items });
        } catch (e) { return res.status(500).json({ success: false, error: String(e) }); }
      });
      app.get('/debug/integrated-services', async (req, res) => {
        try {
          const IntegratedService = require('./models/IntegratedService');
          const items = await IntegratedService.find().populate('category', 'name').populate('subcategory', 'name').sort({ name: 1 });
          return res.json({ success: true, data: items });
        } catch (e) { return res.status(500).json({ success: false, error: String(e) }); }
      });
  // print routes once server listening
  setTimeout(listRoutes, 200);
  } catch (err) {
    console.error('Failed to start server', err);
    process.exit(1);
  }
}

// Diagnostic: print mounted routes after server starts
function listRoutes() {
  try {
    const routes = [];
    if (app && app._router && app._router.stack) {
      app._router.stack.forEach((layer) => {
        if (layer.route && layer.route.path) {
          const methods = Object.keys(layer.route.methods).map(m=>m.toUpperCase()).join(',');
          routes.push({ path: layer.route.path, methods });
        } else if (layer.name === 'router' && layer.handle && layer.handle.stack) {
          // attempt to discover mount path
          const mount = layer.regexp && layer.regexp.source ? layer.regexp.source : '<router>';
          routes.push({ path: String(mount), methods: '<router>' });
        }
      });
    }
    // console.log('Mounted routes (diagnostic):', JSON.stringify(routes, null, 2));
  } catch (e) {
    console.warn('Failed to list routes', e);
  }
}

start();
setTimeout(listRoutes, 600);