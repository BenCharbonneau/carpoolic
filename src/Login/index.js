import React, { Component } from 'react';

class Login extends Component {
	constructor(props) {
		super(props);
    	if (!this.props) this.props = {register: false};
		this.state = {
			message: '',
			register: this.props.register
		}
	}
	setUsername = async (e) => {

    	e.preventDefault();

		const inputs = e.currentTarget.children;
		const frmVals = {};

		for (let input of inputs) {
			if (input.name) {
				frmVals[input.name] = input.value;
			}
		}
		
		let login;

		if (!this.state.register) {
			const {username,password} = frmVals;
			login = await this.checkPassword(username,password);
		}
		else {
			login = await this.createUser(frmVals);
		}

		if(!login.success) {
  			this.setState({ message: login.message});
  		}
  		else {
			this.props.setLoggedIn(login.user_id);
		}
	}
	checkPassword = async (username, password) => {
		const loginJSON = await fetch('http://localhost:9292/users/login',{
			method: "POST",
			credentials: 'include',
			body: JSON.stringify({
				username: username,
				password: password
			})
		});

		const login = await loginJSON.json();

		return login
	}
	createUser = async (frmVals) => {
	  	const registerJSON = await fetch('http://localhost:9292/users/register',{
	  	  method: "POST",
	  	  credentials: 'include',
	  	  body: JSON.stringify(frmVals)
	  	});

	  	const register = await registerJSON.json();

		return register;
	}
	flipReg = (register) => {
		this.setState({ register: !register, message: '' });
	}
    render() {
	  	const register = this.state.register;

		let title;
	  	let inputs;
	  	let link;

	  	if (!register) {
	  		title = "Login";

	  		inputs = (
	  			[
	         		<input key={1} type="text" name="username" placeholder="Username" />,
	      	 		<input key={2} type="password" name="password" autoComplete="off" placeholder="Password" />,
	      	 		<button key={3} type="submit">Login</button>
	        	]
	  		);

	  		link = "Not a user? Click here to register.";
	  	}
	  	else {
	  		title = "Register";

	  		inputs = (
	  			[
	         		<input key={1}type="text" name="username" placeholder="Username" />,
	         		<input key={2} type="password" name="password" autoComplete="off" placeholder="Password" />,
	         		<input key={3} type="email" name="email" autoComplete="email" placeholder="Email" />,
	         		<button key={4} type="submit">Register</button>
	        	]
	  		);

	  		link = "Already a user? Click here to login.";
  		}

	    return (
	      <div>
	      	<h1>{title}</h1>
	      	<p>{this.state.message}</p>
	      	<form onSubmit={this.setUsername}>
	      		{inputs}
	      	</form>
	        <p onClick={this.flipReg.bind(null,register)} className="link">{link}</p>
	      </div>   
	    );
    }
}

export default Login;
