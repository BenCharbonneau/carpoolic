import React, { Component } from 'react';
import DeleteRide from '../DeleteRide';
import EditButton from '../EditButton';
import RemovePassButton from '../RemovePassButton';
import './style.css';

class ShowRide extends Component {
	constructor() {
		super();
		this.state = {
			ride: {
				pickup_date: '',
				pickup_time: ''
			},
			driver: {},
			passengers: [],
			message: '',
			//The data to show on the show page. This can be overridden by props.
			fields: ['name','pickup','destination','pickup_time','driver','passengers','delete','edit', 'addPass']
		}
	}
	componentDidMount() {
		//Get information for the ride to show from the server
		this.getRide()
		.then(() => {
			if (this.props.fields) {
				this.setState({fields: this.props.fields});
			}
		})
		.catch((err) => {
			console.log(err);
		})
	}
	getRide = async (response) => {
		//set up any messages that need to be displayed
		let message;
    	if (response && response.message) message = response.message

		const rideId = this.props.rideId;

		//get the ride from the server
		const rideJSON = await fetch(process.env.REACT_APP_DEV_API_URL+'rides/' + rideId, {
			credentials: 'include'
		})

		const ride = await rideJSON.json();
		
		const users = ride.passenger_ids;

		//separate out the driver and the passengers from the users list for the ride
		let driver = users.find((user) => {
			return user.id === ride.found_ride.driver_user_id
		})

		if (!driver) driver = {};

		const passengers = users.filter((user) => {
			return user !== driver;
		})

		//format the date and time data
		ride.found_ride.pickup_time = this.fmtTime(ride.found_ride.pickup_time);
		ride.found_ride.pickup_date = this.fmtDate(ride.found_ride.pickup_date);

		//add the ride to state
		this.setState({ride: ride.found_ride, driver: driver, passengers: passengers, message: message});
	}
	addPassenger = async () => {
		//add a passenger to the ride
		const rideId = this.props.rideId;
		const userId = this.props.userId

		const addPassJSON = await fetch(process.env.REACT_APP_DEV_API_URL+'rides/' + rideId + '/adduser/' + userId, {
			credentials: 'include',
			method: 'PUT'
		})

		const addPass = await addPassJSON.json();

		await this.getRide(addPass);
	}
	fmtTime = (time) => {
		let hour = parseInt(time.slice(0,2),10);
		let AMPM;
		if (hour === 0) {
			hour = 12;
			AMPM = " AM";
		}
		else if (hour > 12) {
			hour = hour - 12;
			AMPM = " PM";
		}
		else {
			AMPM = " AM";
		}

		return hour + time.slice(2) + AMPM;
	}
	fmtDate = (date) => {
		const year = date.slice(0,4);

		return date.slice(5) + "-" + year;
	}
	render() {

		const ride = this.state.ride

		const fields = this.state.fields;

		//determine if the current user is the driver or the passenger
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