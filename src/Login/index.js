import React, { Component } from 'react';
import './style.css';

class Login extends Component {
	constructor(props) {
		super(props);
    	if (!this.props) this.props = {register: false, mess: ''};
		this.state = {
			message: this.props.mess,
			register: this.props.register
		}
	}
	setUsername = async (e) => {

    	e.preventDefault();

		const inputs = e.currentTarget.children;
		const frmVals = {};
		let input;

		for (let label of inputs) {
			if (label.tagName === 'LABEL') {
				input = label.children[0];
			}
			console.log(input);

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
	  	console.log(register, " this is register")
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
	         		<label key={1}> Username: <input type="text" name="username" placeholder="Username" /></label>,
	      	 		<label key={2}> Password: <input type="password" name="password" autoComplete="off" placeholder="Password" /></label>,
	      	 		<button className="btn" key={3} type="submit">Login</button>
	        	]
	  		);

	  		link = "Not a user? Click here to register.";
	  	}
	  	else {
	  		title = "Register";

	  		inputs = (
	  			[
	         		<label  key={1}> Username: <input type="text" name="username" placeholder="Username" /></label>,
	         		<label  key={2}> Password: <input  type="password" name="password" autoComplete="off" placeholder="Password" /></label>,
	         		<label  key={3}> Email: <input  type="email" name="email" autoComplete="email" placeholder="Email" /></label>,
	         		<button className="btn" key={4} type="submit">Register</button>
	        	]
	  		);

	  		link = "Already a user? Click here to login.";
  		}

	    return (
	      <div>
	      	<div className="bg"></div>
	      	<h1> Carpoolic </h1> 
	      	<h2>{title}</h2>
	      	<p>{this.state.message}</p>
	      	<form onSubmit={this.setUsername}>
	      		{inputs}
	      	</form>
	        <p onClick={this.flipReg.bind(null,register)} className="link">{link}</p>
	        <h3 className="intro"> Carpoolic is a ride share application to make carpooling to events easier! <br /> Login or create an account to search for rides. </h3>
	      </div>   
	    );
    }
}

export default Login;
