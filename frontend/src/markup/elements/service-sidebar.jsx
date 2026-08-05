import React from 'react';
import { Link } from 'react-router-dom';

const ServiceSidebar = ({active}) => {
    return (
        <aside className="sticky-top pb-1">
            <div className="widget">
                <ul className="service-menu">
                    <li className={active==='gmp-consulting' ? 'active' : ''}><Link to="/gmp-consulting"><span>GMP Consulting</span><i className="fa fa-angle-right"></i></Link></li>
                    <li className={active==='manufacturing' ? 'active' : ''}><Link to="/manufacturing"><span>Manufacturing</span><i className="fa fa-angle-right"></i></Link></li>
                    <li className={active==='drug-master-file' ? 'active' : ''}><Link to="/drug-master-file"><span>Drug Master File</span><i className="fa fa-angle-right"></i></Link></li>
                    <li className={active==='quality-control' ? 'active' : ''}><Link to="/quality-control"><span>Quality Control</span><i className="fa fa-angle-right"></i></Link></li>
                    <li className={active==='chemical-impurities' ? 'active' : ''}><Link to="/chemical-impurities"><span>Chemical Impurity</span><i className="fa fa-angle-right"></i></Link></li>
                    <li className={active==='software-solution' ? 'active' : ''}><Link to="/software-solution"><span>Software Solutions</span><i className="fa fa-angle-right"></i></Link></li>
                    <li className={active==='facility-projects' ? 'active' : ''}><Link to="/facility-projects"><span>Facility Projects</span><i className="fa fa-angle-right"></i></Link></li>
                    <li className={active==='incorporation-mergers' ? 'active' : ''}><Link to="/incorporation-mergers"><span>Incorporation & Mergers</span><i className="fa fa-angle-right"></i></Link></li>
                    <li className={active==='engineering' ? 'active' : ''}><Link to="/engineering"><span>Engineering</span><i className="fa fa-angle-right"></i></Link></li>
                    <li className={active==='human-resource' ? 'active' : ''}><Link to="/human-resource"><span>Human Resource</span><i className="fa fa-angle-right"></i></Link></li>
                    <li className={active==='buyer-sellers' ? 'active' : ''}><Link to="/buyer-sellers"><span>Buyer / Sellers</span><i className="fa fa-angle-right"></i></Link></li>
                    <li className={active==='safety' ? 'active' : ''}><Link to="/safety"><span>Safety</span><i className="fa fa-angle-right"></i></Link></li>
                </ul>
            </div>
        </aside>
    );
}

export default ServiceSidebar;
