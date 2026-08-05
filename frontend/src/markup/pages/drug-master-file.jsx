import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {Accordion} from 'react-bootstrap';
import bnrImg1 from "../../images/banner/img1.jpg";
import waveBlue from "../../images/shap/wave-blue.png";
import circleDots from "../../images/shap/circle-dots.png";
import plusBlue from "../../images/shap/plus-blue.png";
import servicesPic1 from "../../images/services/drug.jpg";
import ServiceSidebar from '../elements/service-sidebar';

class DrugMasterFile extends Component{
    render(){
        return (
            <>
                <div className="page-content bg-white">
                    <div className="banner-wraper">
                        <div className="page-banner" style={{backgroundImage: "url("+bnrImg1+")"}}>
                            <div className="container">
                                <div className="page-banner-entry text-center">
                                    <h1>Drug Master File</h1>
                                    <nav aria-label="breadcrumb" className="breadcrumb-row">
                                        <ul className="breadcrumb">
                                            <li className="breadcrumb-item"><Link to="/">Home</Link></li>
                                            <li className="breadcrumb-item active" aria-current="page">Drug Master File</li>
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
                                        <h2 className="title mb-15">Drug Master File (DMF)</h2>
                                        <p className="mb-0">A Drug Master File (DMF) is a confidential, voluntary submission to regulatory agencies providing detailed, proprietary information about the manufacturing, processing, packaging, and storing of human drugs. It supports INDs, NDAs, or ANDAs without disclosing trade secrets to applicant parties.</p>
                                    </div>

                                    <div className="mb-30">
                                        <h5 className="mb-10">Core Content Components of a DMF</h5>
                                        <p>According to FDA guidelines, a DMF typically includes the following:</p>
                                        <ul className="list-check-squer mb-0">
                                            <li><strong>Administrative Information:</strong> Transmittal letter, DMF holder name and address, and Table of Contents.</li>
                                            <li><strong>Facility Information (Type I - largely discontinued):</strong> Details about the manufacturing plant, facilities, and operating procedures.</li>
                                            <li><strong>Drug Substance/Substance Intermediate Details (Type II):</strong>
                                                <ul>
                                                    <li><strong>Manufacturing Process:</strong> Detailed flowcharts and synthesis descriptions including raw materials, solvents, and catalysts.</li>
                                                    <li><strong>Characterization:</strong> Evidence of structure (NMR, IR, MS) and solid-state properties (polymorphism).</li>
                                                    <li><strong>Controls:</strong> Specifications, analytical methods, and validation data.</li>
                                                    <li><strong>Impurities:</strong> Profiles of potential impurities and degradation products.</li>
                                                </ul>
                                            </li>
                                            <li><strong>Packaging Material Information (Type III):</strong> Material types, composition, safety data, and suitability.
                                            </li>
                                            <li><strong>Excipient Information (Type IV):</strong> Formulation details, colorants, flavors, or additives.</li>
                                            <li><strong>Stability Data:</strong> Long-term and accelerated studies determining shelf life and storage conditions.</li>
                                        </ul>
                                    </div>

                                    <div className="mb-30">
                                        <h5 className="mb-10">DMF Types</h5>
                                        <ul className="list-check-squer mb-0">
                                            <li><strong>Type I:</strong> Manufacturing site, facilities, personnel (mostly discontinued by FDA).</li>
                                            <li><strong>Type II:</strong> Drug substance, intermediate, or drug product (most common).</li>
                                            <li><strong>Type III:</strong> Packaging material.</li>
                                            <li><strong>Type IV:</strong> Excipient, colorant, flavor, or essence.</li>
                                            <li><strong>Type V:</strong> FDA-accepted reference information (e.g., contract manufacturing agreements).</li>
                                        </ul>
                                    </div>

                                    <div className="mb-30">
                                        <h5 className="mb-10">Key Submission Requirements</h5>
                                        <ul className="list-check-squer mb-0">
                                            <li><strong>Language:</strong> Must be in English.</li>
                                            <li><strong>Format:</strong> Generally submitted in eCTD format.</li>
                                            <li><strong>Updates:</strong> Annual updates to report changes (site, process, impurity data).</li>
                                            <li><strong>No Approval:</strong> DMFs are not approved/disapproved but reviewed for adequacy when referenced in an application.</li>
                                        </ul>
                                    </div>
                                </div>
                                <div className="col-lg-4">
                                <aside className="sticky-top pb-1">

                                

                                    <div className="widget">
                                        <ServiceSidebar active={'drug-master-file'} />
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

export default DrugMasterFile;
