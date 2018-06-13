import React, { Component } from 'react';
import '../App.css'

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

    	//get the user information from the login/registration form
		const inputs = e.currentTarget.children;
		const frmVals = {};
		let input;

		for (let label of inputs) {
			if (label.tagName === 'LABEL') {
				input = label.children[0];
			}

			if (input.name) {
				frmVals[input.name] = input.value;
			}
		}
		
		//do authentication on the server
		let login;

		if (!this.state.register) {
			const {username,password} = frmVals;
			login = await this.checkPassword(username,password);
		}
		else {
			login = await this.createUser(frmVals);
		}

		//If it's not successful, show a message. Otherwise, pass the user to the App state.
		if(!login.success) {
  			this.setState({ message: login.message});
  		}
  		else {
			this.props.setLoggedIn(login.user_id);
		}
	}
	checkPassword = async (username, password) => {
		//validate the inputted username and password on the server
		const loginJSON = await fetch(process.env.REACT_APP_DEV_API_URL+'users/login',{
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
		//register the user on the server
	  	const registerJSON = await fetch(process.env.REACT_APP_DEV_API_URL+'users/register',{
	  	  method: "POST",
	  	  credentials: 'include',
	  	  body: JSON.stringify(frmVals)
	  	});

	  	const register = await registerJSON.json();
	  	
		return register;
	}
	flipReg = (register) => {
		//toggle whether the user is registering or logging in
		this.setState({ register: !register, message: '' });
	}
    render() {
	  	const register = this.state.register;

		let title;
	  	let inputs;
	  	let link;

	  	//build the login page or the register page depending on which page the user is on
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
