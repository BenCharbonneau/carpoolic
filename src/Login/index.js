import React, { Component } from 'react';

class Login extends Component {
	constructor() {
		super();
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
		// const login = await fetch('database',{
		// 	body: JSON.stringify({
		// 		username: username,
		// 		password: password
		// 	})
		// });

		const login = {
			success: true,
			user_id: 1
		}

		// const login = {
		// 	success: false,
		// 	message: "Invalid username and password."
		// }

		return login
	}
	createUser = async (frmVals) => {
  	// const register = await fetch('database',{
  	//   body: JSON.stringify(frmVals)
  	// });

  	const register = {
			success: true,
			user_id: 1
    }

		// const register = {
		// 	success: false,
		// 	message: "That username is already taken. Try again."
		// }

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
         <input type="text" name="username" placeholder="Username" />,
      	 <input type="password" name="password" placeholder="Password" />,
      	 <button type="submit">Login</button>
        ]
  		);

  		link = "Not a user? Click here to register.";
  	}
  	else {
  		title = "Register";

  		inputs = (
  			[
         <input type="text" name="username" placeholder="Username" />,
         <input type="password" name="password" placeholder="Password" />,
         <input type="tel" name="phone" placeholder="Phone Number" defaultValue="" />,
         <input type="email" name="email" placeholder="Email" />,
         <button type="submit">Register</button>
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
        <p onClick={this.flipReg.bind(null,register)} class="link">{link}</p>
      </div>   
    );
  }
}

export default Login;
