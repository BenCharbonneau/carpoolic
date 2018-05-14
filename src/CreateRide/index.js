import React, { Component } from 'react';
import './style.css';

class CreateRide extends Component {
	constructor() {
		super();
		this.state = {
			users: [],
			autoCompUsers: [],
			driverInpLength: 0
		}
	}
	componentDidMount() {
		this.getUsers().catch((err) => {
			console.log(err);
		})
	}
	getUsers = async () => {
		// const usersJSON = await fetch('database users',{
		// 	credentials: 'include'
		// })

		const users = {
			success: true,
			users: [
				{
					id: 1,
					username: 'Kevin'
				},{
					id: 2,
					username: 'Sam'
				}
			]
		}

		this.setState({users: users.users})

	}
	handleChange = async (e) => {
		const name = e.currentTarget.value
		let i = 0
		const autoCompUsers = [];
		for (let user of this.state.users) {
			if (user.username.substr(0,name.length).toUpperCase() === name.toUpperCase()) {
				if (i < 10) {
					autoCompUsers.push(user)
				}
				i++;
			}
		}

		this.setState({autoCompUsers: autoCompUsers, driverInpLength: name.length});
	}
	saveDriverValue = (e) => {
		console.log(e.currentTarget.children);

		document.getElementById('driver').value = e.currentTarget.children[1].value

		this.setState({autoCompUsers: [], driverInpLength: 0})
	}
	clearAutoComp = (e) => {
		console.log(e.target);
		if (e.target.id !== 'driver') {
			this.setState({autoCompUsers: [], driverInpLength: 0})
		}
	}
	render() {

		const inpL = this.state.driverInpLength;
		let autoComp = this.state.autoCompUsers.map((user) => {
			return (
				<div key={user.id} onClick={this.saveDriverValue}>
					<strong>{user.username.substr(0,inpL)}</strong>{user.username.substr(inpL)}
					<input type="hidden" value={user.username} onClick={this.saveDriverValue} />
				</div>
			);
		})

		autoComp = ( <div className="autocomplete-items">{autoComp}</div>)

		return (
			<form onClick={this.clearAutoComp}>
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
					<input name="pickup_date" type="date" placeholder="Pickup date"/>
				</label>
				<label>Pickup time:
					<input name="pickup_time" type="time" placeholder="Pickup time"/>
				</label>
				<div className="driver-container">
					<label>Driver:</label>
					<div className="autocomplete">
						<input name="driver_user_id" id="driver" type="text" autoComplete="off" onChange={this.handleChange} />
						{autoComp}
					</div>
				</div>
				<label>Number of available seats:
					<input name="passenger_slots" type="number" placeholder="Available seats"/>
				</label>
				<input type="submit" value="Create Ride" />
			</form>
		);
	}
}

export default CreateRide;