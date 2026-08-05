import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {Accordion} from 'react-bootstrap';
import bnrImg1 from "../../images/banner/img1.jpg";
import waveBlue from "../../images/shap/wave-blue.png";
import circleDots from "../../images/shap/circle-dots.png";
import plusBlue from "../../images/shap/plus-blue.png";
import servicesPic1 from "../../images/services/engineering.jpg";
import ServiceSidebar from '../elements/service-sidebar';

class Engineering extends Component{
    render(){
        return (
            <>
                <div className="page-content bg-white">
                    <div className="banner-wraper">
                        <div className="page-banner" style={{backgroundImage: "url("+bnrImg1+")"}}>
                            <div className="container">
                                <div className="page-banner-entry text-center">
                                    <h1>Engineering Services</h1>
                                    <nav aria-label="breadcrumb" className="breadcrumb-row">
                                        <ul className="breadcrumb">
                                            <li className="breadcrumb-item"><Link to="/">Home</Link></li>
                                            <li className="breadcrumb-item active" aria-current="page">Engineering Services</li>
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
                                        <h2 className="title mb-15">Pharma Engineering Services</h2>
                                        <p className="mb-0">End-to-end engineering solutions for pharmaceutical facilities in India: facility design (HVAC, cleanrooms), process utilities (WFI, purified water, steam), automation, validation and cGMP compliance.</p>
                                    </div>

                                    <div className="mb-20">
                                        <h5 className="mb-10">Key Pharma Engineering Services</h5>
                                        <ul className="list-check-squer mb-0">
                                            <li><strong>Facility Layout &amp; Design:</strong> Cleanroom architecture, HVAC systems and material/personnel flow to prevent contamination.</li>
                                            <li><strong>Process &amp; Utility Engineering:</strong> Design and installation of WFI, purified water, compressed air, steam generation and piping systems.</li>
                                            <li><strong>Validation &amp; Qualification:</strong> Full DQ/IQ/OQ/PQ services, FAT/SAT support and equipment qualification to ensure audit readiness.</li>
                                            <li><strong>Regulatory Compliance &amp; Consulting:</strong> cGMP gap analysis, SOP preparation, risk assessments and documentation for FDA/WHO/MHRA expectations.</li>
                                            <li><strong>Automation &amp; Industry 4.0:</strong> PLC/SCADA integration, MES readiness, IoT sensors and real-time monitoring for batch tracking and process control.</li>
                                            <li><strong>Turnkey Projects:</strong> Concept, detailed engineering, construction management and handover for brownfield and greenfield projects.</li>
                                        </ul>
                                    </div>

                                    <div className="mb-20">
                                        <h5 className="mb-10">Technical Capabilities</h5>
                                        <ul className="list-check-squer mb-0">
                                            <li>Cleanroom design (ISO classifications), HVAC balancing and environmental monitoring strategies.</li>
                                            <li>Utilities engineering: WFI systems, purified water distribution, clean steam, and compressed air networks.</li>
                                            <li>Process engineering: equipment selection, containment, material handling and piping design.</li>
                                            <li>Automation &amp; Controls: DCS/PLC, SCADA integration, and MES/EBR enablement.</li>
                                        </ul>
                                    </div>

                                    <div className="mb-20">
                                        <h5 className="mb-10">Compliance, Sustainability &amp; Digitalization</h5>
                                        <p className="mb-10">Projects emphasize WHO-GMP/US FDA compliance, energy-efficient design, and adoption of digital tools such as digital twins and predictive maintenance to improve uptime and reduce costs.</p>
                                    </div>

                                    <div className="mb-0">
                                        <h5 className="mb-10">Why our engineering services</h5>
                                        <ul className="list-check-squer mb-0">
                                            <li>Capital project delivery with GMP-first approach and regulatory-focused documentation.</li>
                                            <li>Experienced multi-disciplinary teams covering process, utilities, HVAC, automation and validation.</li>
                                            <li>Flexible delivery: turnkey, modular builds, or targeted upgrades for existing plants.</li>
                                        </ul>
                                    </div>
                                </div>
                                <div className="col-lg-4">
                                    <ServiceSidebar active={'engineering'} />
                                </div>
                            </div>
                        </div>
                    </section>
                </div>
            </>
        );
    }
}

export default Engineering;
