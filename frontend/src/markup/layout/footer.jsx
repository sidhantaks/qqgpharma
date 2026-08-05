import React, { Component } from 'react';
import { Link } from 'react-router-dom';

// Images
import Logo from '../../images/logo.png';
import footerBg from '../../images/background/footer.jpg';
import ptImg1 from '../../images/shap/wave-blue.png';
import ptImg2 from '../../images/shap/circle-dots.png';
import ptImg3 from '../../images/shap/plus-blue.png';
import ptImg4 from '../../images/shap/wave-blue.png';

// Social Images
import facebook from '../../images/social/facebook.png';
import twitter from '../../images/social/twitter.png';
import instagram from '../../images/social/instagram.png';
import linkedin from '../../images/social/linkedin.png';

class aboutSection extends Component{
	render(){
		return(
			<>				
				<footer className="footer" style={{backgroundImage: "url("+footerBg+")"}}>
					<div className="footer-top">
						<div className="container">
							<div className="row">
								<div className="col-xl-3 col-lg-3 col-md-6">
									<div className="widget widget_info">
										<div className="footer-logo">
											<Link to="/"><img src={Logo} alt=""/></Link>
										</div>
										<div className="ft-contact">
											<p>QG Pharma Solutions specialize in GMP consultancy, helping health care companies achieve and maintain full regulatory compliance.</p>
											<div className="contact-bx">
												<div className="icon"><i className="fas fa-phone-alt"></i></div>
												<div className="contact-number">
													<span>Contact Us</span>
													<h4 className="number">(+91) 80960 53667</h4>
												</div>
											</div>
										</div>
									</div>
								</div>
								<div className="col-xl-3 col-lg-3 col-6">
									<div className="widget footer_widget ml-50">
										<h3 className="footer-title">Quick Links</h3>
										<ul>
											<li><Link to="/"><span>Home</span></Link></li>
											<li><Link to="/about-us"><span>About Us</span></Link></li>
											<li><Link to="/services"><span>Services</span></Link></li>
											<li><Link to="/contact-us"><span>Contact Us</span></Link></li>
											<li><Link to="/gmp-consulting"><span>GMP Consulting</span></Link></li>
											<li><Link to="/quality-control"><span>Quality Control</span></Link></li>
										</ul>
									</div>
								</div>
								<div className="col-xl-3 col-lg-3 col-6">
									<div className="widget footer_widget">
										<h3 className="footer-title">Our Service</h3>
										<ul>
											<li><Link to="/software-solutions"><span>Software Solutions</span></Link></li>
											<li><Link to="/human-resource"><span>Human Resource</span></Link></li>
											<li><Link to="/buyer-sellers"><span>Buyer & Sellers</span></Link></li>
											<li><Link to="/facility-projects"><span>New Facility - Projects</span></Link></li>
											<li><Link to="/safety"><span>Safety Services</span></Link></li>
											<li><Link to="/chemical-impurities"><span>Chemical Impurities</span></Link></li>
										</ul>
									</div>
								</div>
								<div className="col-xl-3 col-lg-3 col-md-6">
									<div className="widget widget_form">
										<h3 className="footer-title">Our Location</h3>
										<div className="footer-contact-info mb-30">
											<ul>
												<li><i className="fas fa-map-marker-alt"></i> 4th Floor, Usha's Felicity, Road No. 2, Kakatiya Hills, Guttala Begumpet, Madhapur, Hyderabad - 500 003, Telangana India</li>
												<li><i className="fas fa-envelope"></i> <a href="mailto:info@qgpharma.com">customerservices@qgpharmasolutions.com</a></li>
												<li><i className="fas fa-phone-alt"></i> <a href="tel:+918096053667">+91 80960 53667</a></li>
											</ul>
										</div>
										<div className="footer-social-link">
											<ul>
												<li><a target="_blank" rel="noreferrer" href="https://www.facebook.com/"><img src={facebook} alt=""/></a></li>
												<li><a target="_blank" rel="noreferrer" href="https://twitter.com/"><img src={twitter} alt=""/></a></li>
												<li><a target="_blank" rel="noreferrer" href="https://www.instagram.com/"><img src={instagram} alt=""/></a></li>
												<li><a target="_blank" rel="noreferrer" href="https://www.linkedin.com/"><img src={linkedin} alt=""/></a></li>
											</ul>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
					<div className="container">
						<div className="footer-bottom">
							<div className="row">
								<div className="col-12 text-center">
									<p className="copyright-text">Copyright © 2026. All Rights Reserved. QG Pharma Solutions.</p>
								</div>
							</div>
						</div>
					</div>
					<img className="pt-img1 animate-wave" src={ptImg1} alt=""/>
					<img className="pt-img2 animate1" src={ptImg2} alt=""/>
					<img className="pt-img3 animate-rotate" src={ptImg3} alt=""/>
					<img className="pt-img4 animate-wave" src={ptImg4} alt=""/>
				</footer>
			
			</>
		);
	}
}

export default aboutSection;