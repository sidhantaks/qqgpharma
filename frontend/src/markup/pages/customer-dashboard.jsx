import React, { useEffect, useState } from 'react';
import { apiPath } from '../../config/api';
import { useNavigate, Link } from 'react-router-dom';
import { showLogoutNotice } from '../utils/logoutNotice';

// Import Images
import bnrImg1 from "../../images/banner/img1.jpg";
import waveBlue from "../../images/shap/wave-blue.png";
import circleDots from "../../images/shap/circle-dots.png";
import plusBlue from "../../images/shap/plus-blue.png";
import './customer-dashboard.css';

export default function CustomerDashboard(){
  const [profile, setProfile] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);
  const [activeMenu, setActiveMenu] = useState('profile'); // 'profile' | 'logout' | 'services'
  const [editing, setEditing] = useState(false);
  const [formState, setFormState] = useState({});
  const [relatedServices, setRelatedServices] = useState([]);
  const [optedServices, setOptedServices] = useState([]);
  const [expertServices, setExpertServices] = useState([]);
  const [serviceCategories, setServiceCategories] = useState([]);
  const [serviceSubcategories, setServiceSubcategories] = useState([]);
  const [integratedServicesList, setIntegratedServicesList] = useState([]);
  const [optForm, setOptForm] = useState({ expertServiceId: '', categoryId: '', subcategoryId: '', integratedServiceId: '', notes: '' });
  const [saving, setSaving] = useState(false);
  const [showAddForm, setShowAddForm] = useState(true);
  const [editingOptId, setEditingOptId] = useState(null);
  const [editOptForm, setEditOptForm] = useState({ expertServiceId: '', categoryId: '', subcategoryId: '', integratedServiceId: '', notes: '' });
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
          // removed: education, availability, consultationCharges
        });
        // Fetch other registrations to show related services
        try {
          const regsRes = await fetch(apiPath(`/registration`));
          const regsJson = await regsRes.json().catch(()=>({}));
          if (regsRes.ok && regsJson.success) {
            const others = regsJson.data.filter(r => r._id !== j.data._id && r.userCategory === j.data.userCategory);
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

  const handleOptChange = (e) => {
    const { name, value } = e.target;
    setOptForm(prev => ({ ...prev, [name]: value }));
  }

  // Fetch options & opted services when opted menu active
  useEffect(() => {
    if (activeMenu !== 'opted') return;
    const token = localStorage.getItem('customer_token');
    // fetch opted services for customer
    (async () => {
      try {
        const res = await fetch(apiPath('/opted-services'), { headers: { Authorization: token ? 'Bearer '+token : '' } });
        const j = await res.json().catch(()=>({}));
        if (res.ok && j.success) {
          setOptedServices(j.data || []);
          // if there are any opted services, hide the add form by default
          setShowAddForm((j.data || []).length === 0);
        }
      } catch (e) {}
      try {
        const es = await fetch(apiPath('/expert-services'));
        const jes = await es.json().catch(()=>({})); if (es.ok && jes.success) setExpertServices(jes.data || []);
      } catch (e) {}
      try {
        const sc = await fetch(apiPath('/service-categories'));
        const jsc = await sc.json().catch(()=>({})); if (sc.ok && jsc.success) setServiceCategories(jsc.data || []);
      } catch (e) {}
      try {
        const ssc = await fetch(apiPath('/service-subcategories'));
        const jssc = await ssc.json().catch(()=>({})); if (ssc.ok && jssc.success) setServiceSubcategories(jssc.data || []);
      } catch (e) {}
      try {
        const isv = await fetch(apiPath('/integrated-services'));
        const jisv = await isv.json().catch(()=>({})); if (isv.ok && jisv.success) setIntegratedServicesList(jisv.data || []);
      } catch (e) {}
    })();
  }, [activeMenu]);

  const submitOpted = async () => {
    const token = localStorage.getItem('customer_token');
    if (!token) { alert('Please login'); return; }
    if (!optForm.categoryId) { alert('Please select a category'); return; }
    setSaving(true);
    try {
      const res = await fetch(apiPath('/opted-services'), {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: 'Bearer '+token },
        body: JSON.stringify(optForm)
      });
      const j = await res.json().catch(()=>({}));
      console.log('opted-services POST', res.status, j);
      if (res.status === 401) {
        setSaving(false);
        localStorage.removeItem('customer_token');
        navigate('/login');
        return;
      }
      if (!res.ok) { setSaving(false); alert(j.error || j.message || 'Failed'); return; }
      alert('Saved');
      // refresh list
      const listRes = await fetch(apiPath('/opted-services'), { headers: { Authorization: 'Bearer '+token } });
      const lj = await listRes.json().catch(()=>({})); if (listRes.ok && lj.success) setOptedServices(lj.data || []);
      // reset form
      setOptForm({ expertServiceId: '', categoryId: '', subcategoryId: '', integratedServiceId: '', notes: '' });
      // hide add form and show list
      setShowAddForm(false);
    } catch (e) { alert(e.message || 'Error'); }
    setSaving(false);
  }

  const handleEditClick = (opt) => {
    setEditingOptId(opt._id);
    setEditOptForm({
      expertServiceId: opt.expertService ? (opt.expertService._id || opt.expertService) : '',
      categoryId: opt.category ? (opt.category._id || opt.category) : '',
      subcategoryId: opt.subcategory ? (opt.subcategory._id || opt.subcategory) : '',
      integratedServiceId: opt.integratedService ? (opt.integratedService._id || opt.integratedService) : '',
      notes: opt.notes || ''
    });
    // show edit form in place of add form
    setShowAddForm(true);
  }

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditOptForm(prev => ({ ...prev, [name]: value }));
  }

  const saveEdit = async () => {
    if (!editingOptId) return;
    const token = localStorage.getItem('customer_token');
    if (!token) { alert('Please login'); return; }
    setSaving(true);
    try {
      // delete existing opted service then create new with edited values
      const del = await fetch(apiPath(`/opted-services/${editingOptId}`), { method: 'DELETE', headers: { Authorization: 'Bearer '+token } });
      if (!del.ok) { const dj = await del.json().catch(()=>({})); alert(dj.error || 'Failed to delete before update'); setSaving(false); return; }
      const res = await fetch(apiPath('/opted-services'), {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: 'Bearer '+token },
        body: JSON.stringify(editOptForm)
      });
      const j = await res.json().catch(()=>({}));
      if (!res.ok) { alert(j.error || j.message || 'Failed to save'); setSaving(false); return; }
      // refresh list
      const listRes = await fetch(apiPath('/opted-services'), { headers: { Authorization: 'Bearer '+token } });
      const lj = await listRes.json().catch(()=>({})); if (listRes.ok && lj.success) setOptedServices(lj.data || []);
      setEditingOptId(null);
      setShowAddForm(false);
      setEditOptForm({ expertServiceId: '', categoryId: '', subcategoryId: '', integratedServiceId: '', notes: '' });
    } catch (e) { alert(e.message || 'Error'); }
    setSaving(false);
  }

  const cancelEdit = () => {
    setEditingOptId(null);
    setEditOptForm({ expertServiceId: '', categoryId: '', subcategoryId: '', integratedServiceId: '', notes: '' });
    setShowAddForm(false);
  }

  // deletion not supported from UI

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
    // normalize partner countries (comma separated) to array
    ['partnerCountriesServed'].forEach(k=>{ if (payload[k] !== undefined) payload[k] = toArray(payload[k]); });
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

  const profileCompleteness = profile ? Math.round((['fullName','email','primaryMobile','organization'].filter(f => profile[f]).length / 4) * 100) : 0;

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
                      <li className={`list-group-item ${activeMenu==='opted' ? 'active' : ''}`} style={{cursor:'pointer'}} onClick={()=>setActiveMenu('opted')}>Opted Services</li>
                      <li className={`list-group-item ${activeMenu==='services' ? 'active' : ''}`} style={{cursor:'pointer'}} onClick={()=>setActiveMenu('services')}>Service Providers</li>
                      <li className={`list-group-item ${activeMenu==='logout' ? 'active' : ''}`} style={{cursor:'pointer'}} onClick={()=>{ setActiveMenu('logout'); logout(); }}>Logout</li>
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

                  {!loading && profile && (
                    <div className="profile-header d-flex align-items-center mb-3">
                      <div className="profile-avatar me-3">{(profile.fullName || profile.username || 'U').charAt(0).toUpperCase()}</div>
                      <div className="profile-summary">
                        <h5 className="mb-0">{profile.fullName || profile.username}</h5>
                        <p className="mb-0 text-muted">
                          {profile.organization ? <>{profile.organization} &nbsp;•&nbsp;</> : null}
                          {profile.website ? <a href={profile.website} target="_blank" rel="noreferrer">Visit Website</a> : 'No website'}
                        </p>
                      </div>
                    </div>
                  )}

                  {loading && <div>Loading...</div>}
                  {error && <div className="text-danger">{error}</div>}

                  {!loading && activeMenu === 'dashboard' && (
                    <div className="mb-3">
                      <div className="row g-3">
                        <div className="col-md-4">
                          <div className="stat-card p-3">
                            <div className="stat-title">Profile</div>
                            <div className="stat-value">{profileCompleteness}%</div>
                            <div className="stat-sub">Profile completeness</div>
                          </div>
                        </div>
                        <div className="col-md-4">
                          <div className="stat-card p-3">
                            <div className="stat-title">Opted Services</div>
                            <div className="stat-value">{optedServices.length}</div>
                            <div className="stat-sub">Services you've opted into</div>
                          </div>
                        </div>
                        <div className="col-md-4">
                          <div className="stat-card p-3">
                            <div className="stat-title">Related</div>
                            <div className="stat-value">{relatedServices.length}</div>
                            <div className="stat-sub">Related services nearby</div>
                          </div>
                        </div>
                      </div>

                      <div className="card p-3 mt-3">
                        <h5 className="mb-1">Welcome, {profile ? (profile.fullName || profile.username) : 'Customer'}</h5>
                        <p className="mb-0">Today is {now.toLocaleDateString(undefined, { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })} — {now.toLocaleTimeString()}</p>
                      </div>
                    </div>
                  )}

                  {!loading && activeMenu === 'profile' && profile && (
                    <div className="profile-edit-form">
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
                          <label className="form-label">Website</label>
                          {editing ? <input name="website" value={formState.website} onChange={handleFormChange} className="form-control" /> : <p>{profile.website || '—'}</p>}
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
                          <label className="form-label">Department</label>
                          {editing ? <input name="department" value={formState.department} onChange={handleFormChange} className="form-control" /> : <p>{profile.department}</p>}
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
                            <p className="mb-0"><small>Contact: {r.primaryMobile || r.email}</small></p>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  {!loading && activeMenu === 'opted' && (
                    <div>
                      <h5>My Opted Services</h5>
                      {optedServices.length === 0 && <div>No opted services yet.</div>}
                      {optedServices.length > 0 && (
                        <div className="table-responsive mb-3">
                          <table className="table table-sm">
                            <thead>
                              <tr>
                                <th>Service</th>
                                <th>Expert Service</th>
                                <th>Category</th>
                                <th>Notes</th>
                                <th>Added</th>
                                <th>Actions</th>
                              </tr>
                            </thead>
                            <tbody>
                              {optedServices.map(o => (
                                <tr key={o._id}>
                                  <td>{
                                    o.integratedServiceName || (o.integratedService && (o.integratedService.name || o.integratedService.serviceName)) || o.categoryName
                                  }</td>
                                  <td>{o.expertServiceName || (o.expertService && (o.expertService.serviceName || o.expertService.name)) || '—'}</td>
                                  <td>{o.categoryName || (o.category && (o.category.name || o.category)) || '—'}{(o.subcategoryName || (o.subcategory && (o.subcategory.name || o.subcategory))) ? ` / ${o.subcategoryName || (o.subcategory && (o.subcategory.name || o.subcategory))}` : ''}</td>
                                  <td>{o.notes || '—'}</td>
                                  <td>{new Date(o.createdAt).toLocaleString()}</td>
                                  <td>
                                    <button className="btn btn-sm btn-outline-primary" onClick={() => handleEditClick(o)}>Edit</button>
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      )}

                      {/* No Add New button: users can add only if they have no opted services */}

                      {showAddForm && !editingOptId && (
                        <div className="card mt-3 p-3 opted-form">
                          <h6>Add / Opt a Service</h6>
                          <div className="row">
                            <div className="col-md-6 mt-2">
                              <label className="form-label">Expert service</label>
                              <select name="expertServiceId" value={optForm.expertServiceId} onChange={handleOptChange} className="form-control">
                                <option value="">-- select --</option>
                                {expertServices.map(s => <option key={s._id} value={s._id}>{s.serviceName || s.name || s.serviceName}</option>)}
                              </select>
                            </div>
                            <div className="col-md-6 mt-2">
                              <label className="form-label">Category</label>
                              <select name="categoryId" value={optForm.categoryId} onChange={handleOptChange} className="form-control">
                                <option value="">-- select --</option>
                                {serviceCategories.map(c => <option key={c._id} value={c._id}>{c.name}</option>)}
                              </select>
                            </div>
                            <div className="col-md-6 mt-2">
                              <label className="form-label">Subcategory</label>
                              <select name="subcategoryId" value={optForm.subcategoryId} onChange={handleOptChange} className="form-control">
                                <option value="">-- select --</option>
                                {serviceSubcategories
                                  .filter(sc => {
                                    if (!optForm.categoryId) return true;
                                    const c = sc.category;
                                    return !!(c && (c._id === optForm.categoryId || c === optForm.categoryId));
                                  })
                                  .map(sc => <option key={sc._id} value={sc._id}>{sc.name}</option>)}
                              </select>
                            </div>
                            <div className="col-md-6 mt-2">
                              <label className="form-label">Integrated Service</label>
                              <select name="integratedServiceId" value={optForm.integratedServiceId} onChange={handleOptChange} className="form-control">
                                <option value="">-- select --</option>
                                {integratedServicesList
                                  .filter(isv => {
                                    if (optForm.categoryId) {
                                      const c = isv.category;
                                      if (!(c && (c._id === optForm.categoryId || c === optForm.categoryId))) return false;
                                    }
                                    if (optForm.subcategoryId) {
                                      const sc = isv.subcategory;
                                      if (!(sc && (sc._id === optForm.subcategoryId || sc === optForm.subcategoryId))) return false;
                                    }
                                    return true;
                                  })
                                  .map(isv => <option key={isv._id} value={isv._id}>{isv.name}</option>)}
                              </select>
                            </div>
                            <div className="col-12 mt-2">
                              <label className="form-label">Notes</label>
                              <textarea name="notes" value={optForm.notes} onChange={handleOptChange} className="form-control" rows={2}></textarea>
                            </div>
                            <div className="col-12 mt-3 text-end">
                              <button className="btn btn-primary" onClick={submitOpted} disabled={saving}>{saving ? 'Saving...' : 'Submit'}</button>
                            </div>
                          </div>
                        </div>
                      )}

                      {editingOptId && (
                        <div className="card mt-3 p-3 opted-form">
                          <h6>Edit Opted Service</h6>
                          <div className="row">
                            <div className="col-md-6 mt-2">
                              <label className="form-label">Expert service</label>
                              <select name="expertServiceId" value={editOptForm.expertServiceId} onChange={handleEditChange} className="form-control">
                                <option value="">-- select --</option>
                                {expertServices.map(s => <option key={s._id} value={s._id}>{s.serviceName || s.name || s.serviceName}</option>)}
                              </select>
                            </div>
                            <div className="col-md-6 mt-2">
                              <label className="form-label">Category</label>
                              <select name="categoryId" value={editOptForm.categoryId} onChange={handleEditChange} className="form-control">
                                <option value="">-- select --</option>
                                {serviceCategories.map(c => <option key={c._id} value={c._id}>{c.name}</option>)}
                              </select>
                            </div>
                            <div className="col-md-6 mt-2">
                              <label className="form-label">Subcategory</label>
                              <select name="subcategoryId" value={editOptForm.subcategoryId} onChange={handleEditChange} className="form-control">
                                <option value="">-- select --</option>
                                {serviceSubcategories
                                  .filter(sc => {
                                    if (!editOptForm.categoryId) return true;
                                    const c = sc.category;
                                    return !!(c && (c._id === editOptForm.categoryId || c === editOptForm.categoryId));
                                  })
                                  .map(sc => <option key={sc._id} value={sc._id}>{sc.name}</option>)}
                              </select>
                            </div>
                            <div className="col-md-6 mt-2">
                              <label className="form-label">Integrated Service</label>
                              <select name="integratedServiceId" value={editOptForm.integratedServiceId} onChange={handleEditChange} className="form-control">
                                <option value="">-- select --</option>
                                {integratedServicesList
                                  .filter(isv => {
                                    if (editOptForm.categoryId) {
                                      const c = isv.category;
                                      if (!(c && (c._id === editOptForm.categoryId || c === editOptForm.categoryId))) return false;
                                    }
                                    if (editOptForm.subcategoryId) {
                                      const sc = isv.subcategory;
                                      if (!(sc && (sc._id === editOptForm.subcategoryId || sc === editOptForm.subcategoryId))) return false;
                                    }
                                    return true;
                                  })
                                  .map(isv => <option key={isv._id} value={isv._id}>{isv.name}</option>)}
                              </select>
                            </div>
                            <div className="col-12 mt-2">
                              <label className="form-label">Notes</label>
                              <textarea name="notes" value={editOptForm.notes} onChange={handleEditChange} className="form-control" rows={2}></textarea>
                            </div>
                            <div className="col-12 mt-3 text-end">
                              <button className="btn btn-outline-secondary me-2" onClick={cancelEdit} disabled={saving}>Cancel</button>
                              <button className="btn btn-primary" onClick={saveEdit} disabled={saving}>{saving ? 'Saving...' : 'Save'}</button>
                            </div>
                          </div>
                        </div>
                      )}
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
