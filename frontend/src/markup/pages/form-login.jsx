import React, { Component } from 'react';
import { Link, useNavigate } from 'react-router-dom';

// Import Images
import logo from "../../images/logo.png";
import bnrImg1 from "../../images/banner/img1.jpg";
import loginImg from "../../images/login.png";
import waveBlue from "../../images/shap/wave-blue.png";
import circleDots from "../../images/shap/circle-dots.png";
import plusBlue from "../../images/shap/plus-blue.png";


class FormLogin extends Component {
	constructor(props){
		super(props);
		this.state = { username: '', password: '', error: '' };
	}

	handleChange = (e) => {
		const { name, value } = e.target;
		this.setState({ [name]: value, error: '' });
	}

	handleSubmit = (e) => {
		e.preventDefault();
		const { username, password } = this.state;
		this.setState({ error: '' });
		fetch('http://localhost:5000/api/customer/login', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ username, password })
		}).then(async res => {
			const json = await res.json().catch(() => ({}));
			if (!res.ok) {
				this.setState({ error: json.error || json.message || 'Login failed' });
				return;
			}
			const { token } = json;
			localStorage.setItem('customer_token', token);
			// attempt to fetch profile and store it so header can update immediately
			try {
				const meRes = await fetch('http://localhost:5000/api/customer/me', { headers: { Authorization: `Bearer ${token}` } });
				const meJson = await meRes.json().catch(() => ({}));
				if (meRes.ok && meJson && meJson.data) {
					localStorage.setItem('customer_profile', JSON.stringify(meJson.data));
				} else {
					localStorage.setItem('customer_profile', JSON.stringify({ username }));
				}
				// dispatch a custom event so header updates within same tab
				window.dispatchEvent(new Event('customer_profile_updated'));
			} catch (err) {
				localStorage.setItem('customer_profile', JSON.stringify({ username }));
				window.dispatchEvent(new Event('customer_profile_updated'));
			}
			if (this.props.navigate) this.props.navigate('/customer/dashboard');
		}).catch(err => this.setState({ error: err.message }));
	}

	render() {
			return (
				<div className="page-content bg-white">
				<div className="banner-wraper">
					<div className="page-banner" style={{ backgroundImage: "url(" + bnrImg1 + ")" }}>
						<div className="container">
							<div className="page-banner-entry text-center">
								<h1>Login</h1>
								<nav aria-label="breadcrumb" className="breadcrumb-row">
									<ul className="breadcrumb">
										<li className="breadcrumb-item"><Link to="/">Home</Link></li>
										<li className="breadcrumb-item active" aria-current="page">Login</li>
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
						<div className="row g-0">
							<div className="col-lg-6 d-none d-lg-flex align-items-center justify-content-center">
								<img src={loginImg} alt="" className="img-fluid" />
							</div>
							<div className="col-lg-6 account-right d-flex align-items-center justify-content-center">
								<div className="inner-form-wrapper w-100 d-flex align-items-center justify-content-center">
									<div className="appointment-form form-wraper">
										<div className="logo text-center mb-3">
											<h1 className="text-primary">Customer Login</h1>
										</div>
																				<form onSubmit={this.handleSubmit}>
																					<div className="form-group">
																						<input name="username" value={this.state.username} onChange={this.handleChange} type="text" className="form-control" placeholder="Username" />
																					</div>
																					<div className="form-group">
																						<input name="password" value={this.state.password} onChange={this.handleChange} type="password" className="form-control" placeholder="Password" />
																					</div>
																					{this.state.error && <div className="text-danger mb-2">{this.state.error}</div>}
																					<div className="form-group">
																						<button type="submit" className="btn mb-30 btn-lg btn-primary w-100">Login</button>
																					</div>
																					<div className="text-center mt-40">
																						<p className="mt-0">Dont have any account?</p>
																						<Link className="btn btn-lg btn-secondary w-100" data-toggle="tab" to="/form-register">Register</Link>
																					</div>
																				</form>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

// wrap to provide navigate prop to class component
export default function(props){
	const navigate = useNavigate();
	return <FormLogin {...props} navigate={navigate} />;
}