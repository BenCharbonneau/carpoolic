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
		const rideJSON = await fetch('http://localhost:9292/rides/'+this.props.id,{
			credentials: 'include'
		})

		const ride = await rideJSON.json();

		const users = ride.passenger_ids

		const driver = users.find((user) => {
			return user.id === ride.found_ride.driver_user_id
		})

		const passengers = users.filter((user) => {
			return user !== driver;
		})

		this.setState({ride: ride.found_ride, driver: driver, passengers: passengers});
	}
	handleSubmit = async (e) => {
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

		const responseJSON = await fetch("http://localhost:9292/rides/"+this.props.id,{
			credentials: 'include',
			method: 'PUT',
			body: JSON.stringify(body)
		})

		const response = responseJSON.json();

		this.props.close(response);
	}
	handleChange = (e) => {
		const name = e.currentTarget.name;
		const value = e.currentTarget.value;
		const ride = this.state.ride;
		ride[name] = value

		this.setState({ ride: ride });
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
					<p>To change the ride name, driver, destination, or pickup date, you must cancel this ride and create a new one.</p>
					<label>Ride name:
						<p>{ride.name}</p>
					</label>
					<label>Pickup location:
						<input name="pickup" type="text" placeholder="Pickup location" value={ride.pickup} onChange={this.handleChange}/>
					</label>
					<label>Destination:
						<p>{ride.destination}</p>
					</label>
					<label>Pickup date:
						<p>{ride.pickup_date}</p>
					</label>
					<label>Pickup time:
						<input name="pickup_time" type="time" placeholder="Pickup time" value={ride.pickup_time} onChange={this.handleChange}/>
					</label>
					<label>Driver:
						<p>{this.state.driver.username}</p>
					</label>
					<label>Number of available seats:
						<input name="passenger_slots" type="number" placeholder="Available seats" value={ride.passenger_slots} onChange={this.handleChange}/>
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