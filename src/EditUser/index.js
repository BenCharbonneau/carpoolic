import React, { Component } from 'react';
import DeleteUser from '../DeleteUser';

class EditUser extends Component {
	constructor() {
		super();
		this.state = {
			user: {
				name: '',
				username: '',
				user: {},
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
		const userJSON = await fetch('http://localhost:9292/users/'+this.props.id,{
			credentials: 'include'
		})

		const user = await userJSON.json();

		this.setState({user: user.user});
	}
	handleSubmit = async(e) => {
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
		
		const responseJSON = await fetch('http://localhost:9292/users',{
			method: "PUT",
			credentials: 'include',
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
						<input name="username" type="text" placeholder="Username" value={user.username}/>
					</label>
					<label>Password:
						<input name="password" type="password" placeholder="Password"/>
					</label>
					<label>Name:
						<input name="name" type="text" placeholder="Name" value={user.name}/>
					</label>
					<label>Email:
						<input name="email" type="email" placeholder="Email" value={user.email}/>
					</label>
					<input type="submit" value="Submit Updates" />
				</form>
				<DeleteUser id={user.id} reState={this.props.close} />
			</div>
		);
	}
}

export default EditUser;