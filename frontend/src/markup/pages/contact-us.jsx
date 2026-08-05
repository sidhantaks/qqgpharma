import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import emailjs from '@emailjs/browser';

// Import Images
import bnrImg1 from "../../images/banner/img1.jpg";
import pic1 from "../../images/about/pic-1.jpg";
import animateWave from "../../images/shap/wave-blue.png";
import animate2 from "../../images/shap/circle-dots.png";
import animateRotate from "../../images/shap/plus-blue.png";


class ContactUs extends Component{
	constructor(props){
		super(props);
		this.state = {
			resultMessage: ''
		};
		this.sendEmail = this.sendEmail.bind(this);
	}

	sendEmail(e){
		e.preventDefault();
		// Replace 'YOUR_SERVICE_ID' and 'YOUR_PUBLIC_KEY' with your EmailJS service ID and public key
		emailjs.sendForm('YOUR_SERVICE_ID', 'template_fe13j99', e.target, 'YOUR_PUBLIC_KEY')
			.then((result) => {
				this.setState({ resultMessage: 'Message sent successfully.' });
				e.target.reset();
			}, (error) => {
				this.setState({ resultMessage: 'Failed to send message. Please try again later.' });
			});
	}

	render(){
		return (
			<>
				
				<div className="page-content bg-white">
					
					<div className="banner-wraper">
						<div className="page-banner banner-lg contact-banner" style={{backgroundImage: "url("+bnrImg1+")"}}>
							<div className="container">
								<div className="page-banner-entry text-center">
									<h1>Contact Us</h1>
									<nav aria-label="breadcrumb" className="breadcrumb-row">
										<ul className="breadcrumb">
											<li className="breadcrumb-item"><Link to="/"><svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-home"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path><polyline points="9 22 9 12 15 12 15 22"></polyline></svg> Home</Link></li>
											<li className="breadcrumb-item active" aria-current="page">Contact Us</li>
										</ul>
									</nav>
								</div>
							</div>
							<img className="pt-img1 animate-wave" src={animateWave} alt=""/>
							<img className="pt-img2 animate2" src={animate2} alt=""/>
							<img className="pt-img3 animate-rotate" src={animateRotate} alt=""/>
						</div>
					</div>
					
					<section className="">
						<div className="container">
							<div className="contact-wraper">
								<div className="row">
									<div className="col-lg-6 mb-30">
										<form className="form-wraper contact-form ajax-form" onSubmit={this.sendEmail}>
											<div className="ajax-message">{this.state.resultMessage}</div>
											<div className="row">
												<div className="form-group col-md-12">
													<input name="name" type="text" required className="form-control" placeholder="Full Name"/>
												</div>
												<div className="form-group col-md-12">
													<input name="email" type="email" required className="form-control" placeholder="Email ID"/>
												</div>
												<div className="form-group col-md-12">
													<input name="phone" type="text" required className="form-control" placeholder="Contact No"/>
												</div>
												<div className="form-group col-md-12">
													<input name="subject" type="text" required className="form-control" placeholder="Subject"/>
												</div>
												<div className="form-group col-md-12">
													<textarea name="message" required className="form-control" placeholder="Type Message"></textarea>
												</div>
												<div className="col-lg-12">
													<button name="submit" type="submit" defaultValue="Submit" className="btn w-100 btn-secondary btn-lg">Submit</button>
												</div>
											</div>
										</form>
									</div>
									<div className="col-lg-6 mb-30">
										<div className="contact-info ovpr-dark" style={{backgroundImage: "url("+pic1+")"}}>
											<div className="info-inner">
												<h4 className="title mb-30">Contact Us For Any Informations</h4>
												<div className="icon-box">
													<h6 className="title"><i className="ti-map-alt"></i>Location</h6>		
													<p>4th Floor, Usha's Felicity, Road No. 2, Kakatiya Hills, Guttala Begumpet, Madhapur, Hyderabad - 500 003, Telangana India</p>
												</div>
												<div className="icon-box">
													<h6 className="title"><i className="ti-id-badge"></i>Email ID</h6>		
													<Link to="#" className="text-white">customerservices@qgpharmasolutions.com</Link>
												</div>
												<div className="icon-box">
													<h6 className="title"><i className="ti-mobile"></i>Phone</h6>
													<p><a href="tel:+918096053667" className="text-white">(+91) 80960 53667</a></p>
													<p><a href="tel:+919705191005" className="text-white">(+91) 97051 91005</a></p>
												</div>
												
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
					</section>

					<section className="map-section">
						<div className="container-fluid">
							<div className="row">
								<div className="col-12 p-0">
									<div style={{width: '100%', height: '400px'}}>
										<iframe
											title="QG Pharma Location"
											src="https://maps.google.com/maps?q=4th%20Floor%20Usha's%20Felicity%20Road%20No.%202%20Kakatiya%20Hills%20Guttala%20Begumpet%20Madhapur%20Hyderabad%20500003%20Telangana%20India&t=&z=15&ie=UTF8&iwloc=&output=embed"
											style={{border:0, width: '100%', height: '100%'}}
											allowFullScreen=""
											loading="lazy"
										/>
									</div>
								</div>
							</div>
						</div>
					</section>
					
									
				</div>				
			</>
		);
	}
}

export default ContactUs;