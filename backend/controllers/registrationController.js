const path = require('path');
const fs = require('fs');
const Registration = require('../models/Registration');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

// Ensure upload dir exists
const uploadDir = path.join(__dirname, '..', 'uploads', 'registrations');
if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir, { recursive: true });

// Helper to safely parse JSON strings for array fields
function parsePossibleJSON(value) {
  if (!value) return undefined;
  if (Array.isArray(value)) return value;
  if (typeof value === 'string') {
    try {
      const parsed = JSON.parse(value);
      return Array.isArray(parsed) ? parsed : [value];
    } catch (e) {
      return value.split(',').map(s => s.trim()).filter(Boolean);
    }
  }
  return value;
}

exports.create = async (req, res) => {
  try {
    // multer will populate files on req.files and fields on req.body
    const body = req.body || {};
    // determine registration date (use provided or now)
    const regDate = body.registrationDate ? new Date(body.registrationDate) : new Date();

    // helper: atomically get next sequence for year/month using a counters collection
    async function nextSeqForYearMonth(y, m) {
      const key = `registration:${y}:${m}`;
      // use native collection to perform atomic findOneAndUpdate
      const resDoc = await mongoose.connection.collection('counters').findOneAndUpdate(
        { _id: key },
        { $inc: { seq: 1 } },
        { upsert: true, returnOriginal: false }
      );
      // some Mongo driver versions return the new doc in `value`
      const value = resDoc && (resDoc.value || resDoc);
      return (value && value.seq) ? value.seq : 1;
    }

    // build registration number as QGPS/YYYY/MM/0001 (always generated server-side)
    const yyyy = regDate.getFullYear();
    const mm = String(regDate.getMonth() + 1).padStart(2, '0');
    let generatedRegNo;
    try {
      const seq = await nextSeqForYearMonth(yyyy, mm);
      const seqStr = String(seq).padStart(4, '0');
      generatedRegNo = `QGPS/${yyyy}/${mm}/${seqStr}`;
    } catch (e) {
      // fallback: count existing registrations for the same year/month and use count+1
      try {
        const start = new Date(yyyy, regDate.getMonth(), 1);
        const end = new Date(yyyy, regDate.getMonth() + 1, 1);
        const cnt = await Registration.countDocuments({ registrationDate: { $gte: start, $lt: end } }).catch(()=>0);
        const seqStr = String((cnt || 0) + 1).padStart(4, '0');
        generatedRegNo = `QGPS/${yyyy}/${mm}/${seqStr}`;
      } catch (e2) {
        // final fallback: use 0001 for sequence (still keep QGPS/YYYY/MM/0001 format)
        generatedRegNo = `QGPS/${yyyy}/${mm}/0001`;
      }
    }

    const data = {
      registrationNumber: generatedRegNo,
      registrationDate: regDate,
      userCategory: body.userCategory,
      userCategoryOther: body.userCategoryOther,

      partnerCategory: body.partnerCategory,
      partnerCategoryOther: body.partnerCategoryOther,
      organizationDescription: body.organizationDescription,
      numberOfEmployees: body.numberOfEmployees ? Number(body.numberOfEmployees) : undefined,
      partnerExperience: body.partnerExperience,
      coreCompetencies: body.coreCompetencies,
      majorClients: body.majorClients,
      partnerCertifications: body.partnerCertifications,
      partnerCountriesServed: parsePossibleJSON(body.partnerCountriesServed),

      title: body.title,
      fullName: body.fullName,
      designation: body.designation,
      organization: body.organization,
      department: body.department,
      experienceYears: body.experienceYears ? Number(body.experienceYears) : undefined,
      primaryMobile: body.primaryMobile,
      alternateMobile: body.alternateMobile,
      email: body.email,
      website: body.website,
      linkedin: body.linkedin,
      officeAddress: body.officeAddress,
      city: body.city,
      state: body.state,
      country: body.country,
      postalCode: body.postalCode,

      // Do not store the following fields during initial registration:
      // professionalSummary, areasOfExpertise, keywords, education,
      // servicesRequired, servicesOffered, availability, consultationCharges
      languagesKnown: body.languagesKnown,
      certifications: body.certifications,
      preferredWorkingMode: body.preferredWorkingMode,
      countriesServed: body.countriesServed,
      industriesServed: body.industriesServed,
      username: body.username,
      // password handled below (hashed)
    };

    // Handle uploaded files (photograph, supportingDocuments)
    if (req.files) {
      if (req.files.photograph && req.files.photograph[0]) {
        data.photograph = path.join('uploads', 'registrations', req.files.photograph[0].filename);
      }
      if (req.files.supportingDocuments) {
        data.supportingDocuments = req.files.supportingDocuments.map(f => path.join('uploads', 'registrations', f.filename));
      }
    }

    // Hash password if provided
    if (body.password) {
      const salt = await bcrypt.genSalt(10);
      data.password = await bcrypt.hash(body.password, salt);
    }

    // Server-side uniqueness check for username to give friendly error
    if (body.username) {
      const existing = await Registration.findOne({ username: body.username });
      if (existing) {
        return res.status(400).json({ success: false, error: 'Username already exists', field: 'username' });
      }
    }

    const reg = await Registration.create(data);
    return res.status(201).json({ success: true, data: reg });
  } catch (err) {
    console.error('Create registration error', err);
    // handle duplicate username / registrationNumber
    if (err.code === 11000) {
      const key = Object.keys(err.keyValue || {})[0];
      const field = key || 'field';
      const message = field === 'username' ? 'Username already exists' : 'Duplicate field value';
      return res.status(400).json({ success: false, error: message, field, details: err.keyValue });
    }
    return res.status(500).json({ success: false, error: err.message });
  }
};

exports.list = async (req, res) => {
  try {
    // Optional pagination and search parameters
    const page = Math.max(1, parseInt(req.query.page || "1", 10));
    const limit = Math.min(200, Math.max(1, parseInt(req.query.limit || "50", 10)));
    const q = (req.query.q || "").trim();

    const filter = {};
    if (q) {
      // Simple text search across a few fields
      filter.$or = [
        { fullName: { $regex: q, $options: 'i' } },
        { email: { $regex: q, $options: 'i' } },
        { organization: { $regex: q, $options: 'i' } },
        { primaryMobile: { $regex: q, $options: 'i' } },
      ];
    }

    const total = await Registration.countDocuments(filter);
    const regs = await Registration.find(filter)
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(limit);

    return res.json({ success: true, data: regs, total, page, limit });
  } catch (err) {
    console.error('List registration error', err);
    return res.status(500).json({ success: false, error: err.message });
  }
};

// Check username availability: ?username=...
exports.checkUsername = async (req, res) => {
  try {
    const username = req.query.username;
    if (!username) return res.status(400).json({ success: false, error: 'username required' });
    const existing = await Registration.findOne({ username });
    return res.json({ success: true, available: !existing });
  } catch (err) {
    console.error('Check username error', err);
    return res.status(500).json({ success: false, error: err.message });
  }
};

// Update registration/profile (customers can update their own record)
exports.update = async (req, res) => {
  try {
    const id = req.params.id;
    const body = req.body || {};
    // Only allow certain fields to be updated
    const allowed = ['fullName','email','primaryMobile','organization','officeAddress','city','state','country','postalCode','designation','experienceYears','languagesKnown','professionalSummary'];
    const update = {};
    allowed.forEach(f => {
      if (body[f] !== undefined) update[f] = body[f];
    });

    // username/password updates
    if (body.username) {
      const existing = await Registration.findOne({ username: body.username });
      if (existing && existing._id.toString() !== id) {
        return res.status(400).json({ success: false, error: 'Username already exists', field: 'username' });
      }
      update.username = body.username;
    }
    if (body.password) {
      const salt = await bcrypt.genSalt(10);
      update.password = await bcrypt.hash(body.password, salt);
    }

    const updated = await Registration.findByIdAndUpdate(id, { $set: update }, { new: true }).select('-password');
    if (!updated) return res.status(404).json({ success: false, error: 'Not found' });
    return res.json({ success: true, data: updated });
  } catch (err) {
    console.error('Update registration error', err);
    if (err.code === 11000) {
      const key = Object.keys(err.keyValue || {})[0];
      const field = key || 'field';
      const message = field === 'username' ? 'Username already exists' : 'Duplicate field value';
      return res.status(400).json({ success: false, error: message, field, details: err.keyValue });
    }
    return res.status(500).json({ success: false, error: err.message });
  }
};

// Return the predicted next registration number for the current month (non-reserving)
exports.nextNumber = async (req, res) => {
  try {
    const now = new Date();
    const yyyy = now.getFullYear();
    const mm = String(now.getMonth() + 1).padStart(2, '0');
    const start = new Date(yyyy, now.getMonth(), 1);
    const end = new Date(yyyy, now.getMonth() + 1, 1);
    const cnt = await Registration.countDocuments({ registrationDate: { $gte: start, $lt: end } }).catch(()=>0);
    const seq = (cnt || 0) + 1;
    const seqStr = String(seq).padStart(4, '0');
    const generated = `QGPS/${yyyy}/${mm}/${seqStr}`;
    return res.json({ success: true, registrationNumber: generated });
  } catch (err) {
    console.error('Next reg number error', err);
    return res.status(500).json({ success: false, error: err.message });
  }
};
