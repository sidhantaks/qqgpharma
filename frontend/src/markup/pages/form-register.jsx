import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { apiPath } from '../../config/api';
// Images for banner
import bnrImg1 from "../../images/banner/img1.jpg";
import waveBlue from "../../images/shap/wave-blue.png";
import circleDots from "../../images/shap/circle-dots.png";
import plusBlue from "../../images/shap/plus-blue.png";
import './form-register.css';

export default function FormRegister() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    registrationNumber: '',
    registrationDate: new Date().toISOString().slice(0,10),
    userCategory: '',
    userCategoryOther: '',
    partnerCategory: '',
    partnerCategoryOther: '',
    organizationDescription: '',
    numberOfEmployees: '',
    partnerExperience: '',
    coreCompetencies: '',
    majorClients: '',
    partnerCertifications: '',
    partnerCountriesServed: '',
    title: 'Mr.',
    fullName: '',
    username: '',
    password: '',
    confirmPassword: '',
    designation: '',
    organization: '',
    department: '',
    experienceYears: '',
    primaryMobile: '',
    alternateMobile: '',
    email: '',
    website: '',
    officeAddress: '',
    city: '',
    state: '',
    country: '',
    postalCode: '',
    // removed: education, availability, consultationCharges
  });
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [createdRegNo, setCreatedRegNo] = useState(null);
  const [photographFile, setPhotographFile] = useState(null);
  const [supportFiles, setSupportFiles] = useState([]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
    setError('');
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    if (name === 'photograph') setPhotographFile(files[0] || null);
    if (name === 'supportingDocuments') setSupportFiles(Array.from(files || []));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (form.password !== form.confirmPassword) { setError('Passwords do not match'); return; }
    setSaving(true);
    try {
      const payload = { ...form };
      // registrationNumber is auto-generated on the server; do not send any client value
      if (payload.registrationNumber) delete payload.registrationNumber;
      // convert partner countries to array if comma separated
      if (payload.partnerCountriesServed && typeof payload.partnerCountriesServed === 'string') payload.partnerCountriesServed = payload.partnerCountriesServed.split(',').map(s=>s.trim()).filter(Boolean);

      let res;
      if (photographFile || supportFiles.length) {
        const fd = new FormData();
        Object.keys(payload).forEach(k => {
          const v = payload[k];
          if (v === undefined || v === null) return;
          if (Array.isArray(v)) fd.append(k, JSON.stringify(v));
          else fd.append(k, v);
        });
        if (photographFile) fd.append('photograph', photographFile);
        supportFiles.forEach(f => fd.append('supportingDocuments', f));
        res = await fetch(apiPath('/registration'), { method: 'POST', body: fd });
      } else {
        res = await fetch(apiPath('/registration'), { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) });
      }
      const j = await res.json().catch(()=>({}));
      if (!res.ok) { setError(j.error || j.message || 'Failed to register'); setSaving(false); return; }
      const regNo = j && j.data && j.data.registrationNumber;
      if (regNo) {
        setForm(prev => ({ ...prev, registrationNumber: regNo }));
        setCreatedRegNo(regNo);
      }
    } catch (err) {
      setError(err.message || 'Failed');
    }
    setSaving(false);
  };

  const isPartner = form.userCategory === 'Partner' || form.userCategory === 'Client / Partner';

  useEffect(() => {
    // fetch predicted next registration number (non-reserving) and display it
    (async () => {
      try {
        const res = await fetch(apiPath('/registration/next-number'));
        const j = await res.json().catch(()=>({}));
        if (res.ok && j && j.registrationNumber) {
          setForm(prev => ({ ...prev, registrationNumber: j.registrationNumber }));
        }
      } catch (e) {
        // ignore
      }
    })();
  }, []);

  return (
    <div className="page-content">
      <div>
        <div className="banner-wraper">
          <div className="page-banner" style={{ backgroundImage: "url(" + bnrImg1 + ")" }}>
            <div className="container">
              <div className="page-banner-entry text-center">
                <h1>Registration</h1>
                <nav aria-label="breadcrumb" className="breadcrumb-row">
                  <ul className="breadcrumb">
                    <li className="breadcrumb-item"><Link to="/">Home</Link></li>
                    <li className="breadcrumb-item active" aria-current="page">Registration</li>
                  </ul>
                </nav>
              </div>
            </div>
            <img className="pt-img1 animate-wave" src={waveBlue} alt="" />
            <img className="pt-img2 animate2" src={circleDots} alt="" />
            <img className="pt-img3 animate-rotate" src={plusBlue} alt="" />
          </div>
        </div>
        <div className="container py-5">
          <div className="row justify-content-center">
            <div className="col-lg-10">
              <div className="card p-4">
                <h3 className="mb-3">Registration</h3>
                {error && <div className="alert alert-danger">{error}</div>}
                {createdRegNo && (
                  <div className="alert alert-success">
                    Registered successfully — Registration Number: <strong>{createdRegNo}</strong>
                    <div className="mt-2 text-end">
                      <button className="btn btn-primary" onClick={() => navigate('/login')}>Continue to Login</button>
                    </div>
                  </div>
                )}
                <form onSubmit={handleSubmit}>
                  <div className="row">
                    <div className="col-12">
                      <div className="section-bg violet">
                        <div className="row">
                    <div className="col-md-4 mb-2">
                      <label>Registration Number</label>
                      <input value={form.registrationNumber || ''} className="form-control" placeholder="Auto-generated (QGPS/YYYY/MM/0001)" disabled />
                    </div>
                    <div className="col-md-4 mb-2">
                      <label>Registration Date</label>
                      <input name="registrationDate" type="date" value={form.registrationDate} onChange={handleChange} className="form-control" disabled readOnly />
                    </div>
                    <div className="col-md-4 mb-2">
                      <label>Category</label>
                      <select name="userCategory" value={form.userCategory} onChange={handleChange} className="form-control">
                        <option value="">Select</option>
                        <option value="Client">Client</option>
                        <option value="Partner">Partner</option>
                        <option value="Client / Partner">Client / Partner</option>
                      </select>
                    </div>

                    <div className="col-md-4 mb-2">
                      <label>Title</label>
                      <select name="title" value={form.title} onChange={handleChange} className="form-control">
                        <option>Mr.</option>
                        <option>Ms.</option>
                        <option>Mrs.</option>
                        <option>Dr.</option>
                        <option>Prof.</option>
                      </select>
                    </div>
                    <div className="col-md-4 mb-2">
                      <label>Full Name</label>
                      <input name="fullName" value={form.fullName} onChange={handleChange} className="form-control" data-variant="violet" required />
                    </div>

                    <div className="col-md-4 mb-2">
                      <label>Username</label>
                      <input name="username" value={form.username} onChange={handleChange} className="form-control" data-variant="violet" required />
                    </div>
                    <div className="col-md-4 mb-2">
                      <label>Email</label>
                      <input name="email" value={form.email} onChange={handleChange} className="form-control" data-variant="teal" type="email" />
                    </div>
                    <div className="col-md-4 mb-2">
                      <label>Website</label>
                      <input name="website" value={form.website} onChange={handleChange} className="form-control" data-variant="teal" type="url" placeholder="https://example.com" />
                    </div>
                        </div>
                      </div>
                    </div>

                    <div className="col-12 mt-2">
                      <div className="section-bg coral">
                        <div className="row">
                          <div className="col-md-4 mb-2">
                            <label>Password</label>
                            <input name="password" value={form.password} onChange={handleChange} className="form-control" data-variant="coral" type="password" required />
                          </div>
                          <div className="col-md-4 mb-2">
                            <label>Confirm Password</label>
                            <input name="confirmPassword" value={form.confirmPassword} onChange={handleChange} className="form-control" data-variant="coral" type="password" required />
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="col-12 mt-2">
                      <div className="section-bg teal">
                        <div className="row">
                          <div className="col-md-4 mb-2">
                            <label>Primary Mobile</label>
                            <input name="primaryMobile" value={form.primaryMobile} onChange={handleChange} className="form-control" data-variant="teal" />
                          </div>
                          <div className="col-md-4 mb-2">
                            <label>Alternate Mobile</label>
                            <input name="alternateMobile" value={form.alternateMobile} onChange={handleChange} className="form-control" />
                          </div>

                          <div className="col-md-4 mb-2">
                            <label>Organization</label>
                            <input name="organization" value={form.organization} onChange={handleChange} className="form-control" data-variant="violet" />
                          </div>
                          <div className="col-md-4 mb-2">
                            <label>Department</label>
                            <input name="department" value={form.department} onChange={handleChange} className="form-control" />
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="col-12 mt-2">
                      <div className="section-bg violet">
                        <div className="row">
                          <div className="col-md-4 mt-2">
                            <label>Office Address</label>
                            <textarea name="officeAddress" value={form.officeAddress} onChange={handleChange} className="form-control" rows={2}></textarea>
                          </div>

                          <div className="col-md-4 mt-2">
                            <label>City</label>
                            <input name="city" value={form.city} onChange={handleChange} className="form-control" />
                          </div>
                          <div className="col-md-4 mt-2">
                            <label>State</label>
                            <input name="state" value={form.state} onChange={handleChange} className="form-control" />
                          </div>
                          <div className="col-md-4 mt-2">
                            <label>Country</label>
                            <input name="country" value={form.country} onChange={handleChange} className="form-control" />
                          </div>
                          <div className="col-md-4 mt-2">
                            <label>Postal Code</label>
                            <input name="postalCode" value={form.postalCode} onChange={handleChange} className="form-control" />
                          </div>
                        </div>
                      </div>
                    </div>

                    {isPartner && (
                      <>
                        <div className="col-12 mt-3"><div className="section-bg coral"><h6 className="mb-0">Partner Details</h6></div></div>
                        <div className="col-md-4 mt-2">
                          <label>Partner Category</label>
                          <select name="partnerCategory" value={form.partnerCategory} onChange={handleChange} className="form-control">
                            <option value="">Select</option>
                            <option value="Individual Consultant">Individual Consultant</option>
                            <option value="Freelancer">Freelancer</option>
                            <option value="Company">Company</option>
                            <option value="Advisory Firm">Advisory Firm</option>
                            <option value="Manufacturing Partner">Manufacturing Partner</option>
                            <option value="Laboratory">Laboratory</option>
                            <option value="Software Provider">Software Provider</option>
                            <option value="Service Provider">Service Provider</option>
                            <option value="Training Organization">Training Organization</option>
                            <option value="Contract Research Organization (CRO)">Contract Research Organization (CRO)</option>
                            <option value="Contract Manufacturing Organization (CMO)">Contract Manufacturing Organization (CMO)</option>
                            <option value="Other">Other</option>
                          </select>
                        </div>
                        <div className="col-md-4 mt-2">
                          <label>Number Of Employees</label>
                          <input name="numberOfEmployees" type="number" value={form.numberOfEmployees} onChange={handleChange} className="form-control" />
                        </div>
                        <div className="col-md-4 mt-2">
                          <label>Organization Description</label>
                          <input name="organizationDescription" type="text" value={form.organizationDescription} onChange={handleChange} className="form-control" />
                        </div>
                        <div className="col-md-4 mt-2">
                          <label>Core Competencies</label>
                          <input name="coreCompetencies" value={form.coreCompetencies} onChange={handleChange} className="form-control" />
                        </div>
                        <div className="col-md-4 mt-2">
                          <label>Major Clients</label>
                          <input name="majorClients" value={form.majorClients} onChange={handleChange} className="form-control" />
                        </div>
                        <div className="col-md-4 mt-2">
                          <label>Certifications (comma separated)</label>
                          <input name="partnerCertifications" value={form.partnerCertifications} onChange={handleChange} className="form-control" />
                        </div>
                        <div className="col-md-4 mt-2">
                          <label>Countries Served (comma separated)</label>
                          <input name="partnerCountriesServed" value={form.partnerCountriesServed} onChange={handleChange} className="form-control" />
                        </div>
                        <div className="col-md-4 mt-2">
                          <label>Supporting Documents</label>
                          <input name="supportingDocuments" onChange={handleFileChange} className="form-control" type="file" multiple />
                        </div>
                        <div className="col-md-4 mt-2">
                          <label>Photograph</label>
                          <input name="photograph" onChange={handleFileChange} className="form-control" type="file" />
                        </div>
                      </>
                    )}

                    <div className="col-12 mt-3 text-end">
                      <button className="btn btn-secondary me-2" type="button" onClick={() => navigate('/login')}>Back to Login</button>
                      <button className="btn btn-primary" disabled={saving}>{saving ? 'Registering...' : 'Register'}</button>
                    </div>
                  </div>
                </form>
                <div className="mt-3 text-muted">Already have an account? <Link to="/login">Login</Link></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
