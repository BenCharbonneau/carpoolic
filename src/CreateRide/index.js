import React, { Component } from 'react';
import './style.css';
import '../App.css'

class CreateRide extends Component {
	constructor() {
		super();
		this.state = {
			users: [],
			autoCompUsers: [],
			driverInpLength: 0,
			currentUser: {
				username: ''
			}
		}
	}
	componentDidMount() {
		this.getUsers().catch((err) => {
			console.log(err);
		})
	}
	getUsers = async () => {
		const usersJSON = await fetch(process.env.REACT_APP_DEV_API_URL+'users',{
			credentials: 'include',
		})

		const users = await usersJSON.json();

		const driver = users.users.find((user) => {
			return user.id === this.props.userId
		})

		this.setState({currentUser: driver, users: users.users})
	}
	verifyDate = (e) => {
		const input = e.currentTarget;
		const label = input.parentElement;

		if (label.children.length > 1) {
			label.children[1].remove();
		}


		const date = new Date(this.fmtDate(input.value));
		const today = new Date();
		today.setHours(0,0,0,0);

		if (today.getTime() > date.getTime()) {

			const div = document.createElement('div');
			div.classList.add("form-alert");
			div.innerText = "The date must be a future date.";

			label.appendChild(div);
		}
	}
	fmtDate = (date) => {
		const year = date.slice(0,4);

		return date.slice(5) + "-" + year;
	}
	verifyPassengers = (e) => {
		const input = e.currentTarget;
		const label = e.currentTarget.parentElement;

		if (label.children.length > 1) {
			label.children[1].remove();
		}

		if (input.value < 1) {
			input.value = 1;

			const div = document.createElement('div');
			div.classList.add("form-alert");
			div.innerText = "The passenger slots must be greater than 0.";

			label.appendChild(div);
		}
	}
	// handleChange = async (e) => {
	// 	const name = e.currentTarget.value
	// 	let i = 0
	// 	const autoCompUsers = [];
	// 	for (let user of this.state.users) {
	// 		if (user.username.substr(0,name.length).toUpperCase() === name.toUpperCase()) {
	// 			if (i < 10) {
	// 				autoCompUsers.push(user)
	// 			}
	// 			i++;
	// 		}
	// 	}

	// 	this.setState({autoCompUsers: autoCompUsers, driverInpLength: name.length});
	// }
	handleSubmit = async (e) => {
		e.preventDefault();

		const labels = e.currentTarget.children;
		let input;
		let body = {};
		for (let label of labels) {
			input = label.children[0]
			if (input && input.name) {
				body[input.name] = input.value;
				input.value = "";
			}
		}
		
		// const driverInp = document.getElementById('driver')
		// const driverUsrnm = driverInp.value;
		// //driverInp.value = "";
		// const driver = this.state.users.find((user) => {
		// 	return user.username === driverUsrnm
		// })

		// if (driver) {
		// 	body['driver_user_id'] = driver.id;
		// }

		body['driver_user_id'] = this.state.currentUser.id;

		const responseJSON = await fetch(process.env.REACT_APP_DEV_API_URL+'rides',{
			credentials: 'include',
			method: "POST",
			body: JSON.stringify(body)
		})

		const response = await responseJSON.json();

		this.props.close(response);
	}
	saveDriverValue = (e) => {

		document.getElementById('driver').value = e.currentTarget.children[1].value

		this.setState({autoCompUsers: [], driverInpLength: 0})
	}
	clearAutoComp = (e) => {
		if (e.target.id !== 'driver') {
			this.setState({autoCompUsers: [], driverInpLength: 0})
		}
	}

	render() {
	
		// const inpL = this.state.driverInpLength;
		// let autoComp = this.state.autoCompUsers.map((user) => {
		// 	return (
		// 		<div key={user.id} onClick={this.saveDriverValue}>
		// 			<strong>{user.username.substr(0,inpL)}</strong>{user.username.substr(inpL)}
		// 			<input type="hidden" value={user.username} onClick={this.saveDriverValue} />
		// 		</div>
		// 	);
		// })

		// autoComp = ( <div className="autocomplete-items">{autoComp}</div>)

		return (
			<form onSubmit={this.handleSubmit}>
				<h3>Create your ride</h3>
				<label>Ride name:
					<input name="name" type="text" placeholder="Ride name"/>
				</label>
				<label>Pickup location:
					<input name="pickup" type="text" placeholder="Pickup location"/>
				</label>
				<label>Destination:
					<input name="destination" type="text" placeholder="Destination"/>
				</label>
				<label>Pickup date:
					<input name="pickup_date" type="date" onChange={this.verifyDate} placeholder="Pickup date"/>
				</label>
				<label>Pickup time:
					<input name="pickup_time" type="time" placeholder="Pickup time"/>
				</label>
				<div>
					Driver: {this.state.currentUser.username}
				</div>
				<label>Number of available seats:
					<input name="passenger_slots" type="number" onChange={this.verifyPassengers} placeholder="Available seats"/>
				</label>
				<input className="modal-btn" type="submit" value="Create Ride" />
			</form>
		);
	}
}

export default CreateRide;