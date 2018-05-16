import React from 'react';

const delRide = async (reState,e) => {
	try{
	const id = e.currentTarget.id;

	const cancelRide = await fetch('http://localhost:9292/rides/' + id, {
		// credentials: 'include',
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
		<button id={id} onClick={delRide.bind(null,reState)}>Cancel</button>
	);
}

export default DeleteRide;