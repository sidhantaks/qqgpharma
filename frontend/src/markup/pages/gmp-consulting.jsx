import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {Accordion} from 'react-bootstrap';

// Import Images
import bnrImg1 from "../../images/banner/img1.jpg";
import waveBlue from "../../images/shap/wave-blue.png";
import circleDots from "../../images/shap/circle-dots.png";
import plusBlue from "../../images/shap/plus-blue.png";
import servicesPic1 from "../../images/services/gmp.jpg";
import ServiceSidebar from '../elements/service-sidebar';

class GmpConsulting extends Component{
    render(){
        return (
            <>
                <div className="page-content bg-white">
                    <div className="banner-wraper">
                        <div className="page-banner" style={{backgroundImage: "url("+bnrImg1+")"}}>
                            <div className="container">
                                <div className="page-banner-entry text-center">
                                    <h1>GMP Consulting</h1>
                                    <nav aria-label="breadcrumb" className="breadcrumb-row">
                                        <ul className="breadcrumb">
                                            <li className="breadcrumb-item"><Link to="/">Home</Link></li>
                                            <li className="breadcrumb-item active" aria-current="page">GMP Consulting</li>
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
                                        <h2 className="title mb-15">GMP Consultancy Services</h2>
                                        <p className="mb-0">
                                            GMP Consultancy covers all critical aspects required to ensure compliance, inspection readiness,
                                            and robust quality systems across pharmaceutical operations.
                                        </p>
                                    </div>

                                    <div className="mb-30">
                                        <ul className="list-check-squer">

                                            <li><strong>GAP Assessments:</strong> Identify critical compliance gaps across facility, processes, and documentation. Deliver risk-based, practical remediation strategies.</li>

                                            <li><strong>Pre-Inspection Audits:</strong> Simulate real regulatory inspections to assess true readiness and ensure alignment with global regulatory expectations.</li>

                                            <li><strong>Guidance During Regulatory Inspections:</strong> Provide end-to-end inspection support, coordination, and real-time guidance during inspector interactions.</li>

                                            <li><strong>Regulatory Response Preparation & Management:</strong> Assess observations with risk prioritization and develop robust, compliant responses.</li>

                                            <li><strong>Remediation Activities:</strong> Address gaps through root cause analysis, CAPA implementation, and continuous monitoring for compliance.</li>

                                            <li><strong>Review of Investigations:</strong> Ensure investigations are thorough, timely, and scientifically justified.</li>

                                            <li><strong>Vendor Audits:</strong> Audit suppliers including KSMs, APIs, excipients, laboratories, and calibration services.</li>

                                            <li><strong>Validation Execution Support:</strong> Ensure validation activities follow approved protocols and provide on-floor guidance.</li>

                                        </ul>
                                    </div>

                                    <div className="head-text mb-20">
                                        <h4 className="title mb-10">Offerings</h4>
                                    </div>

                                    <div>
                                        <ul className="list-check-squer">
                                            <li>cGMP consultancy and GAP assessments</li>
                                            <li>Pre-Inspection audits</li>
                                            <li>Guidance during regulatory inspections</li>
                                            <li>Regulatory responses</li>
                                            <li>Remediation works</li>
                                            <li>Review of investigations</li>
                                            <li>Vendor audits</li>
                                            <li>Validation execution support</li>
                                        </ul>
                                    </div>

                                </div>
                                <div className="col-lg-4">
                                    <ServiceSidebar active={'gmp-consulting'} />
                                </div>
                            </div>
                        </div>
                    </section>
                </div>
            </>
        );
    }
}

export default GmpConsulting;
