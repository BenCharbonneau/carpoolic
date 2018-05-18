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
		this.getUser().catch((err) => {
			console.log(err);
		})
	}
	getUser = async () => {
		const userJSON = await fetch(process.env.REACT_APP_DEV_API_URL+'users/'+this.props.id,{
			credentials: 'include'
		})

		const user = await userJSON.json();

		this.setState({user: user.user});
	}
	handleChange = (e) => {
		const body = this.state.user;
		body[e.currentTarget.name] = e.currentTarget.value;

		this.setState({})
	}
	handleSubmit = async (e) => {
		e.preventDefault();

		const labels = e.currentTarget.children;
		let input;
		let body = {};
		for (let label of labels) {
			input = label.children[0]
			if (input && input.name) {
				body[input.name] = input.value;
			}
		}

		const responseJSON = await fetch(process.env.REACT_APP_DEV_API_URL+'users/'+this.props.id,{
			credentials: 'include',
			method: 'PUT',
			body: JSON.stringify(body)
		});

		const response = await responseJSON.json();

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