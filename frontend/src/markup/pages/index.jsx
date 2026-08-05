import React from 'react';

// Elements
import MainBannerSection from "../elements/main-banner";
import AboutSection from "../elements/about";
import WorkSection from "../elements/work";
import AppointmentSection from "../elements/appointment";
import ServicesSliderSection from "../elements/services-slider";

function Index(){
	
	return(
		<>
			
			<MainBannerSection />
			
			<AboutSection />
			
			<WorkSection />
			
			<AppointmentSection />
			
			<ServicesSliderSection />
			
		</>
		
	);
}

export default Index;