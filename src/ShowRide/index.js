import React, { Component } from 'react';
import DeleteRide from '../DeleteRide';
import EditButton from '../EditButton';
import RemovePassButton from '../RemovePassButton';

class ShowRide extends Component {
	constructor() {
		super();
		this.state = {
			ride: {},
			driver: {},
			passengers: [],
			fields: ['name','pickup','destination','pickup_time','driver','passengers','delete','edit','ok']
		}
	}
	componentDidMount() {

		this.getRide()
		.then(() => {
			//let fields;
			if (this.props.fields) {
				//fields = this.state.fields.filter(field => !this.props.exclude.includes(field));
				this.setState({fields: this.props.fields});
			}

		})
		.catch((err) => {
			console.log(err);
		})
	}
	getRide = async () => {
		const rideId = this.props.rideId;

		const rideJSON = await fetch('http://localhost:9292/rides/' + rideId, {
			credentials: 'include'
		})

		const ride = await rideJSON.json();
		
		const users = ride.passenger_ids;

		const driver = users.find((user) => {
			return user.id === ride.found_ride.driver_user_id
		})

		const passengers = users.filter((user) => {
			return user !== driver;
		})

		console.log(ride, " this is ride from state")
		console.log(driver, " this is driver from state")
		console.log(passengers, " this is passengers from state")
		this.setState({ride: ride.found_ride, driver: driver, passengers: passengers});
	}
	render() {

		const ride = this.state.ride
		const fields = this.state.fields;

		const driver = (ride.driver_user_id === this.props.userId) ? "You" : this.state.driver.username
		const passengers = this.state.passengers.map((passenger) => {
			return (
				<li key={passenger.id}>
					{passenger.username}
					{(this.props.userId === passenger.id) ? <RemovePassButton id={passenger.id} reState={this.getRide} /> : '' }
				</li>
			);
		})

		return (

			<div>
				{ fields.includes('name') ? <p><strong>{ride.name}</strong></p> : '' }
		    	{ fields.includes('pickup') ? <p>Pickup Location: {ride.pickup}</p> : '' }
		    	{ fields.includes('destination') ? <p>Destination: {ride.destination}</p> : '' }
		    	{ fields.includes('pickup_time') ? <p>Pickup Time: {ride.pickup_date} {ride.pickup_time}</p> : '' }
		    	{ fields.includes('passengers') ? <p>Available Seats: {ride.passenger_slots}</p> : '' }
		    	{ fields.includes('driver') ? <p>Driver: {driver}</p> : '' }
		    	{ fields.includes('passengers') ? <div><p>Passengers:</p><ul>{passengers}</ul></div> : '' }
		    	{ fields.includes('edit') && (driver === "You") ? <EditButton rideId={ride.id} close={this.getRide} btnText="Edit" /> : '' }
		    	{ fields.includes('delete') && (driver === "You") ? <DeleteRide id={ride.id} reState={this.props.close} /> : '' }
		    	{ fields.includes('ok') ? <button onClick={this.props.close}>OK</button> : '' }
		    </div>
	    );
	}
}

export default ShowRide;