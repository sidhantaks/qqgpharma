import React, { Component } from 'react';

class LatestNewsSection extends Component{
	render(){
		
		return(
			<>
				
				<section className="section-sp1 service-wraper2">
					<div className="container">
						<div className="row">
							<div className="col-xl-3 col-sm-6 mb-30">
								<div className="feature-container feature-bx3">
									<div className="feature-icon">
										<svg width="48" height="48" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
											<rect x="3" y="7" width="18" height="11" rx="2" stroke="#020288" strokeWidth="1" fill="#e8f3ff" />
											<path d="M7 7V5a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v2" stroke="#020288" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
										</svg>
									</div>
									<h5 className="ttr-title">Fully Experienced</h5>
									<p>Decade-long experience delivering GMP consultancy and regulatory support.</p>
								</div>
							</div>
							<div className="col-xl-3 col-sm-6 mb-30">
								<div className="feature-container feature-bx3">
									<div className="feature-icon">
										<svg width="48" height="48" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
											<path d="M12 2l2 4 4 .5-3 2 1.2 4L12 11.5 7.8 12l1.2-4-3-2L10 6l2-4z" stroke="#020288" strokeWidth="0.8" fill="#fff6e6" />
											<path d="M8 20h8v2H8z" fill="#ffb400" />
										</svg>
									</div>
									<h5 className="ttr-title">Industry Awards</h5>
									<p>Recognized for excellence in quality systems, inspections and compliance.</p>
								</div>
							</div>
							<div className="col-xl-3 col-sm-6 mb-30">
								<div className="feature-container feature-bx3">
									<div className="feature-icon">
										<svg width="48" height="48" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
											<circle cx="12" cy="8" r="3" stroke="#020288" strokeWidth="1" fill="#e8f3ff" />
											<path d="M4 20c2-3 6-5 8-5s6 2 8 5" stroke="#020288" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
										</svg>
									</div>
									<h5 className="ttr-title">Expert Consultants</h5>
									<p>Highly experienced GMP consultants, auditors and regulatory specialists.</p>
								</div>
							</div>
							<div className="col-xl-3 col-sm-6 mb-30">
								<div className="feature-container feature-bx3">
									<div className="feature-icon">
										<svg width="48" height="48" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
											<path d="M2 12l4 4 6-6 6 6 4-4" stroke="#020288" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" fill="#fff0f0" />
											<path d="M7 12l1 1" stroke="#020288" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
										</svg>
									</div>
									<h5 className="ttr-title">Satisfied Clients</h5>
									<p>Trusted by hundreds of clients worldwide for reliable regulatory readiness.</p>
								</div>
							</div>
						</div>
					</div>
				</section>
				
			</>
		);
	}
}

export default LatestNewsSection;