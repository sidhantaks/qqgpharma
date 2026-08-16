const mongoose = require('mongoose');

const RegistrationSchema = new mongoose.Schema({
  registrationNumber: { type: String, required: true, unique: true },
  // Optional credentials for customer login
  username: { type: String, unique: true, sparse: true },
  password: { type: String },
  registrationDate: { type: Date, default: Date.now },
  userCategory: { type: String },
  userCategoryOther: { type: String },

  // Partner specific
  partnerCategory: { type: String },
  partnerCategoryOther: { type: String },
  organizationDescription: { type: String },
  numberOfEmployees: { type: Number },
  partnerExperience: { type: String },
  coreCompetencies: { type: String },
  majorClients: { type: String },
  partnerCertifications: { type: String },
  partnerCountriesServed: [{ type: String }],
  supportingDocuments: [{ type: String }],

  // Personal / common
  title: { type: String },
  fullName: { type: String, required: true },
  designation: { type: String },
  organization: { type: String },
  department: { type: String },
  experienceYears: { type: Number },
  primaryMobile: { type: String },
  alternateMobile: { type: String },
  email: { type: String, required: true },
  website: { type: String },
  linkedin: { type: String },
  officeAddress: { type: String },
  city: { type: String },
  state: { type: String },
  country: { type: String },
  postalCode: { type: String },
  photograph: { type: String },

  professionalSummary: { type: String },
  areasOfExpertise: { type: String },
  keywords: [{ type: String }],
  languagesKnown: { type: String },
  certifications: { type: String },
  education: { type: String },

  servicesRequired: [{ type: String }],
  servicesOffered: [{ type: String }],
  preferredWorkingMode: { type: String },
  countriesServed: { type: String },
  industriesServed: { type: String },
  availability: { type: String },
  consultationCharges: { type: String },

  createdAt: { type: Date, default: Date.now }
}, { collection: 'registrations' });

module.exports = mongoose.model('Registration', RegistrationSchema);
