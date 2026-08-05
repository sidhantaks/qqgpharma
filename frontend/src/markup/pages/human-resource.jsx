import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {Accordion} from 'react-bootstrap';
import bnrImg1 from "../../images/banner/img1.jpg";
import waveBlue from "../../images/shap/wave-blue.png";
import circleDots from "../../images/shap/circle-dots.png";
import plusBlue from "../../images/shap/plus-blue.png";
import servicesPic1 from "../../images/services/hr.jpg";
import ServiceSidebar from '../elements/service-sidebar';

class HumanResource extends Component{
    render(){
        return (
            <>
                <div className="page-content bg-white">
                    <div className="banner-wraper">
                        <div className="page-banner" style={{backgroundImage: "url("+bnrImg1+")"}}>
                            <div className="container">
                                <div className="page-banner-entry text-center">
                                    <h1>Human Resource</h1>
                                    <nav aria-label="breadcrumb" className="breadcrumb-row">
                                        <ul className="breadcrumb">
                                            <li className="breadcrumb-item"><Link to="/">Home</Link></li>
                                            <li className="breadcrumb-item active" aria-current="page">Human Resource</li>
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
                                        <h2 className="title mb-15">Human Resource Services</h2>
                                        <p className="mb-0">Comprehensive HR solutions for pharmaceutical and life-science organisations: recruitment, competency development, HR systems and compliance-focused people programs.</p>
                                    </div>

                                    <div className="mb-20">
                                        <h5 className="mb-10">Our HR Service Offerings</h5>
                                        <ul className="list-check-squer mb-0">
                                            <li><strong>Recruitment &amp; Staffing:</strong> Pharma-experienced hiring for QC, QA, Production, Validation, Regulatory and senior leadership roles.</li>
                                            <li><strong>Onboarding &amp; Induction:</strong> Role-specific GMP induction, documentation training and buddy programs to accelerate new-hire readiness.</li>
                                            <li><strong>Competency &amp; Training:</strong> Competency mapping, training calendars, LMS support and audit-ready training records (GMP, documentation, safety).</li>
                                            <li><strong>HR Policies &amp; SOPs:</strong> Drafting and implementation of HR policies, SOPs, job descriptions and performance frameworks aligned to regulated operations.</li>
                                            <li><strong>Performance &amp; Talent Management:</strong> Appraisal frameworks, career-pathing, succession planning and retention programs tailored to specialized pharma skillsets.</li>
                                            <li><strong>Contractor & Vendor Management:</strong> Vendor qualification, contractor onboarding, access controls and compliance oversight for contract staff.</li>
                                            <li><strong>HR Systems &amp; Payroll:</strong> HRIS selection/implementation, payroll support, attendance and statutory compliance guidance.</li>
                                        </ul>
                                    </div>

                                    <div className="mb-20">
                                        <h5 className="mb-10">Training &amp; Competency</h5>
                                        <p className="mb-10">We build competency frameworks and run training programs focused on GMP principles, documentation practices, deviation handling, and role-based technical skills. Training is documented to meet audit requirements.</p>
                                    </div>

                                    <div className="mb-20">
                                        <h5 className="mb-10">Compliance &amp; Audit Support</h5>
                                        <p className="mb-10">Our HR services include support for regulatory inspections, employee file audits, leave and working-hours compliance, and HR evidence preparation for GMP audits.</p>
                                    </div>

                                    <div className="mb-20">
                                        <h5 className="mb-10">Why Partner With Us</h5>
                                        <ul className="list-check-squer mb-0">
                                            <li>Domain expertise: recruiters and trainers with pharma industry experience.</li>
                                            <li>Audit-ready processes: HR documentation and training aligned to regulatory expectations.</li>
                                            <li>Flexible engagement: project hiring, managed services or advisory support for HR transformation.</li>
                                        </ul>
                                    </div>

                                    <Accordion defaultActiveKey="0" className="accordion ttr-accordion1">
                                        <Accordion.Item eventKey="0">
                                            <Accordion.Header>What HR services do you offer?</Accordion.Header>
                                            <Accordion.Body>
                                                <p className="mb-0">We provide recruitment, training programs, competency frameworks and HR policy development for regulated environments, plus ongoing HR operations support.</p>
                                            </Accordion.Body>
                                        </Accordion.Item>
                                        <Accordion.Item eventKey="1">
                                            <Accordion.Header>Can you help with audit preparation?</Accordion.Header>
                                            <Accordion.Body>
                                                <p className="mb-0">Yes — we assist with employee file audits, training record collation, SOP reviews and producing HR evidence required during GMP/regulatory inspections.</p>
                                            </Accordion.Body>
                                        </Accordion.Item>
                                    </Accordion>
                                </div>
                                <div className="col-lg-4">
                                    <aside className="sticky-top pb-1">
                                        <div className="widget">
                                            <ServiceSidebar active={'human-resource'} />
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

export default HumanResource;
