import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {Accordion} from 'react-bootstrap';
import bnrImg1 from "../../images/banner/img1.jpg";
import waveBlue from "../../images/shap/wave-blue.png";
import circleDots from "../../images/shap/circle-dots.png";
import plusBlue from "../../images/shap/plus-blue.png";
import servicesPic1 from "../../images/services/buyer.jpg";
import ServiceSidebar from '../elements/service-sidebar';

class BuyerSellers extends Component{
    render(){
        return (
            <>
                <div className="page-content bg-white">
                    <div className="banner-wraper">
                        <div className="page-banner" style={{backgroundImage: "url("+bnrImg1+")"}}>
                            <div className="container">
                                <div className="page-banner-entry text-center">
                                    <h1>Buyer & Sellers</h1>
                                    <nav aria-label="breadcrumb" className="breadcrumb-row">
                                        <ul className="breadcrumb">
                                            <li className="breadcrumb-item"><Link to="/">Home</Link></li>
                                            <li className="breadcrumb-item active" aria-current="page">Buyer & Sellers</li>
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
                                        <h2 className="title mb-15">Buyer & Seller Advisory</h2>
                                        <p className="mb-0">Advisory services for transactions in the pharmaceutical and life-sciences sector: buy-side and sell-side advisory, valuations, due diligence, deal structuring and integration support.</p>
                                    </div>

                                    <div className="mb-20">
                                        <h5 className="mb-10">Services We Provide</h5>
                                        <ul className="list-check-squer mb-0">
                                            <li><strong>Sell-side Preparation:</strong> Commercial, quality and regulatory readiness reviews, data-room setup and seller positioning to maximise value.</li>
                                            <li><strong>Buy-side Advisory:</strong> Target identification, commercial and technical due diligence, risk assessment and integration planning.</li>
                                            <li><strong>Valuation &amp; Financial Modelling:</strong> Pharma-specific valuation models considering product pipelines, market access, and regulatory timelines.</li>
                                            <li><strong>Transaction Structuring:</strong> Deal structuring, taxation considerations, escrow and contingent payment design (earn-outs, milestones).</li>
                                            <li><strong>Regulatory &amp; Compliance Review:</strong> Assessment of licences, approvals, GMP status, registrations and potential remediation plans.</li>
                                            <li><strong>Post-merger Integration:</strong> Operational integration, HR and culture alignment, systems rationalisation and synergies capture.</li>
                                        </ul>
                                    </div>

                                    <div className="mb-20">
                                        <h5 className="mb-10">How We Work</h5>
                                        <p className="mb-10">We combine commercial, technical and regulatory expertise to provide practical, transaction-focused advice. Workstreams are tailored to client needs and designed to produce clear decision-grade outputs for buyers and sellers.</p>
                                    </div>
                                </div>
                                <div className="col-lg-4">
                                <aside className="sticky-top pb-1">
                                    {/* Sidebar Component */}
                                    <div className="widget">
                                    <ServiceSidebar active={'buyer-sellers'} />
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

export default BuyerSellers;
