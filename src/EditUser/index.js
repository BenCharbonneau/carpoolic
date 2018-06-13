import React, { Component } from 'react';
import DeleteUser from '../DeleteUser';
import '../App.css'

class EditUser extends Component {
	constructor() {
		super();
		this.state = {
			user: {
				username: '',
				email: ''
			}
		}
	}
	componentDidMount() {
		//get the user's information from the server and put it in state
		this.getUser().catch((err) => {
			console.log(err);
		})
	}
	getUser = async () => {
		//get the user's information from the server
		const userJSON = await fetch(process.env.REACT_APP_DEV_API_URL+'users/'+this.props.id,{
			credentials: 'include'
		})

		const user = await userJSON.json();

		//put the user's information in state
		this.setState({user: user.user});
	}
	handleChange = (e) => {
		//update state with any changes that the user makes to their information
		const body = Object.assign(this.state.user);
		body[e.currentTarget.name] = e.currentTarget.value;

		this.setState({ user: body })
	}
	handleSubmit = async (e) => {
		e.preventDefault();

		//get the user's inputs from the form
		const labels = e.currentTarget.children;
		let input;
		let body = {};
		for (let label of labels) {
			input = label.children[0]
			if (input && input.name) {
				body[input.name] = input.value;
			}
		}

		//send the updates to the server
		const responseJSON = await fetch(process.env.REACT_APP_DEV_API_URL+'users/'+this.props.id,{
			credentials: 'include',
			method: 'PUT',
			body: JSON.stringify(body)
		});

		const response = await responseJSON.json();

		//close the edit modal and send along any messages from the server
		this.props.close(response);
	}
	render() {
		const user = this.state.user;

		return (
			<div>
				<form onSubmit={this.handleSubmit}>
					<h3>Edit your account</h3>
					<label>Username:
						<input name="username" type="text" placeholder="Username" autoComplete="off" onChange={this.handleChange} value={user.username}/>
					</label>
					<label>New Password:
						<input name="password" type="password" autoComplete="off" placeholder="Password"/>
					</label>
					<label>Email:
						<input name="email" type="email" placeholder="Email" autoComplete="email" onChange={this.handleChange} value={user.email}/>
					</label>
					<input className="modal-btn" type="submit" value="Submit Updates" />
				</form>
				<DeleteUser id={user.id} reState={this.props.close} />
			</div>
		);
	}
}

export default EditUser;