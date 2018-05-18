import React from 'react';
import '../App.css'

const delRide = async (reState,e) => {
	try{
		const id = e.currentTarget.id;

		const cancelRide = await fetch(process.env.REACT_APP_DEV_API_URL+'rides/' + id, {
			credentials: 'include',
			method: "DELETE"
		});

		const response = await cancelRide.json();

		reState(response);
	}
	catch (err) {
		console.log(err)
	}
}

function DeleteRide({id, reState}) {

	return (
		<button className="cancel-btn" id={id} onClick={delRide.bind(null,reState)}>Cancel Ride</button>
	);
}

export default DeleteRide;