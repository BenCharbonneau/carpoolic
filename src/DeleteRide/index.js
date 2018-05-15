import React from 'react';

const delRide = async (reState,e) => {
	const id = e.currentTarget.id
	// await fetch('database rides/delete/'+id,{
	// 	credentials: 'include'
	// });

	reState();
}

function DeleteButton({id, reState}) {
	return (
		<button id={id} onClick={delRide.bind(null,reState)}>Cancel</button>
	);
}

export default DeleteButton;