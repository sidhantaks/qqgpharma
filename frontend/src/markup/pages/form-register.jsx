import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { showLogoutNotice } from '../utils/logoutNotice';

// Images
import bnrImg1 from "../../images/banner/img1.jpg";
import waveBlue from "../../images/shap/wave-blue.png";
import circleDots from "../../images/shap/circle-dots.png";
import plusBlue from "../../images/shap/plus-blue.png";
import { apiPath } from '../../config/api';

export default function CustomerDashboard() {
  const navigate = useNavigate();

  const [profile, setProfile] = useState(null);
  const [formState, setFormState] = useState({});
  const [relatedServices, setRelatedServices] = useState([]);

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const [editing, setEditing] = useState(false);
  const [activeMenu, setActiveMenu] = useState('dashboard');

  const [fieldErrors, setFieldErrors] = useState({});

  const [now, setNow] = useState(new Date());

  /* =========================================================
     LOAD CUSTOMER PROFILE
  ========================================================= */

  useEffect(() => {
    const token = localStorage.getItem('customer_token');

    if (!token) {
      navigate('/login');
      return;
    }

    loadProfile(token);
  }, [navigate]);

  /* =========================================================
     CLOCK
  ========================================================= */

  useEffect(() => {
    const timer = setInterval(() => {
      setNow(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  /* =========================================================
     LOAD PROFILE
  ========================================================= */

  const loadProfile = async (token) => {
    try {
      setLoading(true);
      setError('');

      const response = await fetch(apiPath(`/customer/me`), {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: 'application/json'
        }
      });

      const json = await response.json().catch(() => ({}));

      if (!response.ok || !json.success) {
        const message =
          json.error ||
          json.message ||
          'Unable to load customer profile';

        if (
          message === 'Invalid token' ||
          message.toLowerCase().includes('token')
        ) {
          localStorage.removeItem('customer_token');
          localStorage.removeItem('customer_profile');
          navigate('/login');
          return;
        }

        throw new Error(message);
      }

      const data = json.data;

      setProfile(data);

      setFormState({
        registrationNumber: data.registrationNumber || '',
        registrationDate: data.registrationDate
          ? String(data.registrationDate).slice(0, 10)
          : '',

        userCategory: data.userCategory || '',

        partnerCategory: data.partnerCategory || '',
        partnerCategoryOther: data.partnerCategoryOther || '',
        organizationDescription: data.organizationDescription || '',
        numberOfEmployees: data.numberOfEmployees ?? '',
        partnerExperience: data.partnerExperience || '',
        coreCompetencies: data.coreCompetencies || '',
        majorClients: data.majorClients || '',
        partnerCertifications: data.partnerCertifications || '',

        partnerCountriesServed: Array.isArray(
          data.partnerCountriesServed
        )
          ? data.partnerCountriesServed.join(', ')
          : data.partnerCountriesServed || '',

        title: data.title || 'Mr.',
        username: data.username || '',
        password: '',
        confirmPassword: '',

        fullName: data.fullName || '',
        organization: data.organization || '',
        department: data.department || '',

        primaryMobile: data.primaryMobile || '',
        alternateMobile: data.alternateMobile || '',

        email: data.email || '',
        website: data.website || '',

        officeAddress: data.officeAddress || '',
        city: data.city || '',
        state: data.state || '',
        country: data.country || '',
        postalCode: data.postalCode || ''
      });

      loadRelatedServices(data);

    } catch (err) {
      console.error('Profile loading error:', err);
      setError(err.message || 'Failed to load profile');
    } finally {
      setLoading(false);
    }
  };

  /* =========================================================
     RELATED SERVICES
  ========================================================= */

  const loadRelatedServices = async (currentProfile) => {
    try {
      const response = await fetch(apiPath(`/registration`));

      const json = await response.json().catch(() => ({}));

      if (!response.ok || !json.success) {
        return;
      }

      const registrations = Array.isArray(json.data)
        ? json.data
        : [];

      const currentId = currentProfile._id;

      const others = registrations.filter((item) => {
        if (item._id === currentId) {
          return false;
        }

        if (
          item.userCategory !== currentProfile.userCategory
        ) {
          return false;
        }

        if (
          !item.servicesOffered ||
          (
            Array.isArray(item.servicesOffered) &&
            item.servicesOffered.length === 0
          )
        ) {
          return false;
        }

        return true;
      });

      setRelatedServices(others);

    } catch (err) {
      console.error('Related services error:', err);
    }
  };

  /* =========================================================
     FORM CHANGE
  ========================================================= */

  const handleFormChange = (e) => {
    const { name, value } = e.target;

    setFormState((prev) => ({
      ...prev,
      [name]: value
    }));

    setFieldErrors((prev) => ({
      ...prev,
      [name]: undefined
    }));

    setError('');
    setSuccess('');
  };

  /* =========================================================
     USERNAME CHECK
  ========================================================= */

  const checkUsernameAvailability = async () => {
    const username = (formState.username || '').trim();

    if (!username || !profile) {
      return;
    }

    if (username === profile.username) {
      setFieldErrors((prev) => ({
        ...prev,
        username: undefined
      }));

      return;
    }

    try {
      const response = await fetch(apiPath(`/registration/check-username?username=${encodeURIComponent(username)}`));

      const json = await response.json().catch(() => ({}));

      if (!response.ok) {
        return;
      }

      if (!json.available) {
        setFieldErrors((prev) => ({
          ...prev,
          username: 'Username already exists'
        }));
      } else {
        setFieldErrors((prev) => ({
          ...prev,
          username: undefined
        }));
      }

    } catch (err) {
      console.error('Username check error:', err);
    }
  };

  /* =========================================================
     EDIT
  ========================================================= */

  const handleEditToggle = () => {
    if (editing) {
      resetForm();
    }

    setEditing(!editing);
  };

  /* =========================================================
     RESET FORM
  ========================================================= */

  const resetForm = () => {
    if (!profile) return;

    setFormState({
      registrationNumber: profile.registrationNumber || '',
      registrationDate: profile.registrationDate
        ? String(profile.registrationDate).slice(0, 10)
        : '',

      userCategory: profile.userCategory || '',

      partnerCategory: profile.partnerCategory || '',
      partnerCategoryOther: profile.partnerCategoryOther || '',
      organizationDescription:
        profile.organizationDescription || '',
      numberOfEmployees:
        profile.numberOfEmployees ?? '',
      partnerExperience:
        profile.partnerExperience || '',
      coreCompetencies:
        profile.coreCompetencies || '',
      majorClients:
        profile.majorClients || '',
      partnerCertifications:
        profile.partnerCertifications || '',

      partnerCountriesServed:
        Array.isArray(profile.partnerCountriesServed)
          ? profile.partnerCountriesServed.join(', ')
          : profile.partnerCountriesServed || '',

      title: profile.title || 'Mr.',
      username: profile.username || '',
      password: '',
      confirmPassword: '',

      fullName: profile.fullName || '',
      organization: profile.organization || '',
      department: profile.department || '',

      primaryMobile: profile.primaryMobile || '',
      alternateMobile: profile.alternateMobile || '',

      email: profile.email || '',
      website: profile.website || '',

      officeAddress: profile.officeAddress || '',
      city: profile.city || '',
      state: profile.state || '',
      country: profile.country || '',
      postalCode: profile.postalCode || ''
    });

    setFieldErrors({});
    setError('');
    setSuccess('');
  };

  /* =========================================================
     ARRAY CONVERSION
  ========================================================= */

  const toArray = (value) => {
    if (!value && value !== 0) {
      return [];
    }

    if (Array.isArray(value)) {
      return value;
    }

    if (typeof value === 'string') {
      return value
        .split(',')
        .map((item) => item.trim())
        .filter(Boolean);
    }

    return [value];
  };

  /* =========================================================
     SAVE PROFILE
  ========================================================= */

  const handleSave = async () => {
    const token = localStorage.getItem('customer_token');

    if (!token || !profile?._id) {
      setError('Unable to save profile. Authentication information is missing.');
      return;
    }

    /* Password validation */

    if (
      formState.password &&
      formState.password !== formState.confirmPassword
    ) {
      setFieldErrors((prev) => ({
        ...prev,
        confirmPassword: 'Passwords do not match'
      }));

      return;
    }

    /* Username validation */

    if (fieldErrors.username) {
      setError('Please fix the username error before saving.');
      return;
    }

    try {
      setSaving(true);
      setError('');
      setSuccess('');

      const payload = {
        registrationNumber: formState.registrationNumber,
        registrationDate: formState.registrationDate,

        userCategory: formState.userCategory,

        partnerCategory: formState.partnerCategory,
        partnerCategoryOther:
          formState.partnerCategoryOther,

        organizationDescription:
          formState.organizationDescription,

        numberOfEmployees:
          formState.numberOfEmployees,

        partnerExperience:
          formState.partnerExperience,

        coreCompetencies:
          formState.coreCompetencies,

        majorClients:
          formState.majorClients,

        partnerCertifications:
          formState.partnerCertifications,

        partnerCountriesServed: toArray(
          formState.partnerCountriesServed
        ),

        title: formState.title,
        username: formState.username,

        fullName: formState.fullName,
        organization: formState.organization,
        department: formState.department,

        primaryMobile: formState.primaryMobile,
        alternateMobile: formState.alternateMobile,

        email: formState.email,
        website: formState.website,

        officeAddress: formState.officeAddress,
        city: formState.city,
        state: formState.state,
        country: formState.country,
        postalCode: formState.postalCode
      };

      /* Password only if entered */

      if (
        formState.password &&
        formState.password.trim() !== ''
      ) {
        payload.password = formState.password;
      }

      const response = await fetch(
        apiPath(`/registration/${profile._id}`),
        {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
            Accept: 'application/json'
          },
          body: JSON.stringify(payload)
        }
      );

      const json = await response.json().catch(() => ({}));

      if (!response.ok) {
        if (json.field) {
          setFieldErrors((prev) => ({
            ...prev,
            [json.field]:
              json.error ||
              json.message ||
              'Invalid value'
          }));
        }

        throw new Error(
          json.error ||
          json.message ||
          'Failed to save profile'
        );
      }

      setProfile(json.data);

      setFormState((prev) => ({
        ...prev,
        password: '',
        confirmPassword: ''
      }));

      setEditing(false);

      setSuccess('Profile updated successfully.');

      /* Save updated profile locally */

      try {
        localStorage.setItem(
          'customer_profile',
          JSON.stringify(json.data)
        );

        window.dispatchEvent(
          new Event('customer_profile_updated')
        );
      } catch (err) {
        console.error(err);
      }

    } catch (err) {
      console.error('Save profile error:', err);
      setError(err.message || 'Failed to save profile');
    } finally {
      setSaving(false);
    }
  };

  /* =========================================================
     LOGOUT
  ========================================================= */

  const logout = () => {
    showLogoutNotice(() => {
      localStorage.removeItem('customer_token');
      localStorage.removeItem('customer_profile');

      navigate('/');
    });
  };

  /* =========================================================
     FIELD COMPONENT
  ========================================================= */

  const Field = ({
    label,
    name,
    type = 'text',
    col = 'col-md-6',
    placeholder = '',
    readOnly = false
  }) => {
    const value = formState[name] || '';
    const fieldError = fieldErrors[name];

    return (
      <div className={`${col} mb-3`}>
        <label className="form-label fw-semibold">
          {label}
        </label>

        {editing ? (
          <>
            <input
              type={type}
              name={name}
              value={value}
              readOnly={readOnly}
              placeholder={placeholder}
              onChange={handleFormChange}
              onBlur={
                name === 'username'
                  ? checkUsernameAvailability
                  : undefined
              }
              className={`form-control ${
                fieldError ? 'is-invalid' : ''
              }`}
            />

            {fieldError && (
              <div className="invalid-feedback d-block">
                {fieldError}
              </div>
            )}
          </>
        ) : (
          <div className="profile-value">
            {value || '—'}
          </div>
        )}
      </div>
    );
  };

  /* =========================================================
     TEXTAREA FIELD
  ========================================================= */

  const TextAreaField = ({
    label,
    name,
    col = 'col-12'
  }) => {
    const value = formState[name] || '';

    return (
      <div className={`${col} mb-3`}>
        <label className="form-label fw-semibold">
          {label}
        </label>

        {editing ? (
          <textarea
            name={name}
            value={value}
            onChange={handleFormChange}
            className="form-control"
            rows="3"
          />
        ) : (
          <div className="profile-value">
            {value || '—'}
          </div>
        )}
      </div>
    );
  };

  /* =========================================================
     SELECT FIELD
  ========================================================= */

  const SelectField = ({
    label,
    name,
    options,
    col = 'col-md-6'
  }) => {
    const value = formState[name] || '';

    return (
      <div className={`${col} mb-3`}>
        <label className="form-label fw-semibold">
          {label}
        </label>

        {editing ? (
          <select
            name={name}
            value={value}
            onChange={handleFormChange}
            className="form-select"
          >
            {options.map((option) => (
              <option
                key={option.value}
                value={option.value}
              >
                {option.label}
              </option>
            ))}
          </select>
        ) : (
          <div className="profile-value">
            {value || '—'}
          </div>
        )}
      </div>
    );
  };

  /* =========================================================
     LOADING
  ========================================================= */

  if (loading) {
    return (
      <div className="page-content bg-white">
        <div className="container py-5">
          <div className="text-center py-5">
            <div
              className="spinner-border text-primary"
              style={{
                width: '3rem',
                height: '3rem'
              }}
            />

            <h5 className="mt-3">
              Loading your dashboard...
            </h5>

            <p className="text-muted">
              Please wait
            </p>
          </div>
        </div>
      </div>
    );
  }

  /* =========================================================
     RENDER
  ========================================================= */

  return (
    <div className="page-content bg-light">

      {/* =====================================================
          BANNER
      ===================================================== */}

      <div className="banner-wraper">
        <div
          className="page-banner"
          style={{
            backgroundImage: `url(${bnrImg1})`
          }}
        >
          <div className="container">
            <div className="page-banner-entry text-center">

              <h1>Customer Dashboard</h1>

              <nav
                aria-label="breadcrumb"
                className="breadcrumb-row"
              >
                <ul className="breadcrumb justify-content-center">
                  <li className="breadcrumb-item">
                    <Link to="/">
                      Home
                    </Link>
                  </li>

                  <li
                    className="breadcrumb-item active"
                    aria-current="page"
                  >
                    Dashboard
                  </li>
                </ul>
              </nav>

            </div>
          </div>

          <img
            className="pt-img1 animate-wave"
            src={waveBlue}
            alt=""
          />

          <img
            className="pt-img2 animate2"
            src={circleDots}
            alt=""
          />

          <img
            className="pt-img3 animate-rotate"
            src={plusBlue}
            alt=""
          />
        </div>
      </div>

      {/* =====================================================
          DASHBOARD
      ===================================================== */}

      <div className="section-area py-5">

        <div className="container">

          {/* Alerts */}

          {error && (
            <div className="alert alert-danger shadow-sm">
              <strong>Error:</strong> {error}
            </div>
          )}

          {success && (
            <div className="alert alert-success shadow-sm">
              <strong>Success:</strong> {success}
            </div>
          )}

          <div className="row g-4">

            {/* =================================================
                SIDEBAR
            ================================================= */}

            <div className="col-lg-3">

              <div
                className="card border-0 shadow-sm"
                style={{
                  borderRadius: '15px',
                  overflow: 'hidden'
                }}
              >

                {/* Profile Header */}

                <div
                  className="p-4 text-center text-white"
                  style={{
                    background:
                      'linear-gradient(135deg, #0d6efd, #084298)'
                  }}
                >

                  <div
                    className="mx-auto mb-3 d-flex align-items-center justify-content-center"
                    style={{
                      width: '75px',
                      height: '75px',
                      borderRadius: '50%',
                      background: 'rgba(255,255,255,.2)',
                      fontSize: '30px',
                      fontWeight: '700'
                    }}
                  >
                    {profile?.fullName
                      ? profile.fullName
                          .charAt(0)
                          .toUpperCase()
                      : 'C'}
                  </div>

                  <h5 className="mb-1">
                    {profile?.fullName ||
                      profile?.username ||
                      'Customer'}
                  </h5>

                  <small>
                    {profile?.userCategory ||
                      'Customer'}
                  </small>

                </div>

                {/* Menu */}

                <div className="list-group list-group-flush">

                  <button
                    type="button"
                    className={`list-group-item list-group-item-action ${
                      activeMenu === 'dashboard'
                        ? 'active'
                        : ''
                    }`}
                    onClick={() =>
                      setActiveMenu('dashboard')
                    }
                  >
                    <i className="fa fa-dashboard me-2" />
                    Dashboard
                  </button>

                  <button
                    type="button"
                    className={`list-group-item list-group-item-action ${
                      activeMenu === 'profile'
                        ? 'active'
                        : ''
                    }`}
                    onClick={() =>
                      setActiveMenu('profile')
                    }
                  >
                    <i className="fa fa-user me-2" />
                    Profile Details
                  </button>

                  <button
                    type="button"
                    className={`list-group-item list-group-item-action ${
                      activeMenu === 'services'
                        ? 'active'
                        : ''
                    }`}
                    onClick={() =>
                      setActiveMenu('services')
                    }
                  >
                    <i className="fa fa-briefcase me-2" />
                    Services Offered
                  </button>

                  <button
                    type="button"
                    className="list-group-item list-group-item-action text-danger"
                    onClick={logout}
                  >
                    <i className="fa fa-sign-out me-2" />
                    Logout
                  </button>

                </div>
              </div>

            </div>

            {/* =================================================
                MAIN CONTENT
            ================================================= */}

            <div className="col-lg-9">

              {/* =================================================
                  DASHBOARD HOME
              ================================================= */}

              {activeMenu === 'dashboard' && (
                <>

                  <div
                    className="card border-0 shadow-sm mb-4"
                    style={{
                      borderRadius: '15px',
                      overflow: 'hidden'
                    }}
                  >

                    <div
                      className="p-4 text-white"
                      style={{
                        background:
                          'linear-gradient(135deg, #0d6efd, #6610f2)'
                      }}
                    >

                      <div className="row align-items-center">

                        <div className="col-md-8">

                          <h3 className="mb-2">
                            Welcome,{' '}
                            {profile?.fullName ||
                              profile?.username}
                            !
                          </h3>

                          <p className="mb-0 opacity-75">
                            Welcome to your customer
                            dashboard.
                          </p>

                        </div>

                        <div className="col-md-4 text-md-end mt-3 mt-md-0">

                          <div
                            className="small"
                            style={{
                              opacity: '.85'
                            }}
                          >
                            {now.toLocaleDateString(
                              undefined,
                              {
                                weekday: 'long',
                                year: 'numeric',
                                month: 'long',
                                day: 'numeric'
                              }
                            )}
                          </div>

                          <h5 className="mb-0">
                            {now.toLocaleTimeString()}
                          </h5>

                        </div>

                      </div>

                    </div>

                  </div>

                  {/* Statistics */}

                  <div className="row g-3 mb-4">

                    <div className="col-md-4">

                      <div className="card border-0 shadow-sm h-100">
                        <div className="card-body">

                          <div className="d-flex align-items-center">

                            <div
                              className="rounded-circle bg-primary bg-opacity-10 text-primary d-flex align-items-center justify-content-center me-3"
                              style={{
                                width: '50px',
                                height: '50px'
                              }}
                            >
                              <i className="fa fa-user" />
                            </div>

                            <div>
                              <small className="text-muted">
                                Category
                              </small>

                              <h6 className="mb-0">
                                {profile?.userCategory ||
                                  '—'}
                              </h6>
                            </div>

                          </div>

                        </div>
                      </div>

                    </div>

                    <div className="col-md-4">

                      <div className="card border-0 shadow-sm h-100">
                        <div className="card-body">

                          <div className="d-flex align-items-center">

                            <div
                              className="rounded-circle bg-success bg-opacity-10 text-success d-flex align-items-center justify-content-center me-3"
                              style={{
                                width: '50px',
                                height: '50px'
                              }}
                            >
                              <i className="fa fa-building" />
                            </div>

                            <div>
                              <small className="text-muted">
                                Organization
                              </small>

                              <h6 className="mb-0">
                                {profile?.organization ||
                                  '—'}
                              </h6>
                            </div>

                          </div>

                        </div>
                      </div>

                    </div>

                    <div className="col-md-4">

                      <div className="card border-0 shadow-sm h-100">
                        <div className="card-body">

                          <div className="d-flex align-items-center">

                            <div
                              className="rounded-circle bg-warning bg-opacity-10 text-warning d-flex align-items-center justify-content-center me-3"
                              style={{
                                width: '50px',
                                height: '50px'
                              }}
                            >
                              <i className="fa fa-phone" />
                            </div>

                            <div>
                              <small className="text-muted">
                                Contact
                              </small>

                              <h6 className="mb-0">
                                {profile?.primaryMobile ||
                                  '—'}
                              </h6>
                            </div>

                          </div>

                        </div>
                      </div>

                    </div>

                  </div>

                  {/* Quick Profile */}

                  <div className="card border-0 shadow-sm">

                    <div className="card-body p-4">

                      <div className="d-flex justify-content-between align-items-center mb-4">

                        <div>
                          <h5 className="mb-1">
                            Profile Overview
                          </h5>

                          <small className="text-muted">
                            Your registration information
                          </small>
                        </div>

                        <button
                          className="btn btn-primary"
                          onClick={() =>
                            setActiveMenu('profile')
                          }
                        >
                          <i className="fa fa-user me-2" />
                          View Profile
                        </button>

                      </div>

                      <div className="row">

                        <div className="col-md-6 mb-3">
                          <small className="text-muted">
                            Registration Number
                          </small>

                          <div className="fw-semibold">
                            {profile?.registrationNumber ||
                              '—'}
                          </div>
                        </div>

                        <div className="col-md-6 mb-3">
                          <small className="text-muted">
                            Registration Date
                          </small>

                          <div className="fw-semibold">
                            {profile?.registrationDate
                              ? String(
                                  profile.registrationDate
                                ).slice(0, 10)
                              : '—'}
                          </div>
                        </div>

                        <div className="col-md-6 mb-3">
                          <small className="text-muted">
                            Email
                          </small>

                          <div className="fw-semibold">
                            {profile?.email || '—'}
                          </div>
                        </div>

                        <div className="col-md-6 mb-3">
                          <small className="text-muted">
                            Department
                          </small>

                          <div className="fw-semibold">
                            {profile?.department || '—'}
                          </div>
                        </div>

                      </div>

                    </div>

                  </div>

                </>
              )}

              {/* =================================================
                  PROFILE
              ================================================= */}

              {activeMenu === 'profile' && profile && (
                <div
                  className="card border-0 shadow-sm"
                  style={{
                    borderRadius: '15px'
                  }}
                >

                  {/* Header */}

                  <div className="card-body p-4">

                    <div className="d-flex justify-content-between align-items-center flex-wrap gap-2 mb-4">

                      <div>

                        <h4 className="mb-1">
                          Profile Details
                        </h4>

                        <small className="text-muted">
                          Information submitted during
                          registration
                        </small>

                      </div>

                      <div>

                        <button
                          type="button"
                          className="btn btn-outline-primary me-2"
                          onClick={handleEditToggle}
                        >
                          <i
                            className={`fa ${
                              editing
                                ? 'fa-times'
                                : 'fa-edit'
                            } me-2`}
                          />

                          {editing ? 'Cancel' : 'Edit'}
                        </button>

                        {editing && (
                          <button
                            type="button"
                            className="btn btn-primary"
                            onClick={handleSave}
                            disabled={saving}
                          >
                            {saving ? (
                              <>
                                <span
                                  className="spinner-border spinner-border-sm me-2"
                                />
                                Saving...
                              </>
                            ) : (
                              <>
                                <i className="fa fa-save me-2" />
                                Save Changes
                              </>
                            )}
                          </button>
                        )}

                      </div>

                    </div>

                    {/* =================================================
                        REGISTRATION
                    ================================================= */}

                    <div className="profile-section">

                      <div className="section-heading">
                        <i className="fa fa-id-card me-2" />
                        Registration Information
                      </div>

                      <div className="row">

                        <Field
                          label="Registration Number"
                          name="registrationNumber"
                          col="col-md-6"
                          readOnly
                        />

                        <Field
                          label="Registration Date"
                          name="registrationDate"
                          type="date"
                          col="col-md-6"
                        />

                        <SelectField
                          label="Category"
                          name="userCategory"
                          col="col-md-6"
                          options={[
                            {
                              value: '',
                              label: 'Select category'
                            },
                            {
                              value: 'Client',
                              label: 'Client'
                            },
                            {
                              value: 'Partner',
                              label: 'Partner'
                            },
                            {
                              value: 'Client / Partner',
                              label: 'Client / Partner'
                            }
                          ]}
                        />

                        <SelectField
                          label="Title"
                          name="title"
                          col="col-md-6"
                          options={[
                            {
                              value: 'Mr.',
                              label: 'Mr.'
                            },
                            {
                              value: 'Ms.',
                              label: 'Ms.'
                            },
                            {
                              value: 'Mrs.',
                              label: 'Mrs.'
                            },
                            {
                              value: 'Dr.',
                              label: 'Dr.'
                            },
                            {
                              value: 'Prof.',
                              label: 'Prof.'
                            },
                            {
                              value: 'Sri',
                              label: 'Sri'
                            }
                          ]}
                        />

                      </div>

                    </div>

                    {/* =================================================
                        PARTNER
                    ================================================= */}

                    {(profile.userCategory === 'Partner' ||
                      profile.userCategory ===
                        'Client / Partner' ||
                      formState.userCategory === 'Partner' ||
                      formState.userCategory ===
                        'Client / Partner') && (

                      <div className="profile-section mt-4">

                        <div className="section-heading">
                          <i className="fa fa-briefcase me-2" />
                          Partner Profile
                        </div>

                        <div className="row">

                          <SelectField
                            label="Partner Category"
                            name="partnerCategory"
                            col="col-md-6"
                            options={[
                              {
                                value: '',
                                label: 'Select'
                              },
                              {
                                value:
                                  'Individual Consultant',
                                label:
                                  'Individual Consultant'
                              },
                              {
                                value: 'Freelancer',
                                label: 'Freelancer'
                              },
                              {
                                value: 'Company',
                                label: 'Company'
                              },
                              {
                                value: 'Advisory Firm',
                                label: 'Advisory Firm'
                              },
                              {
                                value:
                                  'Manufacturing Partner',
                                label:
                                  'Manufacturing Partner'
                              },
                              {
                                value: 'Laboratory',
                                label: 'Laboratory'
                              },
                              {
                                value:
                                  'Software Provider',
                                label:
                                  'Software Provider'
                              },
                              {
                                value:
                                  'Service Provider',
                                label:
                                  'Service Provider'
                              },
                              {
                                value:
                                  'Training Organization',
                                label:
                                  'Training Organization'
                              },
                              {
                                value:
                                  'Contract Research Organization (CRO)',
                                label:
                                  'Contract Research Organization (CRO)'
                              },
                              {
                                value:
                                  'Contract Manufacturing Organization (CMO)',
                                label:
                                  'Contract Manufacturing Organization (CMO)'
                              },
                              {
                                value: 'Other',
                                label: 'Other'
                              }
                            ]}
                          />

                          {formState.partnerCategory ===
                            'Other' && (
                            <Field
                              label="Other Partner Category"
                              name="partnerCategoryOther"
                              col="col-md-6"
                            />
                          )}

                          <Field
                            label="Number of Employees"
                            name="numberOfEmployees"
                            type="number"
                            col="col-md-6"
                          />

                          <Field
                            label="Experience"
                            name="partnerExperience"
                            col="col-md-6"
                          />

                          <TextAreaField
                            label="Organization Description"
                            name="organizationDescription"
                          />

                          <Field
                            label="Core Competencies"
                            name="coreCompetencies"
                            col="col-md-6"
                          />

                          <Field
                            label="Major Clients"
                            name="majorClients"
                            col="col-md-6"
                          />

                          <Field
                            label="Partner Certifications"
                            name="partnerCertifications"
                            col="col-md-6"
                          />

                          <Field
                            label="Countries Served"
                            name="partnerCountriesServed"
                            col="col-md-6"
                          />

                        </div>

                      </div>
                    )}

                    {/* =================================================
                        PERSONAL
                    ================================================= */}

                    <div className="profile-section mt-4">

                      <div className="section-heading">
                        <i className="fa fa-user me-2" />
                        Personal Information
                      </div>

                      <div className="row">

                        <Field
                          label="Full Name"
                          name="fullName"
                          col="col-md-6"
                        />

                        <Field
                          label="Username"
                          name="username"
                          col="col-md-6"
                        />

                        <Field
                          label="Organization"
                          name="organization"
                          col="col-md-6"
                        />

                        <Field
                          label="Department"
                          name="department"
                          col="col-md-6"
                        />

                      </div>

                    </div>

                    {/* =================================================
                        CONTACT
                    ================================================= */}

                    <div className="profile-section mt-4">

                      <div className="section-heading">
                        <i className="fa fa-phone me-2" />
                        Contact Information
                      </div>

                      <div className="row">

                        <Field
                          label="Primary Contact"
                          name="primaryMobile"
                          col="col-md-6"
                        />

                        <Field
                          label="Alternate Contact"
                          name="alternateMobile"
                          col="col-md-6"
                        />

                        <Field
                          label="Email"
                          name="email"
                          type="email"
                          col="col-md-6"
                        />

                        <Field
                          label="Website"
                          name="website"
                          type="url"
                          col="col-md-6"
                        />

                      </div>

                    </div>

                    {/* =================================================
                        ADDRESS
                    ================================================= */}

                    <div className="profile-section mt-4">

                      <div className="section-heading">
                        <i className="fa fa-map-marker me-2" />
                        Address Information
                      </div>

                      <div className="row">

                        <TextAreaField
                          label="Office Address"
                          name="officeAddress"
                        />

                        <Field
                          label="City"
                          name="city"
                          col="col-md-3"
                        />

                        <Field
                          label="State / Province"
                          name="state"
                          col="col-md-3"
                        />

                        <Field
                          label="Country"
                          name="country"
                          col="col-md-3"
                        />

                        <Field
                          label="Zonal / Pin Code"
                          name="postalCode"
                          col="col-md-3"
                        />

                      </div>

                    </div>

                    {/* =================================================
                        PASSWORD
                    ================================================= */}

                    {editing && (
                      <div className="profile-section mt-4">

                        <div className="section-heading">
                          <i className="fa fa-lock me-2" />
                          Change Password
                        </div>

                        <div className="row">

                          <Field
                            label="New Password"
                            name="password"
                            type="password"
                            col="col-md-6"
                            placeholder="Leave blank to keep current password"
                          />

                          <Field
                            label="Confirm Password"
                            name="confirmPassword"
                            type="password"
                            col="col-md-6"
                            placeholder="Confirm new password"
                          />

                        </div>

                      </div>
                    )}

                  </div>
                </div>
              )}

              {/* =================================================
                  SERVICES
              ================================================= */}

              {activeMenu === 'services' && (
                <div
                  className="card border-0 shadow-sm"
                  style={{
                    borderRadius: '15px'
                  }}
                >

                  <div className="card-body p-4">

                    <div className="mb-4">

                      <h4 className="mb-1">
                        Services Offered
                      </h4>

                      <p className="text-muted mb-0">
                        Services offered by other users
                        in the same category.
                      </p>

                    </div>

                    {relatedServices.length === 0 ? (
                      <div
                        className="text-center py-5"
                      >

                        <div
                          className="rounded-circle bg-light d-flex align-items-center justify-content-center mx-auto mb-3"
                          style={{
                            width: '80px',
                            height: '80px'
                          }}
                        >
                          <i className="fa fa-briefcase fa-2x text-muted" />
                        </div>

                        <h5>
                          No related services found
                        </h5>

                        <p className="text-muted">
                          There are currently no other
                          users offering services in
                          your category.
                        </p>

                      </div>
                    ) : (

                      <div className="row">

                        {relatedServices.map((item) => (

                          <div
                            className="col-md-6 mb-3"
                            key={item._id}
                          >

                            <div
                              className="card h-100 border shadow-sm"
                              style={{
                                borderRadius: '12px'
                              }}
                            >

                              <div className="card-body">

                                <div className="d-flex align-items-center mb-3">

                                  <div
                                    className="rounded-circle bg-primary text-white d-flex align-items-center justify-content-center me-3"
                                    style={{
                                      width: '45px',
                                      height: '45px'
                                    }}
                                  >
                                    {item.fullName
                                      ? item.fullName
                                          .charAt(0)
                                          .toUpperCase()
                                      : 'U'}
                                  </div>

                                  <div>

                                    <h6 className="mb-0">
                                      {item.fullName ||
                                        'User'}
                                    </h6>

                                    <small className="text-muted">
                                      {item.organization ||
                                        '—'}
                                    </small>

                                  </div>

                                </div>

                                <p className="mb-2">
                                  <strong>
                                    Services:
                                  </strong>
                                </p>

                                <p className="text-muted">

                                  {Array.isArray(
                                    item.servicesOffered
                                  )
                                    ? item.servicesOffered.join(
                                        ', '
                                      )
                                    : item.servicesOffered ||
                                      '—'}

                                </p>

                                <hr />

                                <small className="text-muted">
                                  <i className="fa fa-phone me-1" />

                                  {item.primaryMobile ||
                                    item.email ||
                                    'Contact unavailable'}
                                </small>

                              </div>

                            </div>

                          </div>

                        ))}

                      </div>

                    )}

                  </div>
                </div>
              )}

            </div>
          </div>
        </div>
      </div>

      {/* =====================================================
          PAGE STYLE
      ===================================================== */}

      <style>{`

        .profile-section {
          border: 1px solid #e9ecef;
          border-radius: 12px;
          padding: 20px;
          background: #fff;
        }

        .section-heading {
          font-size: 16px;
          font-weight: 700;
          color: #0d6efd;
          border-bottom: 1px solid #e9ecef;
          padding-bottom: 12px;
          margin-bottom: 20px;
        }

        .profile-value {
          min-height: 42px;
          display: flex;
          align-items: center;
          padding: 10px 13px;
          background: #f8f9fa;
          border: 1px solid #e9ecef;
          border-radius: 7px;
          color: #343a40;
          word-break: break-word;
        }

        .form-control,
        .form-select {
          min-height: 44px;
          border-radius: 7px;
          border-color: #dee2e6;
        }

        .form-control:focus,
        .form-select:focus {
          border-color: #0d6efd;
          box-shadow: 0 0 0 .2rem rgba(13,110,253,.1);
        }

        textarea.form-control {
          min-height: 100px;
        }

        .list-group-item {
          border-left: 0;
          border-right: 0;
          padding: 13px 18px;
          font-weight: 500;
        }

        .list-group-item.active {
          background: #0d6efd;
          border-color: #0d6efd;
        }

        .card {
          transition: all .2s ease;
        }

        .card:hover {
          transform: translateY(-1px);
        }

        @media (max-width: 767px) {

          .profile-section {
            padding: 15px;
          }

          .section-heading {
            font-size: 15px;
          }

        }

      `}</style>

    </div>
  );
}