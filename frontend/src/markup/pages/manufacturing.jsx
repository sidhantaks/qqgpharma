import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {Accordion} from 'react-bootstrap';
import bnrImg1 from "../../images/banner/img1.jpg";
import waveBlue from "../../images/shap/wave-blue.png";
import circleDots from "../../images/shap/circle-dots.png";
import plusBlue from "../../images/shap/plus-blue.png";
import servicesPic1 from "../../images/services/manufacturing.jpg";
import ServiceSidebar from '../elements/service-sidebar';

class Manufacturing extends Component{
    render(){
        return (
            <>
                <div className="page-content bg-white">
                    <div className="banner-wraper">
                        <div className="page-banner" style={{backgroundImage: "url("+bnrImg1+")"}}>
                            <div className="container">
                                <div className="page-banner-entry text-center">
                                    <h1>Manufacturing</h1>
                                    <nav aria-label="breadcrumb" className="breadcrumb-row">
                                        <ul className="breadcrumb">
                                            <li className="breadcrumb-item"><Link to="/">Home</Link></li>
                                            <li className="breadcrumb-item active" aria-current="page">Manufacturing</li>
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
                                        <h2 className="title mb-15">Pharmaceutical Manufacturing Services</h2>
                                        <p className="mb-0">Pharmaceutical manufacturing services encompass the entire product lifecycle, from initial formulation development to large-scale commercial production, packaging, and regulatory compliance. These services are largely provided by Contract Development and Manufacturing Organizations (CDMOs), which enable pharmaceutical companies to outsource production, reduce capital expenditure, and speed up time-to-market.</p>
                                    </div>

                                    <div className="mb-30">
                                        <h5 className="mb-10">Core Pharma Manufacturing Services</h5>
                                        <ul className="list-check-squer mb-0">
                                            <li><strong>Formulation Development:</strong> Creating stable and effective formulations, including pre-formulation studies, dosage form design, and pilot-scale batches.</li>
                                            <li><strong>API Manufacturing:</strong> Production of Active Pharmaceutical Ingredients to be used in intermediate formulations.</li>
                                            <li><strong>Finished Dosage Form Manufacturing:</strong> Production of solid dosage forms (tablets, capsules), liquids, creams, ointments, and injectables.</li>
                                            <li><strong>Analytical Services:</strong> Method development, validation of critical methodologies, impurity profiling, and stability studies.</li>
                                            <li><strong>Packaging &amp; Labelling:</strong> Primary and secondary packaging, including blister packs and bottle filling, ensuring regulatory compliance.</li>
                                        </ul>
                                    </div>

                                    <div className="mb-20">
                                        <h5 className="mb-10">Key Specializations and Technology</h5>
                                        <ul className="list-check-squer mb-0">
                                            <li><strong>Continuous Manufacturing:</strong> Modern, efficient production using in-line quality checks, offering flexibility over batch manufacturing.</li>
                                            <li><strong>Sterile Manufacturing:</strong> Specialized facilities for injectables and vaccines.</li>
                                            <li><strong>High-Potency &amp; Controlled Substances:</strong> Handling specialized compounds, including DEA-licensed, high-potency APIs.</li>
                                            <li><strong>Digitalization:</strong> Implementation of MES, AI, and IoT for real-time monitoring and data integrity.</li>
                                        </ul>
                                    </div>

                                    <div className="mb-20">
                                        <h5 className="mb-10">Quality and Regulatory Compliance</h5>
                                        <ul className="list-check-squer mb-0">
                                            <li><strong>cGMP Adherence:</strong> Strict adherence to current Good Manufacturing Practices ensuring quality from raw material receipt to finished product.</li>
                                            <li><strong>Regulatory Support:</strong> Assistance with dossier preparation, DMF management, and regulatory filings for FDA, EMA, or WHO.</li>
                                            <li><strong>Quality Assurance (QA) &amp; QC:</strong> Rigorous in-process controls, environmental monitoring, and validation studies (prospective, retrospective, concurrent).</li>
                                        </ul>
                                    </div>

                                    <div className="mb-20">
                                        <h5 className="mb-10">Outsourcing Benefits (CDMO Model)</h5>
                                        <ul className="list-check-squer mb-0">
                                            <li><strong>Cost Efficiency:</strong> Reduced need for in-house facilities, staff, and equipment.</li>
                                            <li><strong>Scalability:</strong> Ability to scale production based on market demand, from clinical trials to commercial volumes.</li>
                                            <li><strong>Expertise Access:</strong> Access to specialized technology, skilled scientists, and regulatory expertise.</li>
                                        </ul>
                                    </div>

                                    <div className="mb-0">
                                        <h5 className="mb-10">Trends in 2026</h5>
                                        <ul className="list-check-squer mb-0">
                                            <li><strong>Sustainability:</strong> Increased focus on green chemistry and reducing environmental impact.</li>
                                            <li><strong>Advanced Therapies:</strong> Growing demand for manufacturing services in cell therapy, biologics, and personalized medicine.</li>
                                            <li><strong>Digital Twins:</strong> Virtual validation of processes before execution for higher efficiency.</li>
                                            <li><strong>Supply Chain Resilience:</strong> Shifting towards regional production hubs to avoid dependence on single sources.</li>
                                        </ul>
                                    </div>
                                </div>
                                <div className="col-lg-4">
                                    <ServiceSidebar active={'manufacturing'} />
                                </div>
                            </div>
                        </div>
                    </section>
                </div>
            </>
        );
    }
}

export default Manufacturing;
