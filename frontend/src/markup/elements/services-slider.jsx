import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Slider from "react-slick";

// Icons
import {
  FaFlask, FaIndustry, FaFileAlt, FaVials,
  FaLaptopCode, FaBuilding, FaHandshake,
  FaTools, FaUsers, FaExchangeAlt, FaShieldAlt
} from "react-icons/fa";

// Shapes
import lineCircleBlue from "../../images/shap/line-circle-blue.png";
import squareDotsOrange from "../../images/shap/square-dots-orange.png";
import waveBlue from "../../images/shap/wave-blue.png";
import squareRotate from "../../images/shap/square-rotate.png";

// Services Data
const services = [
  {
    title: "GMP Consulting",
    desc: "Expert GMP guidance to ensure regulatory compliance, audit readiness, and robust quality systems.",
    link: "/gmp-consulting",
    icon: <FaFlask />
  },
  {
    title: "Manufacturing",
    desc: "Contract manufacturing solutions covering clinical to commercial scale production with GMP oversight.",
    link: "/manufacturing",
    icon: <FaIndustry />
  },
  {
    title: "Drug Master File",
    desc: "Comprehensive DMF preparation, submission support & lifecycle maintenance for authorities.",
    link: "/drug-master-file",
    icon: <FaFileAlt />
  },
  {
    title: "Quality Control",
    desc: "Analytical testing, method validation and QC program implementation to ensure product integrity.",
    link: "/quality-control",
    icon: <FaVials />
  },
  {
    title: "Chemical Impurity",
    desc: "Impurity profiling, risk assessment and practical mitigation strategies for regulatory submissions.",
    link: "/chemical-impurities",
    icon: <FaFlask />
  },
  {
    title: "Software Solutions",
    desc: "Validated software systems and integration services for labs, manufacturing and quality workflows.",
    link: "/software-solution",
    icon: <FaLaptopCode />
  },
  {
    title: "New Facility - Projects",
    desc: "End-to-end project management for new facility construction, commissioning and validation.",
    link: "/facility-projects",
    icon: <FaBuilding />
  },
  {
    title: "New Incorporation Mergers",
    desc: "Advisory services for company incorporation, mergers, & regulatory structuring to improve growth.",
    link: "/incorporation-mergers",
    icon: <FaHandshake />
  },
  {
    title: "Engineering Services",
    desc: "Facility design, utilities engineering and equipment qualification for compliant operations.",
    link: "/engineering",
    icon: <FaTools />
  },
  {
    title: "Human Resource",
    desc: "Recruitment, competency development and HR policies tailored to pharmaceutical operations.",
    link: "/human-resource",
    icon: <FaUsers />
  },
  {
    title: "Buyer & Sellers",
    desc: "Mergers & acquisitions support, valuations and brokerage services for buyers and sellers.",
    link: "/buyer-sellers",
    icon: <FaExchangeAlt />
  },
  {
    title: "Safety Services",
    desc: "Health, safety and environmental compliance audits, risk assessments and staff training.",
    link: "/safety",
    icon: <FaShieldAlt />
  }
];

class ServicesSliderSection extends Component {

  render() {

    const settings = {
      dots: false,
      infinite: true,
      speed: 800,
      autoplay: true,
      autoplaySpeed: 3000,
      slidesToShow: 3,
      slidesToScroll: 1,
      responsive: [
        {
          breakpoint: 991,
          settings: { slidesToShow: 2 }
        },
        {
          breakpoint: 591,
          settings: { slidesToShow: 1 }
        }
      ]
    };

    return (
      <>
        <section className="section-area section-sp1 service-wraper">
          <div className="row align-items-center">

            {/* Left Content */}
            <div className="col-xl-4 col-lg-7 mb-30">
              <div className="heading-bx">
                <h6 className="title-ext text-secondary">Services</h6>
                <h2 className="title">We Cover A Big Variety Of Medical Services</h2>
                <p>
                  From Green field projects to established manufacturers,
                  we provide practical inspection-ready solutions aligned with global standards.
                </p>
              </div>
              <Link to="/services" className="btn btn-secondary btn-lg shadow">
                All Services
              </Link>
            </div>

            {/* Slider */}
            <div className="col-xl-8 mb-15">
              <Slider {...settings} className="service-slide slick-arrow-none">

                {services.map((item, index) => (
                  <div className="slider-item" key={index}>
                    <div className="feature-container feature-bx2 feature1 service-card">

                      <div className="feature-box-xl mb-20">
                        <span className="icon-cell service-icon">
                          {item.icon}
                        </span>
                      </div>

                      <div className="icon-content">
                        <h3 className="ttr-title">{item.title}</h3>
                        <p>{item.desc}</p>
                        <Link to={item.link} className="btn btn-primary light">
                          View More
                        </Link>
                      </div>

                    </div>
                  </div>
                ))}

              </Slider>
            </div>

          </div>

          {/* Shapes */}
          <img className="pt-img1 animate-rotate" src={lineCircleBlue} alt="" />
          <img className="pt-img2 animate2" src={squareDotsOrange} alt="" />
          <img className="pt-img3 animate-wave" src={waveBlue} alt="" />
          <img className="pt-img4 animate1" src={squareRotate} alt="" />

        </section>
      </>
    );
  }
}

export default ServicesSliderSection;