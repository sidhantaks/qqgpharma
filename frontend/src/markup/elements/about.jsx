import React, { Component } from 'react';
import { Link } from 'react-router-dom';

// Import Images
import aboutThumb1 from '../../images/about/pic-1.jpg';
import aboutThumb2 from '../../images/about/pic-2.jpg';
import aboutThumb3 from '../../images/about/pic-3.jpg';
import ptImg1 from '../../images/shap/wave-orange.png';
import ptImg2 from '../../images/shap/circle-small-blue.png';
import ptImg4 from '../../images/shap/square-dots-orange.png';
import ptImg5 from '../../images/shap/square-blue.png';

class aboutSection extends Component{
	render(){
		return(
			<>
				<section className="section-sp1 about-area">
					<div className="container">
						<div className="row align-items-center">
							<div className="col-lg-6 mb-30">
								<div className="about-thumb-area">
									<ul>
										<li><img className="about-thumb1" src={aboutThumb1} alt=""/></li>
										<li><img className="about-thumb2" src={aboutThumb2} alt=""/></li>
										<li><img className="about-thumb3" src={aboutThumb3} alt=""/></li>
										<li><div className="exp-bx">10<span>Years Experience</span></div></li>
									</ul>
								</div>
							</div>
							<div className="col-lg-6 mb-30">
								<div className="heading-bx">
									<h6 className="title-ext text-secondary">About Us</h6>
									<h2 className="title">Build Compliance, Commitment & Confidence</h2>
									<p>We at QG Pharma Solutions, we are a committed organization supported by partners with extensive experience in the health care industry. We deliver strategic and practical solutions aligned with USFDA, EMA, and global regulatory expectations for successful regulatory, effectively bridging compliance gaps and preparing organizations for successful regulatory inspections worldwide.</p>
									<p>With collaborative partnerships across India and internationally. We provide comprehensive GMP Consultancy Services tailored to meet evolving global standards.</p>
								</div>
								<div className="row">
									<div className="col-lg-6 col-sm-6 mb-30 mb-sm-20">
										<div className="feature-container feature-bx1 feature1">
											<div className="icon-md">
												<span className="icon-cell">
													<svg width="110" height="110" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
														<path d="M12 2l3 2 4 1v4l-1 3-2 3-4 3-4-3-2-3-1-3V5l4-1 3-2z" stroke="#020288" strokeWidth="1" fill="#e8f3ff" />
														<path d="M9 12l2 2 4-4" stroke="#00a651" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
													</svg>
												</span> 
											</div>
											<div className="icon-content">
												<h4 className="ttr-title">Driving Compliance</h4>
											</div>
										</div>
									</div>
									<div className="col-lg-6 col-sm-6 mb-30 mb-sm-20">
										<div className="feature-container feature-bx1 feature2">
											<div className="icon-md">
												<span className="icon-cell">
													<svg width="85" height="85" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
														<circle cx="12" cy="8" r="3" stroke="#020288" strokeWidth="1" fill="#e8f3ff" />
														<path d="M4 20c2-3 6-5 8-5s6 2 8 5" stroke="#ffb400" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
													</svg>
												</span> 
											</div>
											<div className="icon-content">
												<h4 className="ttr-title">Focused on Confidence</h4>
											</div>
										</div>
									</div>
									<div className="col-lg-6 col-sm-6 mb-30 mb-sm-20">
										<div className="feature-container feature-bx1 feature3">
											<div className="icon-md">
												<span className="icon-cell">
													<svg width="85" height="85" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
														<path d="M3 12s4-8 9-8 9 8 9 8-4 8-9 8-9-8-9-8z" stroke="#020288" strokeWidth="1" fill="#fff0f0" />
														<path d="M9 12l2 2 4-4" stroke="#020288" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
													</svg>
												</span> 
											</div>
											<div className="icon-content">
												<h4 className="ttr-title">Consulting Services</h4>
											</div>
										</div>
									</div>
									<div className="col-lg-6 col-sm-6 mb-30 mb-sm-20">
										<div className="feature-container feature-bx1 feature4">
											<div className="icon-md">
												<span className="icon-cell">
													<svg width="85" height="85" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
													<path d="M32 20a12 12 0 100 24 12 12 0 000-24zm0-6l3 4 5-1 1 5 5 1-2 5 3 4-3 4 2 5-5 1-1 5-5-1-3 4-3-4-5 1-1-5-5-1 2-5-3-4 3-4-2-5 5-1 1-5 5 1 3-4z" fill="#374151"/>

													<path d="M32 42s-8-5.5-8-10a4 4 0 018-2 4 4 0 018 2c0 4.5-8 10-8 10z" fill="#EF4444"/>

													<path d="M26 32l4 4 8-8" stroke="#FFFFFF" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
													</svg>
												</span> 
											</div>
											<div className="icon-content">
												<h4 className="ttr-title">Built on Commitment</h4>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
					<img className="pt-img1 animate-wave" src={ptImg1} alt=""/>
					<img className="pt-img2 animate2" src={ptImg2} alt=""/>
					<img className="pt-img3 animate-rotate" src={ptImg5} alt=""/>
					<img className="pt-img4 animate-wave" src={ptImg4} alt=""/>
					<img className="pt-img5 animate2" src={ptImg5} alt=""/>
				</section>
				
			</>
		);
	}
}

export default aboutSection;