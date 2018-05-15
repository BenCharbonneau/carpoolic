import React from 'react';
import EditButton from '../EditButton';

const showCreate = () => {
	
}

const showHome = () => {
	
}

const logout = () => {
	
}

function Banner({id, title}) {
	return (
		<div id="container">
			<button onClick={showCreate}>Create Ride</button>
			<button onClick={showHome}>Home</button>
			<h1>{title}</h1>
			<EditButton btnText="Edit Account" userId={id}/>
			<button onClick={logout} >Logout</button>
		</div>
	);
}

export default Banner;