import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Sticky from 'react-stickynode';
import { showLogoutNotice } from '../utils/logoutNotice';

// Images
import logo from '../../images/logo.png';
import logoWhite from '../../images/logo-white.png';

const Header = () => {
	
	const [isMenuOpen, setIsMenuOpen] = useState(false);
	const [isSearchFormOpen, setIsSearchBtn] = useState(false);
	const [isCustomerLoggedIn, setIsCustomerLoggedIn] = useState(false);
	const [customerProfile, setCustomerProfile] = useState(null);
	const quikSearchBtn = () => setIsSearchBtn(!isSearchFormOpen);
	const quikSearchClose = () => setIsSearchBtn(false);
	const [activeItem, setActiveItem] = useState(null);
	const [isMobileView, setIsMobileView] = useState(false);
	
	const toggleSubmenu = (item) => {
		setActiveItem(item === activeItem ? null : item);
	};
	
	const toggleMenu = () => {
		setIsMenuOpen((prev) => !prev);
	};

	
	// derive initials for simple avatar display
	const customerInitials = (() => {
		try {
			if (!customerProfile) return '';
			const name = customerProfile.fullName || customerProfile.username || '';
			const parts = name.trim().split(/\s+/).filter(Boolean);
			if (!parts.length) return '';
			if (parts.length === 1) return parts[0].slice(0,2).toUpperCase();
			return (parts[0][0] + parts[1][0]).toUpperCase();
		} catch (e) { return ''; }
	})();
	const handleMenuLinkClick = () => {
		if (window.innerWidth <= 991) {
			setIsMenuOpen(false);
		}
	};

	const handleContactBtnClick = () => {
		setIsMenuOpen(false);
		// Implement the logic to toggle the contact sidebar here.
	};

	const handleMenuCloseClick = () => {
		setIsMenuOpen(false);
	};
	

	
	useEffect(() => {
		const handleResize = () => {
			// consider mobile when width is <= 991 to match menu collapse behavior
			setIsMobileView(window.innerWidth <= 991);
		};

		// Check the screen size on initial render and whenever the window is resized
		handleResize();
		
		window.addEventListener('resize', handleResize);

		// check customer login status and profile
		setIsCustomerLoggedIn(!!localStorage.getItem('customer_token'));
		try { const p = localStorage.getItem('customer_profile'); setCustomerProfile(p ? JSON.parse(p) : null); } catch (err) { setCustomerProfile(null); }
		// listen to storage events in case of multi-tab
		const onStorage = (e) => {
			if (e.key === 'customer_token') {
				setIsCustomerLoggedIn(!!e.newValue);
			}
			if (e.key === 'customer_profile') {
				try { setCustomerProfile(e.newValue ? JSON.parse(e.newValue) : null); } catch (err) { setCustomerProfile(null); }
			}
		};
		window.addEventListener('storage', onStorage);
		// listen to custom profile update events in same tab
		const onProfile = () => {
			try { const p = localStorage.getItem('customer_profile'); setCustomerProfile(p ? JSON.parse(p) : null); } catch (err) { setCustomerProfile(null); }
			// also update logged-in flag when profile/token changes in same tab
			setIsCustomerLoggedIn(!!localStorage.getItem('customer_token'));
		};
		window.addEventListener('customer_profile_updated', onProfile);

		// Clean up the event listener on component unmount
		return () => {
			window.removeEventListener('resize', handleResize);
			window.removeEventListener('storage', onStorage);
			window.removeEventListener('customer_profile_updated', onProfile);
		};
	},[]);
	
	const menuItems = [
		{
			id: 'home',
			name: 'HOME',
			linkName: '#',
		},
		{
			id: 'aboutus',
			name: 'WHO WE ARE',
			linkName: 'about-us'
		},
		{
			id: 'services',
			name: 'SERVICES',
			linkName: 'services',
			
			subItems: [
				{
					id: 'gmpConsulting',
					displayName: 'GMP Consulting',
					linkName: 'gmp-consulting'
				},
				{
					id: 'manufacturing',
					displayName: 'Manufacturing',
					linkName: 'manufacturing'
				},
				{
					id: 'drugMasterFile',
					displayName: 'Drug Master File',
					linkName: 'drug-master-file'
				},
				{
					id: 'qualityControl',
					displayName: 'Quality Control',
					linkName: 'quality-control'
				},
				{
					id: 'chemicalImpurities',
					displayName: 'Chemical Impurities',
					linkName: 'chemical-impurities'
				},
				{
					id: 'softwareSolution',
					displayName: 'Software Solutions',
					linkName: 'software-solution'
				},
				{
					id: 'humanResource',
					displayName: 'Human Resource',
					linkName: 'human-resource'
				},
				{
					id: 'incorporationMergers',
					displayName: 'New Incorporation Mergers',
					linkName: 'incorporation-mergers'
				},
				{
					id: 'engineering',
					displayName: 'Engineering Services',
					linkName: 'engineering'
				},
				{
					id: 'buyerSellers',
					displayName: 'Buyer & Sellers',
					linkName: 'buyer-sellers'
				},
				{
					id: 'facilityProjects',
					displayName: 'New Facility - Projects',
					linkName: 'facility-projects'
				},
				{
					id: 'safety',
					displayName: 'Safety Services',
					linkName: 'safety'
				},
			]
		},
		{
			id: 'contactUs',
			name: 'CONTACT US',
			linkName: 'contact-us'
		}
	];
	
	return(
		<header className="header header-transparent rs-nav">
			<Sticky enabled={true} className="sticky-header navbar-expand-lg">
				<div className="menu-bar clearfix">
					<div className="container-fluid clearfix">
						<div className="menu-logo logo-dark">
							<Link to="/"><img src={logo} alt="" width="150"/></Link>
						</div>
						
						<button className={`navbar-toggler collapsed menuicon justify-content-end ${isMenuOpen ? 'open' : ''}`}
							type="button"
							onClick={toggleMenu}
							aria-label="Toggle navigation">
							<span></span>
							<span></span>
							<span></span>
						</button>

						<div className="secondary-menu">
							<ul>
								{!isCustomerLoggedIn ? (
									!isMobileView && (
										<li className="btn-area"><Link to="/login" className="btn btn-primary shadow">LOGIN <i className="btn-icon-bx fas fa-chevron-right"></i></Link></li>
									)
								) : (
									isMobileView && (
										<>
											<li className="btn-area d-flex align-items-center me-2">
												<Link to="/customer/dashboard" className="btn btn-outline-primary">MY ACCOUNT</Link>
											</li>
											<li className="btn-area"><button onClick={() => { showLogoutNotice(() => { setIsCustomerLoggedIn(false); window.location.href = '/'; }); }} className="btn btn-secondary">LOGOUT</button></li>
										</>
									)
								)}
							</ul>
						</div>
						
						<div className={`menu-links navbar-collapse collapse justify-content-end ${isMenuOpen ? 'show' : ''}`} id="menuDropdown">
							<div className="menu-logo">
								<Link to="/"><img src={logoWhite} alt=""/></Link>
							</div>
							
							<ul className="nav navbar-nav">	
								{menuItems.map((item) => (
									<React.Fragment key={item.id}>
										<li
											className={`${activeItem === item.id ? 'open' : ''}`}
											onClick={() => !isMobileView && toggleSubmenu(item.id)}
										>
											{item.subItems ? (
												<Link to={`/${item.linkName}`} onClick={handleMenuLinkClick}>
													{item.name}
													<i className={`fas fa-plus`}></i>
												</Link>
											) : (
												<Link to={`/${item.linkName}`} onClick={handleMenuLinkClick}>
													{item.name}
												</Link>
											)}
											{(isMobileView || activeItem === item.id) && item.subItems && (
												<ul className={`sub-menu ${item.id === 'services' ? 'two-col' : ''}`}>
													{item.subItems.map((subItem, index) => (
														<li key={subItem.id}><Link to={`/${subItem.linkName}`} onClick={handleMenuLinkClick}><span>{subItem.displayName}</span></Link></li>
													))}
												</ul>
											)}
										</li>
										{item.id === 'contactUs' && isCustomerLoggedIn && !isMobileView && (
											<>
												<li>
													<Link to="/customer/dashboard" onClick={handleMenuLinkClick} className="d-flex align-items-center">
														<span>MY ACCOUNT</span>
													</Link>
												</li>
												<li>
													<button onClick={() => { showLogoutNotice(() => { setIsCustomerLoggedIn(false); window.location.href = '/'; }); }} className="nav-link" style={{ color: "#fff" }}>LOGOUT</button>
												</li>
											</>
										)}
										{item.id === 'contactUs' && !isCustomerLoggedIn && isMobileView && (
											<li><Link to="/login" onClick={handleMenuLinkClick}>LOGIN</Link></li>
										)}
										
									</React.Fragment>
								))}
							</ul>
							
							<ul className="social-media">
								<li><a target="_blank" rel="noreferrer" href="https://www.facebook.com/" className="btn btn-primary"><i className="fab fa-facebook-f"></i></a></li>
								<li><a target="_blank" rel="noreferrer" href="https://www.google.com/" className="btn btn-primary"><i className="fab fa-google"></i></a></li>
								<li><a target="_blank" rel="noreferrer" href="https://www.linkedin.com/" className="btn btn-primary"><i className="fab fa-linkedin-in"></i></a></li>
								<li><a target="_blank" rel="noreferrer" href="https://twitter.com/" className="btn btn-primary"><i className="fab fa-twitter"></i></a></li>
							</ul>
							
							<div className="menu-close" onClick={handleMenuCloseClick}>
								<i className="ti-close"></i>
							</div>
							
						</div>
					</div>
				</div>
			</Sticky>
						
		</header>
	
	);
}

export default Header;