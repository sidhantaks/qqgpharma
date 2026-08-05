import React, { Component } from 'react';
import { Link } from 'react-router-dom';

// Import Images
import bnrImg1 from "../../images/banner/img1.jpg";
import waveBlue from "../../images/shap/wave-blue.png";
import circleDots from "../../images/shap/circle-dots.png";
import plusBlue from "../../images/shap/plus-blue.png";

class FormRegister extends Component {
	constructor(props) {
		super(props);
		const now = new Date();
		this.state = {
			registrationNumber: this.generateRegNumber(now),
			registrationDate: now.toISOString().slice(0, 10),
			userCategory: '',
			userCategoryOther: '',
			// Partner-specific
			partnerCategory: '',
			partnerCategoryOther: '',
			organizationDescription: '',
			numberOfEmployees: '',
			partnerExperience: '',
			coreCompetencies: '',
			majorClients: '',
			partnerCertifications: '',
			partnerCountriesServed: '',
			supportingDocuments: [],
 			title: 'Mr.',
			fullName: '',
			username: '',
			password: '',
			designation: '',
			organization: '',
			department: '',
			experienceYears: '',
			primaryMobile: '',
			alternateMobile: '',
			email: '',
			website: '',
			linkedin: '',
			officeAddress: '',
			city: '',
			state: '',
			country: '',
			postalCode: '',
			photograph: null,
			professionalSummary: '',
			areasOfExpertise: '',
			keywords: '',
			languagesKnown: '',
			certifications: '',
			education: '',
			servicesRequired: [],
			servicesOffered: [],
			serviceOptions: [],
			preferredWorkingMode: '',
			countriesServed: '',
			industriesServed: '',
			availability: '',
			consultationCharges: '',
			errors: {}
		};
	}

	async componentDidMount() {
		// Try to fetch services from backend admin API
		try {
			const res = await fetch('http://localhost:5000/api/services?limit=200');
			const j = await res.json().catch(() => ({}));
			if (res.ok && j && Array.isArray(j.data)) {
				const opts = j.data.map(s => (s.serviceName || s.name || '').trim()).filter(Boolean);
				this.setState({ serviceOptions: opts });
			} else {
				// fallback to defaults below
			}
		} catch (err) {
			// ignore and keep defaults
		}
	}

	generateRegNumber(date) {
		const year = date.getFullYear();
		const letters = Math.random().toString(36).substring(2, 4).toUpperCase();
		const suffix = ('000' + Math.floor(Math.random() * 9999)).slice(-4);
		return `QGPS/${year}/${letters}/${suffix}`;
	}

	handleChange = (e) => {
		const { name, value } = e.target;
		this.setState(prev => ({ [name]: value, errors: { ...(prev.errors || {}), [name]: undefined } }));
	}

	handleFileChange = (e) => {
		const { name, files } = e.target;
		if (name === 'photograph') {
			this.setState({ photograph: files && files[0] });
			return;
		}
		if (name === 'supportingDocuments') {
			this.setState({ supportingDocuments: files ? Array.from(files) : [] });
			return;
		}
		// fallback: if single file input with other name
		this.setState({ [name]: files && files[0] });
	}

	checkUsernameAvailability = async () => {
		const name = (this.state.username || '').trim();
		if (!name) return;
		try {
			const res = await fetch(`http://localhost:5000/api/registration/check-username?username=${encodeURIComponent(name)}`);
			const json = await res.json().catch(()=>({}));
			if (res.ok) {
				if (!json.available) {
					this.setState(prev=>({ errors: { ...(prev.errors||{}), username: 'Username already taken' } }));
				} else {
					this.setState(prev=>({ errors: { ...(prev.errors||{}), username: undefined } }));
				}
			}
		} catch (err) {
			// ignore
		}
	}

	handleCheckboxChange = (groupName, option) => {
		const arr = new Set(this.state[groupName]);
		if (arr.has(option)) arr.delete(option);
		else arr.add(option);
		this.setState({ [groupName]: Array.from(arr) });
	}

	handleKeywordsChange = (e) => {
		const value = e.target.value;
		const parts = value.split(',').map(p => p.trim()).filter(Boolean);
		if (parts.length <= 20) this.setState({ keywords: value });
		else {
			// keep first 20
			this.setState({ keywords: parts.slice(0, 20).join(', ') });
		}
	}

	handleSubmit = (e) => {
		e.preventDefault();
		// Basic client-side validation example (inline errors)
		const required = ['fullName', 'email', 'primaryMobile'];
		const errors = {};
		required.forEach(f => {
			const val = this.state[f];
			if (!val || (typeof val === 'string' && val.trim() === '')) errors[f] = 'Please fill this required field';
		});
		if (Object.keys(errors).length) {
			this.setState({ errors });
			// focus first invalid
			const first = Object.keys(errors)[0];
			const el = document.querySelector(`[name="${first}"]`);
			if (el && typeof el.focus === 'function') el.focus();
			return;
		}
		// Prepare form data for sending
		const formData = new FormData();
		Object.keys(this.state).forEach(key => {
			const val = this.state[key];
			if (val === null || val === undefined) return;
			if (key === 'photograph' && val instanceof File) {
				formData.append(key, val);
				return;
			}
			if (key === 'supportingDocuments' && Array.isArray(val)) {
				val.forEach((f) => {
					if (f instanceof File) formData.append('supportingDocuments', f);
				});
				return;
			}
			if (Array.isArray(val)) {
				formData.append(key, JSON.stringify(val));
				return;
			}
			formData.append(key, val);
		});

		// Send to backend
		fetch('http://localhost:5000/api/registration', {
			method: 'POST',
			body: formData
		}).then(async res => {
			const json = await res.json().catch(() => ({}));
			if (!res.ok) {
					console.error('Registration error', json);
					// show inline error for username or other field if server provided 'field'
					if (json && json.field) {
						const field = json.field;
						this.setState(prev => ({ errors: { ...(prev.errors || {}), [field]: json.error || 'Invalid value' } }));
						const el = document.querySelector(`[name="${field}"]`);
						if (el && typeof el.focus === 'function') el.focus();
						return;
					}
					alert('Failed to submit registration: ' + (json.error || res.statusText));
				return;
			}
			console.log('Registration saved', json);
			this.setState({ errors: {} });
				alert('Registration submitted successfully. Redirecting to login...');
				// Redirect to login page
				window.location.href = '/login';
			// Optionally reset form or redirect
		}).catch(err => {
			console.error('Submit failed', err);
			alert('Failed to submit registration: ' + err.message);
		});
	}

	renderCheckboxGroup(groupName, options) {
		return options.map(opt => (
			<div className="form-check" key={opt}>
				<input className="form-check-input" type="checkbox" id={`${groupName}_${opt}`} checked={this.state[groupName].includes(opt)} onChange={() => this.handleCheckboxChange(groupName, opt)} />
				<label className="form-check-label" htmlFor={`${groupName}_${opt}`}>{opt}</label>
			</div>
		));
	}

		render() {
			const defaultOptions = ['Consulting', 'Training', 'Audit', 'Implementation', 'Research'];
			const serviceOptions = (this.state.serviceOptions && this.state.serviceOptions.length) ? this.state.serviceOptions : defaultOptions;
		return (
			<div className="page-content bg-white">
				<div className="banner-wraper">
					<div className="page-banner" style={{ backgroundImage: "url(" + bnrImg1 + ")" }}>
						<div className="container">
							<div className="page-banner-entry text-center">
								<h1>Register</h1>
								<nav aria-label="breadcrumb" className="breadcrumb-row">
									<ul className="breadcrumb">
										<li className="breadcrumb-item"><Link to="/">Home</Link></li>
										<li className="breadcrumb-item active" aria-current="page">Register</li>
									</ul>
								</nav>
							</div>
						</div>
						<img className="pt-img1 animate-wave" src={waveBlue} alt="" />
						<img className="pt-img2 animate2" src={circleDots} alt="" />
						<img className="pt-img3 animate-rotate" src={plusBlue} alt="" />
					</div>
				</div>

				<div className="section-area account-wraper2">
					<div className="container-fluid">
						<div className="row justify-content-center">
							<div className="col-12">
								<div className="appointment-form form-wraper">
									<div className="logo text-center mb-3">
										<h1 className="text-primary">Customer Registration</h1>
									</div>
									<form onSubmit={this.handleSubmit}>
										<div className="row">
											<div className="col-md-4 form-group">
												<label className="form-label">Registration Number</label>
												<input type="text" name="registrationNumber" className="form-control" value={this.state.registrationNumber} readOnly />
											</div>
											<div className="col-md-4 form-group">
												<label className="form-label">Registration Date</label>
												<input type="date" name="registrationDate" className="form-control" value={this.state.registrationDate} onChange={this.handleChange} />
											</div>
											<div className="col-md-4 form-group">
												<label className="form-label">User Category</label>
												<select name="userCategory" className="form-select" value={this.state.userCategory} onChange={this.handleChange}>
													<option value="">Select category</option>
													<option>Client</option>
													<option>Partner</option>
													<option>Consultant</option>
													<option>Freelancer</option>
													<option>Company</option>
													<option>Manufacturer</option>
													<option>Buyer</option>
													<option>Seller</option>
													<option>Trader</option>
													<option>Investor</option>
													<option>Entrepreneur</option>
													<option>Advisor</option>
													<option>Service Provider</option>
													<option value="Other">Other (Please Specify)</option>
												</select>
												{this.state.userCategory === 'Other' && (
													<div className="mt-2">
														<input type="text" name="userCategoryOther" className="form-control" value={this.state.userCategoryOther} onChange={this.handleChange} placeholder="Please specify" />
													</div>
												)}
											</div>
											{this.state.userCategory === 'Partner' && (
												<div className="col-12">
													<div className="partner-profile mt-3">
														<h5 className="mb-3">Partner Categories & Profile</h5>
														<div className="row">
															<div className="col-md-6 form-group">
																<label className="form-label">Partner Category</label>
																<select name="partnerCategory" className="form-select" value={this.state.partnerCategory} onChange={this.handleChange}>
																	<option value="">Select</option>
																	<option>Individual Consultant</option>
																	<option>Freelancer</option>
																	<option>Company</option>
																	<option>Advisory Firm</option>
																	<option>Manufacturing Partner</option>
																	<option>Laboratory</option>
																	<option>Software Provider</option>
																	<option>Service Provider</option>
																	<option>Training Organization</option>
																	<option>Contract Research Organization (CRO)</option>
																	<option>Contract Manufacturing Organization (CMO)</option>
																	<option value="Other">Other</option>
																</select>
																{this.state.partnerCategory === 'Other' && (
																	<input type="text" name="partnerCategoryOther" className="form-control mt-2" value={this.state.partnerCategoryOther} onChange={this.handleChange} placeholder="Please specify" />
																)}
															</div>
															<div className="col-md-6 form-group">
																<label className="form-label">Number of Employees</label>
																<input type="number" name="numberOfEmployees" className="form-control" value={this.state.numberOfEmployees} onChange={this.handleChange} min="0" />
															</div>

															<div className="col-12 form-group">
																<label className="form-label">Organization Description</label>
																<textarea name="organizationDescription" className="form-control" rows="3" value={this.state.organizationDescription} onChange={this.handleChange} placeholder="Describe the organization"></textarea>
															</div>

															<div className="col-md-6 form-group">
																<label className="form-label">Experience</label>
																<input type="text" name="partnerExperience" className="form-control" value={this.state.partnerExperience} onChange={this.handleChange} placeholder="Years or summary" />
															</div>
															<div className="col-md-6 form-group">
																<label className="form-label">Core Competencies</label>
																<input type="text" name="coreCompetencies" className="form-control" value={this.state.coreCompetencies} onChange={this.handleChange} placeholder="Comma separated" />
															</div>

															<div className="col-md-6 form-group">
																<label className="form-label">Major Clients</label>
																<input type="text" name="majorClients" className="form-control" value={this.state.majorClients} onChange={this.handleChange} placeholder="Major clients / references" />
															</div>
															<div className="col-md-6 form-group">
																<label className="form-label">Certifications</label>
																<input type="text" name="partnerCertifications" className="form-control" value={this.state.partnerCertifications} onChange={this.handleChange} placeholder="Certifications" />
															</div>

															<div className="col-md-6 form-group">
																<label className="form-label">Countries Served</label>
																<input type="text" name="partnerCountriesServed" className="form-control" value={this.state.partnerCountriesServed} onChange={this.handleChange} placeholder="Comma separated countries" />
															</div>
															<div className="col-md-6 form-group">
																<label className="form-label">Supporting Documents</label>
																<input type="file" name="supportingDocuments" className="form-control" multiple onChange={this.handleFileChange} />
															</div>
														</div>
													</div>
												</div>
											)}

											<div className="col-md-4 form-group">
												<label className="form-label">Title</label>
												<select name="title" className="form-select" value={this.state.title} onChange={this.handleChange}>
													<option>Mr.</option>
													<option>Ms.</option>
													<option>Mrs.</option>
													<option>Dr.</option>
													<option>Prof.</option>
													<option>Sri</option>
												</select>
											</div>
											<div className="col-md-4 form-group">
												<label className="form-label">Full Name</label>
												<input type="text" name="fullName" className={"form-control" + (this.state.errors && this.state.errors.fullName ? ' is-invalid' : '')} value={this.state.fullName} onChange={this.handleChange} placeholder="Full name" />
												{this.state.errors && this.state.errors.fullName && (
													<div className="invalid-feedback d-block">{this.state.errors.fullName}</div>
												)}
											</div>
											<div className="col-md-4 form-group">
												<label className="form-label">Username</label>
												<input type="text" name="username" className={"form-control" + (this.state.errors && this.state.errors.username ? ' is-invalid' : '')} value={this.state.username || ''} onChange={this.handleChange} onBlur={this.checkUsernameAvailability} placeholder="Choose a username" />
												{this.state.errors && this.state.errors.username && (
													<div className="invalid-feedback d-block">{this.state.errors.username}</div>
												)}
											</div>
											<div className="col-md-4 form-group">
												<label className="form-label">Password</label>
												<input type="password" name="password" className="form-control" value={this.state.password || ''} onChange={this.handleChange} placeholder="Password" />
											</div>

											<div className="col-md-4 form-group">
												<label className="form-label">Designation/Job Title</label>
												<input type="text" name="designation" className="form-control" value={this.state.designation} onChange={this.handleChange} placeholder="Designation or Job Title" />
											</div>
											<div className="col-md-4 form-group">
												<label className="form-label">Organization Name</label>
												<input type="text" name="organization" className="form-control" value={this.state.organization} onChange={this.handleChange} placeholder="Company / Freelancer / Consultant / Other" />
											</div>
											<div className="col-md-4 form-group">
												<label className="form-label">Department</label>
												<input type="text" name="department" className="form-control" value={this.state.department} onChange={this.handleChange} placeholder="Department" />
											</div>
											<div className="col-md-4 form-group">
												<label className="form-label">Years of Experience</label>
												<input type="number" name="experienceYears" className="form-control" value={this.state.experienceYears} onChange={this.handleChange} placeholder="Years of experience" min="0" />
											</div>

											<div className="col-md-4 form-group">
												<label className="form-label">Primary Mobile Number</label>
												<input type="tel" name="primaryMobile" className={"form-control" + (this.state.errors && this.state.errors.primaryMobile ? ' is-invalid' : '')} value={this.state.primaryMobile} onChange={this.handleChange} placeholder="Primary contact number" />
												{this.state.errors && this.state.errors.primaryMobile && (
													<div className="invalid-feedback d-block">{this.state.errors.primaryMobile}</div>
												)}
											</div>
											<div className="col-md-4 form-group">
												<label className="form-label">Alternate Mobile Number</label>
												<input type="tel" name="alternateMobile" className="form-control" value={this.state.alternateMobile} onChange={this.handleChange} placeholder="Alternate contact number" />
											</div>
											<div className="col-md-4 form-group">
												<label className="form-label">Email Address</label>
												<input type="email" name="email" className={"form-control" + (this.state.errors && this.state.errors.email ? ' is-invalid' : '')} value={this.state.email} onChange={this.handleChange} placeholder="Email address" />
												{this.state.errors && this.state.errors.email && (
													<div className="invalid-feedback d-block">{this.state.errors.email}</div>
												)}
											</div>

											<div className="col-md-4 form-group">
												<label className="form-label">Website</label>
												<input type="url" name="website" className="form-control" value={this.state.website} onChange={this.handleChange} placeholder="https://example.com" />
											</div>
											<div className="col-md-4 form-group">
												<label className="form-label">LinkedIn Profile (Optional)</label>
												<input type="url" name="linkedin" className="form-control" value={this.state.linkedin} onChange={this.handleChange} placeholder="LinkedIn profile URL" />
											</div>
											<div className="col-md-4 form-group">
												<label className="form-label">Photograph</label>
												<input type="file" name="photograph" className="form-control" accept="image/*" onChange={this.handleFileChange} />
											</div>

											<div className="col-12 form-group">
												<label className="form-label">Office Address</label>
												<textarea name="officeAddress" className="form-control" rows="2" value={this.state.officeAddress} onChange={this.handleChange} placeholder="Office address"></textarea>
											</div>

											<div className="col-md-3 form-group">
												<label className="form-label">City</label>
												<input type="text" name="city" className="form-control" value={this.state.city} onChange={this.handleChange} />
											</div>
											<div className="col-md-3 form-group">
												<label className="form-label">State/Province</label>
												<input type="text" name="state" className="form-control" value={this.state.state} onChange={this.handleChange} />
											</div>
											<div className="col-md-3 form-group">
												<label className="form-label">Country</label>
												<input type="text" name="country" className="form-control" value={this.state.country} onChange={this.handleChange} />
											</div>
											<div className="col-md-3 form-group">
												<label className="form-label">Postal/ZIP Code</label>
												<input type="text" name="postalCode" className="form-control" value={this.state.postalCode} onChange={this.handleChange} />
											</div>

											<div className="col-12 form-group">
												<label className="form-label">Professional Summary</label>
												<textarea name="professionalSummary" className="form-control" rows="4" value={this.state.professionalSummary} onChange={this.handleChange} placeholder="Brief professional summary"></textarea>
											</div>

											<div className="col-md-6 form-group">
												<label className="form-label">Areas of Expertise</label>
												<textarea name="areasOfExpertise" className="form-control" rows="3" value={this.state.areasOfExpertise} onChange={this.handleChange} placeholder="Comma separated areas of expertise"></textarea>
											</div>
											<div className="col-md-6 form-group">
												<label className="form-label">Keywords (max 20, comma separated)</label>
												<input type="text" name="keywords" className="form-control" value={this.state.keywords} onChange={this.handleKeywordsChange} placeholder="keyword1, keyword2, ..." />
											</div>

											<div className="col-md-6 form-group">
												<label className="form-label">Languages Known</label>
												<input type="text" name="languagesKnown" className="form-control" value={this.state.languagesKnown} onChange={this.handleChange} placeholder="English, Hindi, ..." />
											</div>
											<div className="col-md-6 form-group">
												<label className="form-label">Certifications</label>
												<input type="text" name="certifications" className="form-control" value={this.state.certifications} onChange={this.handleChange} placeholder="Comma separated certifications" />
											</div>

											<div className="col-12 form-group">
												<label className="form-label">Educational Qualifications</label>
												<textarea name="education" className="form-control" rows="2" value={this.state.education} onChange={this.handleChange} placeholder="Degrees, institutions, years"></textarea>
											</div>

											<div className="col-md-6 form-group">
												<label className="form-label">Services Required</label>
												<div>
													{this.renderCheckboxGroup('servicesRequired', serviceOptions)}
												</div>
											</div>
											<div className="col-md-6 form-group">
												<label className="form-label">Services Offered</label>
												<div>
													{this.renderCheckboxGroup('servicesOffered', serviceOptions)}
												</div>
											</div>

											<div className="col-md-4 form-group">
												<label className="form-label">Preferred Working Mode</label>
												<select name="preferredWorkingMode" className="form-select" value={this.state.preferredWorkingMode} onChange={this.handleChange}>
													<option value="">Select</option>
													<option>Remote</option>
													<option>Onsite</option>
													<option>Hybrid</option>
												</select>
											</div>
											<div className="col-md-4 form-group">
												<label className="form-label">Countries Served</label>
												<input type="text" name="countriesServed" className="form-control" value={this.state.countriesServed} onChange={this.handleChange} placeholder="Comma separated countries" />
											</div>
											<div className="col-md-4 form-group">
												<label className="form-label">Industries Served</label>
												<input type="text" name="industriesServed" className="form-control" value={this.state.industriesServed} onChange={this.handleChange} placeholder="Comma separated industries" />
											</div>

											<div className="col-md-4 form-group">
												<label className="form-label">Availability</label>
												<select name="availability" className="form-select" value={this.state.availability} onChange={this.handleChange}>
													<option value="">Select</option>
													<option>Immediately Available</option>
													<option>1-2 Weeks</option>
													<option>1 Month</option>
													<option>Specific Dates</option>
												</select>
											</div>
											<div className="col-md-4 form-group">
												<label className="form-label">Consultation Charges (Optional)</label>
												<input type="text" name="consultationCharges" className="form-control" value={this.state.consultationCharges} onChange={this.handleChange} placeholder="e.g., USD 100/hr" />
											</div>

											<div className="col-12 form-group mt-3">
												<button type="submit" className="btn btn-primary btn-lg">Register</button>
											</div>
										</div>
									</form>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

export default FormRegister;