import React from 'react';

const delUser = async (reState,e) => {
	const id = e.currentTarget.id
	// await fetch('database rides/delete/'+id,{
	// 	credentials: 'include'
	// });

	reState();
}

function DeleteUser({id, reState}) {
	return (
		<button id={id} onClick={delUser.bind(null,reState)}>Delete</button>
	);
}

export default DeleteUser;