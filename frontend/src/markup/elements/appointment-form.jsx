import React, { Component } from 'react';

class appointmentForm extends Component{
	render(){
		return(
			<>
				
				<div className="appointment-form form-wraper">
					<h3 className="title">Quick Contact</h3>
					<form action="#">
						<div className="form-group">
							<input type="text" className="form-control" placeholder='Full Name'/>
						</div>
						<div className="form-group">
							<input type="email" className="form-control" placeholder="Email ID"/>
						</div>
						<div className="form-group">
							<input type="text" className="form-control" placeholder="Phone Number"/>
						</div>
						<div className="form-group">
							<input type="text" className="form-control" placeholder="Subject"/>
						</div>
						<div className="form-group">
							<textarea name="message" required className="form-control" placeholder="Type Message"></textarea>
						</div>
						<button type="submit" className="btn btn-secondary btn-lg">Submit Now</button>
					</form>
				</div>
			
			</>
		);
	}
}

export default appointmentForm;