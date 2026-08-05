import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {Accordion} from 'react-bootstrap';
import bnrImg1 from "../../images/banner/img1.jpg";
import waveBlue from "../../images/shap/wave-blue.png";
import circleDots from "../../images/shap/circle-dots.png";
import plusBlue from "../../images/shap/plus-blue.png";
import servicesPic1 from "../../images/services/safety.jpg";
import ServiceSidebar from '../elements/service-sidebar';

class Safety extends Component{
    render(){
        return (
            <>
                <div className="page-content bg-white">
                    <div className="banner-wraper">
                        <div className="page-banner" style={{backgroundImage: "url("+bnrImg1+")"}}>
                            <div className="container">
                                <div className="page-banner-entry text-center">
                                    <h1>Safety Services</h1>
                                    <nav aria-label="breadcrumb" className="breadcrumb-row">
                                        <ul className="breadcrumb">
                                            <li className="breadcrumb-item"><Link to="/">Home</Link></li>
                                            <li className="breadcrumb-item active" aria-current="page">Safety Services</li>
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
                                        <h2 className="title mb-15">Pharmaceutical Safety Services in India</h2>
                                        <p className="mb-0">Ensuring regulatory compliance, worker safety and product integrity through pharmacovigilance (PvPI), GMP-focused EHS programs, audits and specialised training.</p>
                                    </div>

                                    <div className="mb-20">
                                        <h5 className="mb-10">Key Pharma Safety Services</h5>
                                        <ul className="list-check-squer mb-0">
                                            <li><strong>Pharmacovigilance (Drug Safety):</strong> ICSR management, PSUR preparation and submission, Risk Management Plans (RMPs) and signal detection.</li>
                                            <li><strong>Pharmaceutical Manufacturing Safety (EHS):</strong> MSDS &amp; environmental documentation, emergency response planning, process safety &amp; HAZOP, and cleanroom management.</li>
                                            <li><strong>Regulatory Compliance &amp; Audit Services:</strong> WHO-GMP audits, CDSCO licence support, documentation control and remediation planning.</li>
                                            <li><strong>Safety Training &amp; Technologies:</strong> PPE training, digital monitoring (IoT/AI), and immersive simulations such as VR for high-impact safety learning.</li>
                                        </ul>
                                    </div>

                                    <div className="mb-20">
                                        <h5 className="mb-10">Pharmacovigilance Services (PvPI-aligned)</h5>
                                        <ul className="list-check-squer mb-0">
                                            <li><strong>ICSR Management:</strong> Collecting, processing and reporting individual case safety reports to regulatory authorities.</li>
                                            <li><strong>PSUR Submission:</strong> Preparing periodic safety update reports per regulatory timelines.</li>
                                            <li><strong>Risk Management Plans (RMPs):</strong> Proactive safety planning and mitigation strategies.</li>
                                            <li><strong>Signal Detection:</strong> Evaluating adverse drug reaction data for emerging safety signals.</li>
                                        </ul>
                                    </div>

                                    <div className="mb-20">
                                        <h5 className="mb-10">EHS &amp; Manufacturing Safety</h5>
                                        <ul className="list-check-squer mb-0">
                                            <li>Environmental &amp; safety documentation: MSDS, SOPs and waste management records.</li>
                                            <li>Emergency response planning for chemical spills, fires and safety incidents.</li>
                                            <li>Process safety &amp; hazard analysis (HAZOP) focused on API and chemical handling.</li>
                                            <li>Cleanroom hygiene, contamination control and monitoring strategies.</li>
                                        </ul>
                                    </div>

                                    <div className="mb-20">
                                        <h5 className="mb-10">Regulatory Bodies &amp; Compliance</h5>
                                        <p className="mb-10">We work to meet CDSCO, WHO-GMP and other international standards. Key organisations include:</p>
                                        <ul className="list-check-squer mb-0">
                                            <li>CDSCO — Central Drugs Standard Control Organization</li>
                                            <li>PvPI — Pharmacovigilance Programme of India</li>
                                            <li>BIRAC / DBT — for biotech environmental health &amp; safety where applicable</li>
                                        </ul>
                                    </div>

                                    <div className="mb-20">
                                        <h5 className="mb-10">Training &amp; Digital Safety Tools</h5>
                                        <p className="mb-10">We provide PPE training, simulation-based safety drills, and deploy digital safety solutions (IoT monitoring, AI-driven anomaly detection and dashboards) to improve real-time visibility and reduce incidents.</p>
                                    </div>

                                    <Accordion defaultActiveKey="0" className="accordion ttr-accordion1">
                                        <Accordion.Item eventKey="0">
                                            <Accordion.Header>Do you provide pharmacovigilance services?</Accordion.Header>
                                            <Accordion.Body>
                                                <p className="mb-0">Yes — we offer end-to-end PV services including ICSR processing, PSUR/RMP support and signal detection aligned to PvPI and global regulatory expectations.</p>
                                            </Accordion.Body>
                                        </Accordion.Item>
                                        <Accordion.Item eventKey="1">
                                            <Accordion.Header>Can you perform GMP safety audits?</Accordion.Header>
                                            <Accordion.Body>
                                                <p className="mb-0">We conduct GMP and EHS audits, prepare remediation plans, and assist with licence and documentation updates required by CDSCO and other authorities.</p>
                                            </Accordion.Body>
                                        </Accordion.Item>
                                    </Accordion>
                                </div>
                               <div className="col-lg-4">
                                <aside className="sticky-top pb-1">

                                    <div className="widget">
                                        <ServiceSidebar active={'safety'} />
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

export default Safety;
