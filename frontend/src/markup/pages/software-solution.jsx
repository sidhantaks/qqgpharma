import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {Accordion} from 'react-bootstrap';
import bnrImg1 from "../../images/banner/img1.jpg";
import waveBlue from "../../images/shap/wave-blue.png";
import circleDots from "../../images/shap/circle-dots.png";
import plusBlue from "../../images/shap/plus-blue.png";
import servicesPic1 from "../../images/services/software.jpg";
import ServiceSidebar from '../elements/service-sidebar';

class SoftwareSolution extends Component{
    render(){
        return (
            <>
                <div className="page-content bg-white">
                    <div className="banner-wraper">
                        <div className="page-banner" style={{backgroundImage: "url("+bnrImg1+")"}}>
                            <div className="container">
                                <div className="page-banner-entry text-center">
                                    <h1>Software Solutions</h1>
                                    <nav aria-label="breadcrumb" className="breadcrumb-row">
                                        <ul className="breadcrumb">
                                            <li className="breadcrumb-item"><Link to="/">Home</Link></li>
                                            <li className="breadcrumb-item active" aria-current="page">Software Solutions</li>
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
                                        <h2 className="title mb-15">Pharmaceutical Software Solutions</h2>
                                        <p className="mb-0">Specialized digital tools to optimize, automate and secure the drug lifecycle — from R&amp;D to distribution — while ensuring regulatory compliance (21 CFR Part 11, GxP).</p>
                                    </div>

                                    <div className="mb-20">
                                        <h5 className="mb-10">1. Core Pharma Software Types</h5>
                                        <ul className="list-check-squer mb-0">
                                            <li><strong>eQMS:</strong> Centralizes change control, CAPAs, deviations, audits and training.</li>
                                            <li><strong>ERP:</strong> Manages manufacturing, inventory, formulas, supply chain, and financials.</li>
                                            <li><strong>MES:</strong> Digitizes production and generates Electronic Batch Records (EBR) in real time.</li>
                                            <li><strong>LIMS:</strong> Automates QC lab workflows, sample management and instrument calibration.</li>
                                            <li><strong>RIM:</strong> Regulatory Information Management for product registrations and submissions (eCTD).</li>
                                            <li><strong>Pharmacovigilance Systems:</strong> ADR monitoring, case management and signal detection.</li>
                                            <li><strong>CRM:</strong> HCP engagement and compliant sample tracking.</li>
                                        </ul>
                                    </div>

                                    <div className="mb-20">
                                        <h5 className="mb-10">2. Key Features & Capabilities</h5>
                                        <ul className="list-check-squer mb-0">
                                            <li><strong>Regulatory Compliance:</strong> Built-in support for FDA, EMA, GxP, and HIPAA.</li>
                                            <li><strong>Data Integrity:</strong> ALCOA+ compliant tools with secure audit trails.</li>
                                            <li><strong>Formula Management:</strong> Versioning, approvals and scaling.</li>
                                            <li><strong>Traceability &amp; Serialization:</strong> Bi-directional lot tracking across the supply chain.</li>
                                            <li><strong>Electronic Signatures:</strong> 21 CFR Part 11 compliant approval workflows.</li>
                                        </ul>
                                    </div>

                                    <div className="mb-20">
                                        <h5 className="mb-10">3. Benefits</h5>
                                        <ul className="list-check-squer mb-0">
                                            <li>Faster time-to-market through streamlined R&amp;D, trials and manufacturing workflows.</li>
                                            <li>Improved efficiency by reducing manual tasks and data entry.</li>
                                            <li>Enhanced quality with digital checklists and reduced deviations.</li>
                                            <li>Audit-ready compliance with instant access to required documentation.</li>
                                            <li>Cost control via optimized inventory and production planning.</li>
                                        </ul>
                                    </div>

                                    <div className="mb-20">
                                        <h5 className="mb-10">4. Future Trends (2026+)</h5>
                                        <ul className="list-check-squer mb-0">
                                            <li><strong>AI &amp; ML:</strong> Predictive analytics for drug discovery and manufacturing optimization.</li>
                                            <li><strong>Cloud (SaaS):</strong> Scalable, secure cloud-native platforms replacing legacy on-prem systems.</li>
                                            <li><strong>Digital Twins:</strong> Virtual process replicas for simulation and optimization.</li>
                                            <li><strong>IoT &amp; Wearables:</strong> Real-time monitoring for patients and supply chain conditions.</li>
                                        </ul>
                                    </div>

                                    <div className="mb-20">
                                        <h5 className="mb-10">5. Common Solutions & Deployment</h5>
                                        <p className="mb-10">Popular integrated platforms include Veeva Vault, MasterControl, Scilife; ERP options like SAP S/4HANA and Dynamics 365; MES providers such as Werum PAS-X; and LIMS vendors like STARLIMS.</p>
                                        <ul className="list-check-squer mb-0">
                                            <li><strong>Deployment Models:</strong> Cloud (SaaS), On-premise, or Hybrid.</li>
                                            <li><strong>Typical Tech Stack:</strong> Back-end (Node.js, Python, Java), Front-end (React), DBs (Postgres, MongoDB), Cloud (AWS/Azure), Security (OAuth, JWT).</li>
                                        </ul>
                                    </div>
                                </div>
                                <div className="col-lg-4">
                                    <ServiceSidebar active={'software-solution'} />
                                </div>
                            </div>
                        </div>
                    </section>
                </div>
            </>
        );
    }
}

export default SoftwareSolution;
