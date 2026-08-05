import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {Accordion} from 'react-bootstrap';
import bnrImg1 from "../../images/banner/img1.jpg";
import waveBlue from "../../images/shap/wave-blue.png";
import circleDots from "../../images/shap/circle-dots.png";
import plusBlue from "../../images/shap/plus-blue.png";
import servicesPic1 from "../../images/services/chemical.jpg";
import ServiceSidebar from '../elements/service-sidebar';

class ChemicalImpurities extends Component{
    render(){
        return (
            <>
                <div className="page-content bg-white">
                    <div className="banner-wraper">
                        <div className="page-banner" style={{backgroundImage: "url("+bnrImg1+")"}}>
                            <div className="container">
                                <div className="page-banner-entry text-center">
                                    <h1>Chemical Impurity</h1>
                                    <nav aria-label="breadcrumb" className="breadcrumb-row">
                                        <ul className="breadcrumb">
                                            <li className="breadcrumb-item"><Link to="/">Home</Link></li>
                                            <li className="breadcrumb-item active" aria-current="page">Chemical Impurity</li>
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
                                        <h2 className="title mb-15">Chemical Impurities & Profiling</h2>
                                        <p className="mb-0">We help manufacturers identify, quantify and control chemical impurities throughout the drug lifecycle to meet regulatory expectations and ensure patient safety.</p>
                                    </div>

                                    <div className="mb-20">
                                        <h5 className="mb-10">Scope of Services</h5>
                                        <ul className="list-check-squer mb-0">
                                            <li><strong>Impurity Profiling:</strong> Identification and quantification of degradants, process-related impurities, and by-products using LC-MS, GC-MS and HRMS.</li>
                                            <li><strong>Genotoxic Impurity Assessment:</strong> Detection, qualification and control strategies for DNA-reactive impurities in line with ICH M7.</li>
                                            <li><strong>Residual Solvent &amp; Elemental Impurity Testing:</strong> Quantitation and control following ICH Q3C and Q3D guidelines.</li>
                                            <li><strong>Forced Degradation / Stress Testing:</strong> Determine degradation pathways and support stability-indicating method development.</li>
                                            <li><strong>Method Development &amp; Validation:</strong> Robust analytical methods for impurity and degradation product measurement, validated to regulatory standards.</li>
                                        </ul>
                                    </div>

                                    <div className="mb-20">
                                        <h5 className="mb-10">Regulatory & Risk Support</h5>
                                        <ul className="list-check-squer mb-0">
                                            <li><strong>Specification Setting:</strong> Support for setting impurity acceptance criteria using toxicological thresholds and clinical relevance.</li>
                                            <li><strong>DMF/CTD Support:</strong> Prepare impurity sections for regulatory dossiers and Drug Master Files.</li>
                                            <li><strong>Toxicological Risk Assessment:</strong> Evaluate safety implications and advise on qualification strategies.</li>
                                        </ul>
                                    </div>

                                    <div className="mb-20">
                                        <h5 className="mb-10">Control & Mitigation</h5>
                                        <ul className="list-check-squer mb-0">
                                            <li><strong>Process Optimization:</strong> Identify critical steps to reduce impurity formation during synthesis and purification.</li>
                                            <li><strong>Cleaning & Cross-Contamination Controls:</strong> Strategies to prevent carryover and maintain batch integrity.</li>
                                            <li><strong>Ongoing Monitoring:</strong> Stability monitoring and batch-to-batch impurity trending to detect shifts early.</li>
                                        </ul>
                                    </div>

                                    <div className="mb-0">
                                        <h5 className="mb-10">Analytical Platforms & Benefits</h5>
                                        <ul className="list-check-squer mb-0">
                                            <li><strong>Platforms:</strong> LC-MS/MS, GC-MS, HRMS, NMR and capillary electrophoresis for comprehensive impurity coverage.</li>
                                            <li><strong>Benefits:</strong> Regulatory-ready impurity control strategies, reduced recall risk, and improved product safety and quality.</li>
                                        </ul>
                                    </div>
                                </div>
                                <div className="col-lg-4">
                                    <aside className="sticky-top pb-1">

                                        <div className="widget">
                                            <ServiceSidebar active={'chemical-impurities'} />
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

export default ChemicalImpurities;
