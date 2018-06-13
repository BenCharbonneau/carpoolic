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
		//get the ride information from the server and save it to state
		this.getRide().catch((err) => {
			console.log(err);
		})
	}
	getRide = async () => {
		//get the ride information from the server
		const rideJSON = await fetch(process.env.REACT_APP_DEV_API_URL+'rides/'+this.props.id,{
			credentials: 'include'
		})

		const ride = await rideJSON.json();

		const users = ride.passenger_ids

		//split out the users for the ride into the driver and the passengers
		const driver = users.find((user) => {
			return user.id === ride.found_ride.driver_user_id
		})

		const passengers = users.filter((user) => {
			return user !== driver;
		})

		//add the ride to state
		this.setState({ride: ride.found_ride, driver: driver, passengers: passengers});
	}
	handleSubmit = async (e) => {
		e.preventDefault();

		//make sure that we don't submit updates if the user just removes a passenger
		const submitElem = document.activeElement
		if (submitElem.tagName === 'BUTTON' && submitElem.innerText === 'X') {
			return false;
		}

		//get the user's inputs from the form
		const labels = e.currentTarget.children;
		let input;
		let body = {};
		for (let label of labels) {
			input = label.children[0]
			if (input && input.name && !input.disabled) {
				body[input.name] = input.value;
			}
		}

		//send the updates to the server
		const responseJSON = await fetch(process.env.REACT_APP_DEV_API_URL+'rides/'+this.props.id,{
			credentials: 'include',
			method: 'PUT',
			body: JSON.stringify(body)
		})

		const response = responseJSON.json();

		//close the edit modal and show any messages from the server
		this.props.close(response);
	}
	handleChange = (e) => {
		//update state with any changes that the user is making in the form
		const name = e.currentTarget.name;

		if (name === 'passenger_slots') {
			this.verifyPassengers(e);
		}

		const value = e.currentTarget.value;
		const ride = Object.assign(this.state.ride);
		ride[name] = value

		this.setState({ ride: ride });
	}
	verifyPassengers = (e) => {
		//Verify that the user doesn't set the number of passengers below 0
		const input = e.currentTarget;
		const label = e.currentTarget.parentElement;

		if (label.children.length > 1) {
			label.children[1].remove();
		}

		if (input.value < 1) {
			//If the user sets the passenger slots value too low, show an error message
			input.value = '';

			const div = document.createElement('div');
			div.classList.add("form-alert");
			div.innerText = "The passenger slots must be greater than 0.";

			label.appendChild(div);
		}
	}
	render() {
		const ride = this.state.ride;

		//build the list of passengers for the ride
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
					<input className="modal-btn" type="submit" value="Submit Updates" />
				</form>
				<DeleteRide id={ride.id} reState={this.props.close} />
			</div>
		);
	}
}

export default EditRide;