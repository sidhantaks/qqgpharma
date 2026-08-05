import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {Accordion} from 'react-bootstrap';
import bnrImg1 from "../../images/banner/img1.jpg";
import waveBlue from "../../images/shap/wave-blue.png";
import circleDots from "../../images/shap/circle-dots.png";
import plusBlue from "../../images/shap/plus-blue.png";
import servicesPic1 from "../../images/services/facility.jpg";
import ServiceSidebar from '../elements/service-sidebar';

class FacilityProjects extends Component{
    render(){
        return (
            <>
                <div className="page-content bg-white">
                    <div className="banner-wraper">
                        <div className="page-banner" style={{backgroundImage: "url("+bnrImg1+")"}}>
                            <div className="container">
                                <div className="page-banner-entry text-center">
                                    <h1>New Facility - Projects</h1>
                                    <nav aria-label="breadcrumb" className="breadcrumb-row">
                                        <ul className="breadcrumb">
                                            <li className="breadcrumb-item"><Link to="/">Home</Link></li>
                                            <li className="breadcrumb-item active" aria-current="page">New Facility - Projects</li>
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
                                        <h2 className="title mb-15">New Facility Projects</h2>
                                        <p className="mb-0">Design, build and commission GMP-compliant pharmaceutical facilities — from concept and feasibility through to handover, validation and operational readiness.</p>
                                    </div>

                                    <div className="mb-20">
                                        <h5 className="mb-10">Our Facility Project Services</h5>
                                        <ul className="list-check-squer mb-0">
                                            <li><strong>Concept & Feasibility:</strong> Site selection, feasibility studies, master planning and budget forecasting.</li>
                                            <li><strong>Detailed Design:</strong> Architectural, process, utilities, HVAC, cleanroom and containment design aligned to GMP.</li>
                                            <li><strong>Project Management:</strong> Integrated project controls, schedule and cost management, procurement and stakeholder coordination.</li>
                                            <li><strong>Construction Management:</strong> Contractor selection, on-site supervision, quality assurance and safety management.</li>
                                            <li><strong>Commissioning & Qualification:</strong> IQ/OQ/PQ, equipment FAT/SAT support, and systems handover documentation.</li>
                                            <li><strong>Validation & Qualification:</strong> Process qualification, cleaning validation, and performance qualification to support regulatory submissions.</li>
                                            <li><strong>Operational Readiness:</strong> SOPs, training programs, QA/QC setup, and production ramp-up support.</li>
                                        </ul>
                                    </div>

                                    <div className="mb-20">
                                        <h5 className="mb-10">Technical Capabilities</h5>
                                        <ul className="list-check-squer mb-0">
                                            <li>Cleanroom design (ISO classifications), HVAC balancing and environmental monitoring strategy.</li>
                                            <li>Utilities engineering: WFI, purified water, clean compressed air, steam and chilled water systems.</li>
                                            <li>Process engineering: equipment selection, process flow, containment and material handling.</li>
                                            <li>Automation & Control: DCS/PLC integration, MES/EBR readiness, and batch control strategies.</li>
                                        </ul>
                                    </div>

                                    <div className="mb-20">
                                        <h5 className="mb-10">Compliance & Sustainability</h5>
                                        <p className="mb-10">Projects are delivered with regulatory compliance and sustainability in mind: GMP-aligned documentation, energy-efficient design, waste-reduction strategies and options for modular or green-field construction.</p>
                                    </div>

                                    <div className="mb-0">
                                        <h5 className="mb-10">Why choose us</h5>
                                        <ul className="list-check-squer mb-0">
                                            <li>Single-source delivery: from concept through validation and handover.</li>
                                            <li>GMP-first approach ensuring inspection readiness at handover.</li>
                                            <li>Experienced multi-disciplinary teams (process, utilities, HVAC, validation, QA/QC).</li>
                                            <li>Flexibility: modular facilities, brownfield upgrades, and full turn-key projects.</li>
                                        </ul>
                                    </div>
                                </div>
                                <div className="col-lg-4">
    <aside className="sticky-top pb-1">

        <div className="widget">
            <ul className="service-menu">
                <li><Link to="/gmp-consulting"><span>GMP Consulting</span><i className="fa fa-angle-right"></i></Link></li>
                <li><Link to="/manufacturing"><span>Manufacturing</span><i className="fa fa-angle-right"></i></Link></li>
                <li><Link to="/drug-master-file"><span>Drug Master File</span><i className="fa fa-angle-right"></i></Link></li>
                <li className="active"><Link to="/facility-projects"><span>New Facility - Projects</span><i className="fa fa-angle-right"></i></Link></li>
            </ul>
        </div>

        <div className="widget">
            <ServiceSidebar active={'facility-projects'} />
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

export default FacilityProjects;
