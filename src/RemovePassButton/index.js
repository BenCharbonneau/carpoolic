import React from 'react'
import "../App.css"

const remPass = async (reState,e) => {
	const id = e.currentTarget.id.split('_')
	const userId = id[0];
	const rideId = id[1];

	//remove the passenger from the ride and get back any messages
	const responseJSON = await fetch(process.env.REACT_APP_DEV_API_URL+'rides/'+rideId+'/removeuser/'+userId,{
		credentials: 'include',
		method: 'DELETE'
	});

	const response = await responseJSON.json();

	//refresh the state
	reState(response);
}

function RemovePassButton({userId, rideId, reState}) {
	return (
		<button className="cancel-btn" id={userId+"_"+rideId} onClick={remPass.bind(null,reState)}>X</button>
	);
}

export default RemovePassButton;