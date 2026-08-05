import React, { Component } from 'react';
import { BrowserRouter, Routes, Route, Outlet, Navigate } from "react-router-dom";

// Elements
import BackToTop from './elements/back-top';
import PageScrollTop from './elements/page-scroll-top';

// Layout
import Header from "./layout/header";
import Footer from "./layout/footer";

// All Pages Router
import Index from './pages/index';
import AboutUs from './pages/about-us';
import Team from './pages/team';
import Services from './pages/services';
import ServiceDetail from './pages/service-detail';
import GmpConsulting from './pages/gmp-consulting';
import Manufacturing from './pages/manufacturing';
import DrugMasterFile from './pages/drug-master-file';
import QualityControl from './pages/quality-control';
import ChemicalImpurities from './pages/chemical-impurities';
import SoftwareSolution from './pages/software-solution';
import FacilityProjects from './pages/facility-projects';
import IncorporationMergers from './pages/incorporation-mergers';
import Engineering from './pages/engineering';
import HumanResource from './pages/human-resource';
import BuyerSellers from './pages/buyer-sellers';
import Safety from './pages/safety';
import FormLogin from './pages/form-login';
import FormRegister from './pages/form-register';
import FormForgetPassword from './pages/form-forget-password';
import CustomerDashboard from './pages/customer-dashboard';
import Faq from './pages/faq';
import ContactUs from './pages/contact-us';
import Booking from './pages/booking';
import BlogGrid from './pages/blog-grid';
import BlogDetails from './pages/blog-details';
import Error from './pages/error-404';

class Markup extends Component{
	render(){
		return(
			<>	
			
				{/* {<BrowserRouter basename={'/react/'}> */}
				<BrowserRouter>
					
					<Routes>
						
						<Route element={<ThemeLayout />}>
							<Route path='/' element={<Index />} />
							<Route path='/about-us' element={<AboutUs />} />
							<Route path='/team' element={<Team />} />
							<Route path='/services' element={<Services />} />
							<Route path='/service-detail' element={<ServiceDetail />} />
							<Route path='/gmp-consulting' element={<GmpConsulting />} />
							<Route path='/manufacturing' element={<Manufacturing />} />
							<Route path='/drug-master-file' element={<DrugMasterFile />} />
							<Route path='/quality-control' element={<QualityControl />} />
							<Route path='/chemical-impurities' element={<ChemicalImpurities />} />
							<Route path='/software-solution' element={<SoftwareSolution />} />
							<Route path='/facility-projects' element={<FacilityProjects />} />
							<Route path='/incorporation-mergers' element={<IncorporationMergers />} />
							<Route path='/engineering' element={<Engineering />} />
							<Route path='/human-resource' element={<HumanResource />} />
							<Route path='/buyer-sellers' element={<BuyerSellers />} />
							<Route path='/safety' element={<Safety />} />
							<Route path='/faq' element={<Faq />} />
							<Route path='/contact-us' element={<ContactUs />} />
							<Route path='/booking' element={<Booking />} />
							<Route path='/blog-grid' element={<BlogGrid />} />
							<Route path='/blog-details' element={<BlogDetails />} />
							<Route path="/form-login" element={<Navigate to="/login" replace />} />
							<Route path="/login" element={<FormLogin />} />
							<Route path="/form-register" element={<FormRegister />} />
							<Route path="/customer/dashboard" element={<CustomerDashboard />} />
							<Route path='/form-forget-password' element={<FormForgetPassword />} />
							<Route path="*" element={<Error />} />
						</Route>
				
					</Routes>
					
					<PageScrollTop />
					
				</BrowserRouter>
				
				<BackToTop />
				
			</>
		);
	}
}
function ThemeLayout(){
	return(
		<div className="site-wrapper">
			<Header />
			<main className="site-content">
				<Outlet />
			</main>
			<Footer />
		</div>
	);
}
export default Markup;