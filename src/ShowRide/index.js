import React, { Component } from 'react';
import DeleteRide from '../DeleteRide';
import EditButton from '../EditButton';
import RemovePassButton from '../RemovePassButton';
import './style.css';

class ShowRide extends Component {
	constructor() {
		super();
		this.state = {
			ride: {},
			driver: {},
			passengers: [],
			message: '',
			fields: ['name','pickup','destination','pickup_time','driver','passengers','delete','edit', 'addPass']
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
	getRide = async (response) => {
		let message;
    	if (response && response.message) message = response.message

		const rideId = this.props.rideId;

		const rideJSON = await fetch('http://localhost:9292/rides/' + rideId, {
			credentials: 'include'
		})

		const ride = await rideJSON.json();
		
		const users = ride.passenger_ids;

		let driver = users.find((user) => {
			return user.id === ride.found_ride.driver_user_id
		})

		if (!driver) driver = {};

		const passengers = users.filter((user) => {
			return user !== driver;
		})

		this.setState({ride: ride.found_ride, driver: driver, passengers: passengers, message: message});
	}
	addPassenger = async () => {

		const rideId = this.props.rideId;
		const userId = this.props.userId

		const addPassJSON = await fetch('http://localhost:9292/rides/' + rideId + '/adduser/' + userId, {
			credentials: 'include',
			method: 'PUT'
		})

		const addPass = await addPassJSON.json();

		await this.getRide(addPass);
	}
	render() {

		const ride = this.state.ride
		const fields = this.state.fields;

		const driver = (ride.driver_user_id === this.props.userId) ? "You" : this.state.driver.username;
		let isPassenger = false;
		const passengers = this.state.passengers.map((passenger) => {
			if (this.props.userId === passenger.id) {
				isPassenger = true;
			}
			return (
				<li key={passenger.id}>
					{passenger.username}
					{(this.props.userId === passenger.id) ? <RemovePassButton userId={passenger.id} rideId={ride.id} reState={this.getRide} /> : '' }
				</li>
			);
		})
		return (
			<tr className={this.props.cssClass} onClick={this.props.rowClick} id={ride.id}>
				{ this.state.message ? <td>{this.state.message}</td>:<td className="hidden"></td>}
				{ fields.includes('name') ? <td><strong>{ride.name}</strong></td> : <td className="hidden"></td> }
		    	{ fields.includes('pickup') ? <td><span>Pickup Location:</span> {ride.pickup}</td> : <td className="hidden"></td> }
		    	{ fields.includes('destination') ? <td><span>Destination:</span> {ride.destination}</td> : <td className="hidden"></td> }
		    	{ fields.includes('pickup_time') ? <td><span>Pickup Time:</span> {ride.pickup_date} {ride.pickup_time}</td> : <td className="hidden"></td> }
		    	{ fields.includes('passengers') ? <td><span>Available Seats:</span> {ride.passenger_slots}</td> : <td className="hidden"></td> }
		    	{ fields.includes('driver') ? <td><span>Driver:</span> {driver}</td> : <td className="hidden"></td> }
		    	{ fields.includes('passengers') ? <td><p>Passengers:</p><ul>{passengers}</ul></td> : <td className="hidden"></td> }
		    	{ fields.includes('edit') && (driver === "You") ? <td className="btn-data"><EditButton rideId={ride.id} close={this.getRide} btnText="Edit" /></td> : <td className="hidden"></td> }
		    	{ fields.includes('delete') && (driver === "You") ? <td className="btn-data"><DeleteRide id={ride.id} reState={this.props.close} /></td> : <td className="hidden"></td> }
		    	{ (fields.includes('addPass') && (driver !== "You") && !isPassenger) ? <td><button id={ride.id} onClick={this.addPassenger}>Claim Seat in this Ride</button></td> : <td className="hidden"></td> }
		    </tr>
	    );
	}
}

export default ShowRide;