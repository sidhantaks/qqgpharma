import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {Accordion} from 'react-bootstrap';
import bnrImg1 from "../../images/banner/img1.jpg";
import waveBlue from "../../images/shap/wave-blue.png";
import circleDots from "../../images/shap/circle-dots.png";
import plusBlue from "../../images/shap/plus-blue.png";
import servicesPic1 from "../../images/services/quality.jpg";
import ServiceSidebar from '../elements/service-sidebar';

class QualityControl extends Component{
    render(){
        return (
            <>
                <div className="page-content bg-white">
                    <div className="banner-wraper">
                        <div className="page-banner" style={{backgroundImage: "url("+bnrImg1+")"}}>
                            <div className="container">
                                <div className="page-banner-entry text-center">
                                    <h1>Quality Control</h1>
                                    <nav aria-label="breadcrumb" className="breadcrumb-row">
                                        <ul className="breadcrumb">
                                            <li className="breadcrumb-item"><Link to="/">Home</Link></li>
                                            <li className="breadcrumb-item active" aria-current="page">Quality Control</li>
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
                                        <h2 className="title mb-15">Pharmaceutical Quality Control (QC) Services</h2>
                                        <p className="mb-0">Pharmaceutical QC services verify that products meet predefined standards for safety, identity, strength, purity, and quality before reaching the market. These services support GMP and GLP through rigorous testing of raw materials, in-process samples, and finished goods.</p>
                                    </div>

                                    <div className="mb-20">
                                        <h5 className="mb-10">1. Core Quality Control Testing Services</h5>
                                        <ul className="list-check-squer mb-0">
                                            <li><strong>Raw Material Testing (IQC):</strong> Identification, purity testing, and safety verification of APIs, excipients, and packaging materials.</li>
                                            <li><strong>In-Process Quality Control (IPQC):</strong> Real-time monitoring of critical parameters (pH, viscosity, blending uniformity, moisture) to prevent batch failures.</li>
                                            <li><strong>Finished Product Testing (FPQC):</strong> Final release testing including potency, assay, content uniformity, dissolution, and physical attributes.</li>
                                            <li><strong>Stability Testing:</strong> Long-term and accelerated studies under ICH guidelines to establish shelf life and storage conditions.</li>
                                            <li><strong>Microbiological Testing:</strong> Sterility testing for injectables, microbial limits for non-steriles, endotoxin testing, and preservative efficacy.</li>
                                            <li><strong>Impurity Profiling:</strong> Detection and quantification of degradation products, residual solvents, elemental impurities, and heavy metals using GC/MS or LC/MS.</li>
                                        </ul>
                                    </div>

                                    <div className="mb-20">
                                        <h5 className="mb-10">2. Analytical Method Services</h5>
                                        <ul className="list-check-squer mb-0">
                                            <li><strong>Method Development &amp; Validation:</strong> Develop and validate HPLC, GC, UV-Vis and other methods to ensure precision, accuracy, specificity, and robustness, aligned with GLP/USP/EP standards.</li>
                                            <li><strong>Method Transfer:</strong> Manage transfer of validated analytical methods between laboratories, supporting technology transfer to CDMOs or contract labs.</li>
                                        </ul>
                                    </div>

                                    <div className="mb-20">
                                        <h5 className="mb-10">3. Compliance and Regulatory Support</h5>
                                        <ul className="list-check-squer mb-0">
                                            <li><strong>Regulatory Inspections &amp; Audit Readiness:</strong> Ensure lab data, records, and procedures are inspection-ready for FDA, EMA, WHO and other authorities.</li>
                                            <li><strong>Data Integrity &amp; Management:</strong> Support compliance with 21 CFR Part 11 for electronic records, audit trails, and traceability.</li>
                                            <li><strong>OOS/OOT Investigations:</strong> Conduct structured investigations, root cause analysis and CAPA implementation for OOS/OOT events.</li>
                                        </ul>
                                    </div>

                                    <div className="mb-20">
                                        <h5 className="mb-10">4. Specialized Lab Services</h5>
                                        <ul className="list-check-squer mb-0">
                                            <li><strong>Environmental Monitoring:</strong> Routine monitoring of cleanrooms (air, surface, personnel) to maintain cleanliness standards.</li>
                                            <li><strong>Instrument Qualification &amp; Calibration:</strong> IQ, OQ, PQ for analytical instruments and regular calibration.</li>
                                            <li><strong>Packaging Compatibility Testing:</strong> Evaluate packaging integrity and interactions (extractables &amp; leachables).</li>
                                        </ul>
                                    </div>

                                    <div className="mb-0">
                                        <h5 className="mb-10">5. Benefits &amp; Tools</h5>
                                        <ul className="list-check-squer mb-0">
                                            <li><strong>Benefits:</strong> Patient safety, regulatory compliance, and product consistency across batches.</li>
                                            <li><strong>Analytical Tools:</strong> HPLC, GC, MS, UV-Vis and other advanced techniques used to ensure high standards.</li>
                                        </ul>
                                    </div>
                                </div>
                                <div className="col-lg-4">
                                    <aside className="sticky-top pb-1">

                                        <div className="widget">
                                            <ServiceSidebar active={'quality-control'} />
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

export default QualityControl;
