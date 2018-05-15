import React, { Component } from 'react';
import DeleteButton from '../DeleteButton';

class ShowRide extends Component {
	constructor() {
		super();
		this.state = {
			ride: {},
			driver: {},
			passengers: [],
			fields: ['name','pickup','destination','pickup_time','driver','passengers','delete','edit']
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
		// const rideJSON = await fetch('database rides/'+this.props.rideId,{
		// 	credentials: 'include'
		// })

		// const ride = await rideJSON.json();

		// const ride = {
		// 	success: true,
		// 	ride: {
		// 		id: 1,
		// 		name: 'Awesome sauce, the ride',
		// 		pickup: 'Wrigley',
		// 		destination: 'Soldier Field',
		// 		pickup_date: '1/1/2019',
		// 		pickup_time: '6:00 AM',
		// 		driver_user_id: 1,
		// 		passenger_slots: 4
		// 	}
		// }

		//const users = fetch

		const users = [{id:1,name:'Ben'},{id:2,name:'Jim'}];

		const driver = users.find((user) => {
			return user.id === ride.ride.driver_user_id
		})

		const passengers = users.filter((user) => {
			return user !== driver;
		})

		this.setState({ride: ride.ride, driver: driver, passengers: passengers});
	}
	render() {
		const ride = this.state.ride
		const fields = this.state.fields;
		const driver = (ride.driver_user_id === this.props.userId) ? "You" : this.state.driver.name
		const passengers = this.state.passengers.map((passenger) => {
			return (
				<li key={passenger.id}>
					{passenger.name}
				</li>
			);
		})

		return (
			<div>
				{ fields.includes('name') ? <p><strong>{ride.name}</strong></p> : '' }
		    	{ fields.includes('pickup') ? <p>Pickup Location: {ride.pickup}</p> : '' }
		    	{ fields.includes('destination') ? <p>Destination: {ride.destination}</p> : '' }
		    	{ fields.includes('pickup_time') ? <p>Pickup Time: {ride.pickup_date} {ride.pickup_time}</p> : '' }
		    	{ fields.includes('driver') ? <p>Driver: {driver}</p> : '' }
		    	{ fields.includes('passengers') ? <div><p>Passengers:</p><ul>{passengers}</ul></div> : '' }
		    	{ fields.includes('delete') && (driver === "You") ? <DeleteButton id={ride.id} reState={this.getRide} /> : '' }
		    </div>
	    );
	}
}

export default ShowRide;