import React, { useEffect, useState } from 'react';
import { apiPath } from '../../config/api';
import { useNavigate, Link } from 'react-router-dom';
import { showLogoutNotice } from '../utils/logoutNotice';

// Import Images
import bnrImg1 from "../../images/banner/img1.jpg";
import waveBlue from "../../images/shap/wave-blue.png";
import circleDots from "../../images/shap/circle-dots.png";
import plusBlue from "../../images/shap/plus-blue.png";

export default function CustomerDashboard(){
  const [profile, setProfile] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);
  const [activeMenu, setActiveMenu] = useState('profile'); // 'profile' | 'logout' | 'services'
  const [editing, setEditing] = useState(false);
  const [formState, setFormState] = useState({});
  const [relatedServices, setRelatedServices] = useState([]);
  const [saving, setSaving] = useState(false);
  const [fieldErrors, setFieldErrors] = useState({});
  const navigate = useNavigate();

  const [now, setNow] = useState(new Date());

  useEffect(()=>{
    const token = localStorage.getItem('customer_token');
    if (!token) { navigate('/login'); return; }
    setLoading(true);
    fetch(apiPath(`/customer/me`), { headers: { Authorization: 'Bearer '+token } })
      .then(r => r.json())
      .then(async j => {
        if (!j.success) { setError(j.error || j.message || 'Failed'); if (j.error === 'Invalid token' || j.message === 'Invalid token') { localStorage.removeItem('customer_token'); navigate('/login'); } setLoading(false); return; }
        setProfile(j.data);
        setFormState({
          registrationNumber: j.data.registrationNumber || '',
          registrationDate: j.data.registrationDate || '',
          userCategory: j.data.userCategory || '',
          userCategoryOther: j.data.userCategoryOther || '',
          partnerCategory: j.data.partnerCategory || '',
          partnerCategoryOther: j.data.partnerCategoryOther || '',
          organizationDescription: j.data.organizationDescription || '',
          numberOfEmployees: j.data.numberOfEmployees || '',
          partnerExperience: j.data.partnerExperience || '',
          coreCompetencies: j.data.coreCompetencies || '',
          majorClients: j.data.majorClients || '',
          partnerCertifications: j.data.partnerCertifications || '',
          partnerCountriesServed: Array.isArray(j.data.partnerCountriesServed) ? j.data.partnerCountriesServed.join(', ') : (j.data.partnerCountriesServed || ''),
          title: j.data.title || '',
          fullName: j.data.fullName || '',
          username: j.data.username || '',
          designation: j.data.designation || '',
          organization: j.data.organization || '',
          department: j.data.department || '',
          experienceYears: j.data.experienceYears || '',
          primaryMobile: j.data.primaryMobile || '',
          alternateMobile: j.data.alternateMobile || '',
          email: j.data.email || '',
          website: j.data.website || '',
          linkedin: j.data.linkedin || '',
          officeAddress: j.data.officeAddress || '',
          city: j.data.city || '',
          state: j.data.state || '',
          country: j.data.country || '',
          postalCode: j.data.postalCode || '',
          professionalSummary: j.data.professionalSummary || '',
          areasOfExpertise: Array.isArray(j.data.areasOfExpertise) ? j.data.areasOfExpertise.join(', ') : (j.data.areasOfExpertise || ''),
          keywords: Array.isArray(j.data.keywords) ? j.data.keywords.join(', ') : (j.data.keywords || ''),
          languagesKnown: j.data.languagesKnown || '',
          certifications: Array.isArray(j.data.certifications) ? j.data.certifications.join(', ') : (j.data.certifications || ''),
          education: j.data.education || '',
          servicesRequired: Array.isArray(j.data.servicesRequired) ? j.data.servicesRequired.join(', ') : (j.data.servicesRequired || ''),
          servicesOffered: Array.isArray(j.data.servicesOffered) ? j.data.servicesOffered.join(', ') : (j.data.servicesOffered || ''),
          preferredWorkingMode: j.data.preferredWorkingMode || '',
          countriesServed: j.data.countriesServed || '',
          industriesServed: j.data.industriesServed || '',
          availability: j.data.availability || '',
          consultationCharges: j.data.consultationCharges || '',
          officeAddress: j.data.officeAddress || '',
        });
        // Fetch other registrations to show related services
        try {
          const regsRes = await fetch(apiPath(`/registration`));
          const regsJson = await regsRes.json().catch(()=>({}));
          if (regsRes.ok && regsJson.success) {
            const others = regsJson.data.filter(r => r._id !== j.data._id && r.userCategory === j.data.userCategory && Array.isArray(r.servicesOffered) && r.servicesOffered.length);
            setRelatedServices(others);
          }
        } catch (e) {
          // ignore
        }
        setLoading(false);
      }).catch(err=>{ setError(err.message); setLoading(false); });
  }, [navigate]);

  useEffect(() => {
    const t = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(t);
  }, []);

  const logout = ()=>{
    showLogoutNotice(() => navigate('/'));
  }

  const handleEditToggle = () => {
    setEditing(!editing);
  }

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormState(prev => ({ ...prev, [name]: value }));
    setFieldErrors(prev => ({ ...(prev||{}), [name]: undefined }));
  }

  const checkUsernameAvailability = async () => {
    const name = (formState.username || '').trim();
    if (!name || !profile) return;
    if (name === profile.username) {
      setFieldErrors(prev => ({ ...(prev||{}), username: undefined }));
      return;
    }
    try {
      const res = await fetch(apiPath(`/registration/check-username?username=${encodeURIComponent(name)}`));
      const json = await res.json().catch(()=>({}));
      if (res.ok) {
        if (!json.available) setFieldErrors(prev => ({ ...(prev||{}), username: 'Username already exists' }));
        else setFieldErrors(prev => ({ ...(prev||{}), username: undefined }));
      }
    } catch (err) {
      // ignore
    }
  }

  const handleSave = () => {
    // Persist changes to server
    const token = localStorage.getItem('customer_token');
    if (!token || !profile || !profile._id) {
      alert('Unable to save: missing auth or profile id');
      return;
    }
    // client-side validation: password confirmation
    if (formState.password && formState.password !== formState.confirmPassword) {
      setFieldErrors(prev => ({ ...(prev||{}), confirmPassword: 'Passwords do not match' }));
      return;
    }
    setSaving(true);
    // prepare payload: convert comma-separated fields to arrays
    const toArray = (v) => {
      if (!v && v !== 0) return [];
      if (Array.isArray(v)) return v;
      if (typeof v === 'string') return v.split(',').map(s=>s.trim()).filter(Boolean);
      return [v];
    };
    const payload = { ...formState };
    // normalize commonly-array fields
    ['partnerCountriesServed','areasOfExpertise','keywords','certifications','servicesRequired','servicesOffered','countriesServed','industriesServed'].forEach(k=>{
      if (payload[k] !== undefined) payload[k] = toArray(payload[k]);
    });
    // remove confirmPassword helper
    delete payload.confirmPassword;
    // if password empty, remove it so backend doesn't change
    if (!payload.password) delete payload.password;

    fetch(apiPath(`/registration/${profile._id}`), {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
      },
      body: JSON.stringify(payload)
    }).then(async res => {
      const json = await res.json().catch(() => ({}));
      if (!res.ok) {
        if (json && json.field) {
          // show inline field error
          setFieldErrors(prev => ({ ...(prev||{}), [json.field]: json.error }));
          return;
        }
        setError(json.error || json.message || 'Failed to save');
        return;
      }
      setProfile(json.data);
      setEditing(false);
      setError('');
      // persist profile to localStorage so header can show updated name
      try { localStorage.setItem('customer_profile', JSON.stringify(json.data)); window.dispatchEvent(new Event('customer_profile_updated')); } catch (e) {}
      alert('Profile saved');
    }).catch(err => setError(err.message)).finally(()=>setSaving(false));
  }

  return (
    <div className="page-content">

      <div className="banner-wraper">
        <div className="page-banner" style={{backgroundImage: "url("+bnrImg1+")"}}>
          <div className="container">
            <div className="page-banner-entry text-center">
              <h1>Customer Dashboard</h1>
              <nav aria-label="breadcrumb" className="breadcrumb-row">
                <ul className="breadcrumb">
                  <li className="breadcrumb-item"><Link to="/">Home</Link></li>
                  <li className="breadcrumb-item active" aria-current="page">Customer Dashboard</li>
                </ul>
              </nav>
            </div>
          </div>
          <img className="pt-img1 animate-wave" src={waveBlue} alt=""/>
          <img className="pt-img2 animate2" src={circleDots} alt=""/>
          <img className="pt-img3 animate-rotate" src={plusBlue} alt=""/>
          
        </div>
      </div>

      <div className="section-area account-wraper2">
        <div className="container">
          <div className="row">
            <div className="col-md-3">
              <div className="card mb-3">
                <div className="card-body p-2">
                    <ul className="list-group list-group-flush">
                      <li className={`list-group-item ${activeMenu==='dashboard' ? 'active' : ''}`} style={{cursor:'pointer'}} onClick={()=>setActiveMenu('dashboard')}>Dashboard</li>
                      <li className={`list-group-item ${activeMenu==='profile' ? 'active' : ''}`} style={{cursor:'pointer'}} onClick={()=>setActiveMenu('profile')}>Profile Details</li>
                      <li className={`list-group-item ${activeMenu==='logout' ? 'active' : ''}`} style={{cursor:'pointer'}} onClick={()=>{ setActiveMenu('logout'); logout(); }}>Logout</li>
                      <li className={`list-group-item ${activeMenu==='services' ? 'active' : ''}`} style={{cursor:'pointer'}} onClick={()=>setActiveMenu('services')}>Services Offered (Peers)</li>
                    </ul>
                </div>
              </div>
            </div>
            <div className="col-md-9">
              <div className="card">
                <div className="card-body">
                  <div className="d-flex justify-content-between align-items-center mb-3">
                    <h4 className="mb-0">Customer Dashboard</h4>
                    <div>
                      {activeMenu === 'profile' && (
                        <>
                          <button className="btn btn-outline-primary me-2" onClick={handleEditToggle}>{editing ? 'Cancel' : 'Edit'}</button>
                          {editing && <button className="btn btn-primary" onClick={handleSave} disabled={saving}>{saving ? 'Saving...' : 'Save'}</button>}
                        </>
                      )}
                    </div>
                  </div>

                  {loading && <div>Loading...</div>}
                  {error && <div className="text-danger">{error}</div>}

                  {!loading && activeMenu === 'dashboard' && (
                    <div className="mb-3">
                      <div className="card p-3 mb-3">
                        <h5 className="mb-1">Welcome, {profile ? (profile.fullName || profile.username) : 'Customer'}</h5>
                        <p className="mb-0">Today is {now.toLocaleDateString(undefined, { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })} — {now.toLocaleTimeString()}</p>
                      </div>
                    </div>
                  )}

                  {!loading && activeMenu === 'profile' && profile && (
                    <div>
                      <h5>Profile</h5>
                      <div className="row">
                        <div className="col-md-4">
                          <label className="form-label">Registration Number</label>
                          {editing ? <input name="registrationNumber" value={formState.registrationNumber} onChange={handleFormChange} className="form-control" /> : <p>{profile.registrationNumber || '—'}</p>}
                        </div>
                        <div className="col-md-4">
                          <label className="form-label">Registration Date</label>
                          {editing ? <input type="date" name="registrationDate" value={formState.registrationDate} onChange={handleFormChange} className="form-control" /> : <p>{profile.registrationDate || '—'}</p>}
                        </div>
                        <div className="col-md-4">
                          <label className="form-label">User Category</label>
                          {editing ? <input name="userCategory" value={formState.userCategory} onChange={handleFormChange} className="form-control" /> : <p>{profile.userCategory || '—'}</p>}
                        </div>

                        <div className="col-md-6 mt-3">
                          <label className="form-label">Full Name</label>
                          {editing ? <input name="fullName" value={formState.fullName} onChange={handleFormChange} className="form-control" /> : <p>{profile.fullName}</p>}
                        </div>
                        <div className="col-md-6 mt-3">
                          <label className="form-label">Title</label>
                          {editing ? <input name="title" value={formState.title} onChange={handleFormChange} className="form-control" /> : <p>{profile.title}</p>}
                        </div>

                        <div className="col-md-6 mt-3">
                          <label className="form-label">Email</label>
                          {editing ? <input name="email" value={formState.email} onChange={handleFormChange} className="form-control" /> : <p>{profile.email}</p>}
                        </div>
                        <div className="col-md-6 mt-3">
                          <label className="form-label">Primary Mobile</label>
                          {editing ? <input name="primaryMobile" value={formState.primaryMobile} onChange={handleFormChange} className="form-control" /> : <p>{profile.primaryMobile}</p>}
                        </div>

                        <div className="col-md-6 mt-3">
                          <label className="form-label">Alternate Mobile</label>
                          {editing ? <input name="alternateMobile" value={formState.alternateMobile} onChange={handleFormChange} className="form-control" /> : <p>{profile.alternateMobile}</p>}
                        </div>
                        <div className="col-md-6 mt-3">
                          <label className="form-label">Organization</label>
                          {editing ? <input name="organization" value={formState.organization} onChange={handleFormChange} className="form-control" /> : <p>{profile.organization}</p>}
                        </div>

                        <div className="col-md-6 mt-3">
                          <label className="form-label">Designation</label>
                          {editing ? <input name="designation" value={formState.designation} onChange={handleFormChange} className="form-control" /> : <p>{profile.designation}</p>}
                        </div>
                        <div className="col-md-6 mt-3">
                          <label className="form-label">Department</label>
                          {editing ? <input name="department" value={formState.department} onChange={handleFormChange} className="form-control" /> : <p>{profile.department}</p>}
                        </div>

                        <div className="col-md-6 mt-3">
                          <label className="form-label">Experience Years</label>
                          {editing ? <input type="number" name="experienceYears" value={formState.experienceYears} onChange={handleFormChange} className="form-control" /> : <p>{profile.experienceYears}</p>}
                        </div>
                        <div className="col-md-6 mt-3">
                          <label className="form-label">Username</label>
                          {editing ? (
                            <>
                              <input name="username" value={formState.username || ''} onChange={handleFormChange} onBlur={checkUsernameAvailability} className={"form-control" + (fieldErrors.username ? ' is-invalid' : '')} />
                              {fieldErrors.username && <div className="invalid-feedback d-block">{fieldErrors.username}</div>}
                            </>
                          ) : <p>{profile.username || '—'}</p>}
                        </div>

                        <div className="col-md-6 mt-3">
                          <label className="form-label">Password (leave blank to keep)</label>
                          {editing ? (
                            <>
                              <input name="password" type="password" value={formState.password || ''} onChange={handleFormChange} className={"form-control" + (fieldErrors.password ? ' is-invalid' : '')} />
                              <input name="confirmPassword" type="password" value={formState.confirmPassword || ''} onChange={handleFormChange} placeholder="Confirm password" className={"form-control mt-2" + (fieldErrors.confirmPassword ? ' is-invalid' : '')} />
                              {fieldErrors.confirmPassword && <div className="invalid-feedback d-block">{fieldErrors.confirmPassword}</div>}
                            </>
                          ) : <p>••••••••</p>}
                        </div>

                        <div className="col-12 mt-3">
                          <label className="form-label">Office Address</label>
                          {editing ? <textarea name="officeAddress" value={formState.officeAddress} onChange={handleFormChange} className="form-control" rows={2} /> : <p>{profile.officeAddress}</p>}
                        </div>

                        <div className="col-md-3 mt-3">
                          <label className="form-label">City</label>
                          {editing ? <input name="city" value={formState.city} onChange={handleFormChange} className="form-control" /> : <p>{profile.city}</p>}
                        </div>
                        <div className="col-md-3 mt-3">
                          <label className="form-label">State</label>
                          {editing ? <input name="state" value={formState.state} onChange={handleFormChange} className="form-control" /> : <p>{profile.state}</p>}
                        </div>
                        <div className="col-md-3 mt-3">
                          <label className="form-label">Country</label>
                          {editing ? <input name="country" value={formState.country} onChange={handleFormChange} className="form-control" /> : <p>{profile.country}</p>}
                        </div>
                        <div className="col-md-3 mt-3">
                          <label className="form-label">Postal Code</label>
                          {editing ? <input name="postalCode" value={formState.postalCode} onChange={handleFormChange} className="form-control" /> : <p>{profile.postalCode}</p>}
                        </div>

                        <div className="col-12 mt-3">
                          <label className="form-label">Professional Summary</label>
                          {editing ? <textarea name="professionalSummary" value={formState.professionalSummary} onChange={handleFormChange} className="form-control" rows={3} /> : <p>{profile.professionalSummary}</p>}
                        </div>

                        <div className="col-md-6 mt-3">
                          <label className="form-label">Areas Of Expertise</label>
                          {editing ? <input name="areasOfExpertise" value={formState.areasOfExpertise} onChange={handleFormChange} className="form-control" placeholder="comma separated" /> : <p>{Array.isArray(profile.areasOfExpertise) ? profile.areasOfExpertise.join(', ') : profile.areasOfExpertise}</p>}
                        </div>
                        <div className="col-md-6 mt-3">
                          <label className="form-label">Keywords</label>
                          {editing ? <input name="keywords" value={formState.keywords} onChange={handleFormChange} className="form-control" placeholder="comma separated" /> : <p>{Array.isArray(profile.keywords) ? profile.keywords.join(', ') : profile.keywords}</p>}
                        </div>

                        <div className="col-md-6 mt-3">
                          <label className="form-label">Languages Known</label>
                          {editing ? <input name="languagesKnown" value={formState.languagesKnown} onChange={handleFormChange} className="form-control" /> : <p>{profile.languagesKnown}</p>}
                        </div>
                        <div className="col-md-6 mt-3">
                          <label className="form-label">Certifications</label>
                          {editing ? <input name="certifications" value={formState.certifications} onChange={handleFormChange} className="form-control" placeholder="comma separated" /> : <p>{Array.isArray(profile.certifications) ? profile.certifications.join(', ') : profile.certifications}</p>}
                        </div>

                        <div className="col-12 mt-3">
                          <label className="form-label">Education</label>
                          {editing ? <textarea name="education" value={formState.education} onChange={handleFormChange} className="form-control" rows={2} /> : <p>{profile.education}</p>}
                        </div>

                        <div className="col-md-6 mt-3">
                          <label className="form-label">Services Required</label>
                          {editing ? <input name="servicesRequired" value={formState.servicesRequired} onChange={handleFormChange} className="form-control" placeholder="comma separated" /> : <p>{Array.isArray(profile.servicesRequired) ? profile.servicesRequired.join(', ') : profile.servicesRequired}</p>}
                        </div>
                        <div className="col-md-6 mt-3">
                          <label className="form-label">Services Offered</label>
                          {editing ? <input name="servicesOffered" value={formState.servicesOffered} onChange={handleFormChange} className="form-control" placeholder="comma separated" /> : <p>{Array.isArray(profile.servicesOffered) ? profile.servicesOffered.join(', ') : profile.servicesOffered}</p>}
                        </div>

                        <div className="col-md-4 mt-3">
                          <label className="form-label">Preferred Working Mode</label>
                          {editing ? <input name="preferredWorkingMode" value={formState.preferredWorkingMode} onChange={handleFormChange} className="form-control" /> : <p>{profile.preferredWorkingMode}</p>}
                        </div>
                        <div className="col-md-4 mt-3">
                          <label className="form-label">Countries Served</label>
                          {editing ? <input name="countriesServed" value={formState.countriesServed} onChange={handleFormChange} className="form-control" placeholder="comma separated" /> : <p>{profile.countriesServed}</p>}
                        </div>
                        <div className="col-md-4 mt-3">
                          <label className="form-label">Industries Served</label>
                          {editing ? <input name="industriesServed" value={formState.industriesServed} onChange={handleFormChange} className="form-control" placeholder="comma separated" /> : <p>{profile.industriesServed}</p>}
                        </div>

                        <div className="col-md-4 mt-3">
                          <label className="form-label">Availability</label>
                          {editing ? <input name="availability" value={formState.availability} onChange={handleFormChange} className="form-control" /> : <p>{profile.availability}</p>}
                        </div>
                        <div className="col-md-4 mt-3">
                          <label className="form-label">Consultation Charges</label>
                          {editing ? <input name="consultationCharges" value={formState.consultationCharges} onChange={handleFormChange} className="form-control" /> : <p>{profile.consultationCharges}</p>}
                        </div>

                        {/* Partner specific fields */}
                        { (profile.userCategory === 'Partner' || formState.userCategory === 'Partner') && (
                          <>
                            <div className="col-12 mt-4"><h6>Partner Details</h6></div>
                            <div className="col-md-6 mt-2">
                              <label className="form-label">Partner Category</label>
                              {editing ? <input name="partnerCategory" value={formState.partnerCategory} onChange={handleFormChange} className="form-control" /> : <p>{profile.partnerCategory}</p>}
                            </div>
                            <div className="col-md-6 mt-2">
                              <label className="form-label">Number Of Employees</label>
                              {editing ? <input name="numberOfEmployees" type="number" value={formState.numberOfEmployees} onChange={handleFormChange} className="form-control" /> : <p>{profile.numberOfEmployees}</p>}
                            </div>
                            <div className="col-12 mt-2">
                              <label className="form-label">Organization Description</label>
                              {editing ? <textarea name="organizationDescription" value={formState.organizationDescription} onChange={handleFormChange} className="form-control" rows={2} /> : <p>{profile.organizationDescription}</p>}
                            </div>
                            <div className="col-md-6 mt-2">
                              <label className="form-label">Core Competencies</label>
                              {editing ? <input name="coreCompetencies" value={formState.coreCompetencies} onChange={handleFormChange} className="form-control" /> : <p>{profile.coreCompetencies}</p>}
                            </div>
                            <div className="col-md-6 mt-2">
                              <label className="form-label">Major Clients</label>
                              {editing ? <input name="majorClients" value={formState.majorClients} onChange={handleFormChange} className="form-control" /> : <p>{profile.majorClients}</p>}
                            </div>
                            <div className="col-md-6 mt-2">
                              <label className="form-label">Partner Certifications</label>
                              {editing ? <input name="partnerCertifications" value={formState.partnerCertifications} onChange={handleFormChange} className="form-control" /> : <p>{profile.partnerCertifications}</p>}
                            </div>
                            <div className="col-md-6 mt-2">
                              <label className="form-label">Partner Countries Served</label>
                              {editing ? <input name="partnerCountriesServed" value={formState.partnerCountriesServed} onChange={handleFormChange} className="form-control" placeholder="comma separated" /> : <p>{Array.isArray(profile.partnerCountriesServed) ? profile.partnerCountriesServed.join(', ') : profile.partnerCountriesServed}</p>}
                            </div>
                          </>
                        )}

                      </div>
                    </div>
                  )}

                  {!loading && activeMenu === 'services' && (
                    <div>
                      <h5>Services offered by other clients in the same category</h5>
                      {relatedServices.length === 0 && <div>No related services found.</div>}
                      {relatedServices.map(r => (
                        <div key={r._id} className="card mb-2">
                          <div className="card-body">
                            <h6 className="mb-1">{r.fullName} — {r.organization || '—'}</h6>
                            <p className="mb-1"><strong>Services Offered:</strong> {Array.isArray(r.servicesOffered) ? r.servicesOffered.join(', ') : (r.servicesOffered || '—')}</p>
                            <p className="mb-0"><small>Contact: {r.primaryMobile || r.email}</small></p>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
