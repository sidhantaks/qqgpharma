import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {Accordion} from 'react-bootstrap';
import bnrImg1 from "../../images/banner/img1.jpg";
import waveBlue from "../../images/shap/wave-blue.png";
import circleDots from "../../images/shap/circle-dots.png";
import plusBlue from "../../images/shap/plus-blue.png";
import servicesPic1 from "../../images/services/incorporation.jpg";
import ServiceSidebar from '../elements/service-sidebar';

class IncorporationMergers extends Component{
    render(){
        return (
            <>
                <div className="page-content bg-white">
                    <div className="banner-wraper">
                        <div className="page-banner" style={{backgroundImage: "url("+bnrImg1+")"}}>
                            <div className="container">
                                <div className="page-banner-entry text-center">
                                    <h1>New Incorporation Mergers</h1>
                                    <nav aria-label="breadcrumb" className="breadcrumb-row">
                                        <ul className="breadcrumb">
                                            <li className="breadcrumb-item"><Link to="/">Home</Link></li>
                                            <li className="breadcrumb-item active" aria-current="page">New Incorporation Mergers</li>
                                        </ul>
                                    </nav>
                                </div>
                            </div>
                            <img className="pt-img1 animate-wave" src={waveBlue} alt=""/>
                            <img className="pt-img2 animate2" src={circleDots} alt=""/>
                            <img className="pt-img3 animate-rotate" src={plusBlue} alt=""/>
                        </div>
                    </div>

                    <section className="section-area section-sp1">
                        <div className="container">
                            <div className="row">
                                <div className="col-lg-8 mb-30">
                                    <div className="ttr-media mb-30">
                                        <img src={servicesPic1} className="rounded" alt=""/>
                                    </div>
                                    <div className="head-text mb-30">
                                        <h2 className="title mb-15">Incorporation & Mergers Advisory</h2>
                                        <p className="mb-0">Establishing or merging pharmaceutical businesses in India requires specialized legal, regulatory and technical support. We guide clients through company registration, licensing, compliance and M&amp;A transactions specific to the pharma sector.</p>
                                    </div>

                                    <div className="mb-20">
                                        <h5 className="mb-10">1. New Pharma Incorporation Services in India</h5>
                                        <p>Starting a pharmaceutical firm (Private Limited, LLP or Partnership) requires a sequence of statutory and regulatory steps:</p>
                                        <ul className="list-check-squer mb-0">
                                            <li><strong>Company Incorporation:</strong> Registration with the Ministry of Corporate Affairs (MCA).</li>
                                            <li><strong>Drug Licenses (CDSCO / State FDA):</strong>
                                                <ul>
                                                    <li><strong>Manufacturing License:</strong> Mandatory for producing medicines.</li>
                                                    <li><strong>Wholesale License:</strong> Required for distribution.</li>
                                                    <li><strong>Loan License:</strong> For firms outsourcing manufacturing to a third party.</li>
                                                </ul>
                                            </li>
                                            <li><strong>Regulatory Registrations:</strong> GST registration, FSSAI for nutraceuticals, and IEC (Import-Export Code) for international trade.</li>
                                            <li><strong>Quality Compliance:</strong> Implement GMP and relevant ISO standards during design and operations.</li>
                                            <li><strong>Intellectual Property:</strong> Trademark and patent registrations to protect brand and formulations.</li>
                                        </ul>
                                    </div>

                                    <div className="mb-20">
                                        <h5 className="mb-10">2. Pharma Mergers &amp; Acquisitions (M&amp;A) Services</h5>
                                        <p>Mergers are driven by portfolio expansion, biologics capabilities and market access. Our M&amp;A support covers:</p>
                                        <ul className="list-check-squer mb-0">
                                            <li><strong>Due Diligence:</strong> Financial, legal, regulatory and IP risk assessments.</li>
                                            <li><strong>Regulatory Approvals:</strong> Managing Competition Commission of India (CCI) filings and approvals where required.</li>
                                            <li><strong>Valuation &amp; Deal Structuring:</strong> Asset and business valuation, earn-outs, and transaction structuring.</li>
                                            <li><strong>Integration Services:</strong> Post-merger integration for systems, product portfolios and compliance alignment.</li>
                                        </ul>
                                    </div>

                                    <div className="mb-20">
                                        <h5 className="mb-10">3. Key Regulatory Requirements</h5>
                                        <ul className="list-check-squer mb-0">
                                            <li><strong>Premises Requirements:</strong> Minimum space requirements (e.g., 10 sq. meters for wholesale) and appropriate storage (refrigeration/AC) where applicable.</li>
                                            <li><strong>Technical Staff:</strong> Appointment of a registered pharmacist or qualified technical person is mandatory for licensing.</li>
                                            <li><strong>Forms &amp; Documentation:</strong> Preparing Form 25/28 and related documentation for manufacturing applications and maintaining inspection-ready records.</li>
                                        </ul>
                                    </div>

                                    <div className="mb-0">
                                        <h5 className="mb-10">Why Choose Specialized Pharma Consultancy?</h5>
                                        <p>Sector-specific consultants streamline complex regulatory filings, manage documentation for drug manufacturing applications, advise on antitrust and CCI matters for M&amp;A, and support IP strategy. We help ensure timely licenses and reduce regulatory risk during incorporation and transactions.</p>
                                    </div>
                                </div>
                               <div className="col-lg-4">
                                    <aside className="sticky-top pb-1">
                                        <div className="widget">
                                            <ServiceSidebar active={'incorporation-mergers'} />
                                        </div>

                                    </aside>
                                </div>
                            </div>
                        </div>
                    </section>
                </div>
            </>
        );
    }
}

export default IncorporationMergers;
