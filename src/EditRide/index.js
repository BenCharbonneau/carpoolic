import React, { Component } from 'react';
import DeleteRide from '../DeleteRide';
import RemovePassButton from '../RemovePassButton';

class EditRide extends Component {
	constructor() {
		super();
		this.state = {
			ride: {
				name: '',
				pickup: '',
				destination: '',
				pickup_date: '',
				pickup_time: '',
				driver_user_id: -1,
				passenger_slots: 0
			},
			driver: {
				username: ''
			},
			passengers: []
		}
	}
	componentDidMount() {
		this.getRide().catch((err) => {
			console.log(err);
		})
	}
	getRide = async () => {
		// const rideJSON = await fetch('database rides/'+this.props.id,{
		// 	credentials: 'include'
		// })

		// const ride = await rideJSON.json();

		const ride = {
			success: true,
			ride: {
				id: 1,
				name: 'Awesome sauce, the ride',
				pickup: 'Wrigley',
				destination: 'Soldier Field',
				pickup_date: '1/1/2019',
				pickup_time: '6:00 AM',
				driver_user_id: 1,
				passenger_slots: 4
			}
		}

		//const users = fetch

		const users = [{id:1,name:'Ben', username: 'Ben'},{id:2,name:'Jim', username: 'Jim'}];

		const driver = users.find((user) => {
			return user.id === ride.ride.driver_user_id
		})

		const passengers = users.filter((user) => {
			return user !== driver;
		})

		this.setState({ride: ride.ride, driver: driver, passengers: passengers});
	}
	handleSubmit = (e) => {
		e.preventDefault();

		const submitElem = document.activeElement
		if (submitElem.tagName === 'BUTTON' && submitElem.innerText === 'X') {
			return false;
		}

		const labels = e.currentTarget.children;
		let input;
		let body = {};
		for (let label of labels) {
			input = label.children[0]
			if (input && input.name && !input.disabled) {
				body[input.name] = input.value;
			}
		}
		
		//await fetch PUT

		this.props.close();
	}
	render() {
		const ride = this.state.ride;

		const passengers = this.state.passengers.map((passenger) => {
			return (
				<li key={passenger.id}>
					{passenger.name}
					<RemovePassButton id={passenger.id} reState={this.getRide} />
				</li>
			);
		})

		return (
			<div>
				<form onSubmit={this.handleSubmit}>
					<h3>Edit your ride</h3>
					<p>To change the driver, destination, or pickup date, you must cancel this ride and create a new one.</p>
					<label>Ride name:
						<input name="name" type="text" placeholder="Ride name" value={ride.name}/>
					</label>
					<label>Pickup location:
						<input name="pickup" type="text" placeholder="Pickup location" value={ride.pickup}/>
					</label>
					<label>Destination:
						<input name="destination" type="text" disabled="disabled" value={ride.destination}/>
					</label>
					<label>Pickup date:
						<input name="pickup_date" type="date" disabled="disabled" value={ride.pickup_date}/>
					</label>
					<label>Pickup time:
						<input name="pickup_time" type="time" placeholder="Pickup time" value={ride.pickup_time}/>
					</label>
					<label>Driver:
						<input name="driver_user_id" type="text" disabled="disabled" value={this.state.driver.username}/>
					</label>
					<label>Number of available seats:
						<input name="passenger_slots" type="number" placeholder="Available seats" value={ride.passenger_slots}/>
					</label>
					<label>Passengers:
						<ul>
						{passengers}
						</ul>
					</label>
					<input type="submit" value="Submit Updates" />
				</form>
				<DeleteRide id={ride.id} reState={this.props.close} />
			</div>
		);
	}
}

export default EditRide;