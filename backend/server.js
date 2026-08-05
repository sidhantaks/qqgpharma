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
app.use((req, res, next) => {
  console.log(new Date().toISOString(), req.method, req.originalUrl);
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

// Services CRUD
const serviceRoutes = require('./routes/serviceRoutes');
app.use('/api/services', serviceRoutes);

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

  const PORT = process.env.PORT || 4000;

  app.listen(PORT, () => {
      console.log(`Server running on ${PORT}`);
  });
  } catch (err) {
    console.error('Failed to start server', err);
    process.exit(1);
  }
}

start();