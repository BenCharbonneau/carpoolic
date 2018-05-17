import React from 'react';

const delUser = async (reState,e) => {
	const id = e.currentTarget.id
	const responseJSON = await fetch('http://localhost:9292/users/' + id, {
		credentials: 'include',
		method: "DELETE"
	});

	const response = await responseJSON.json();
	const logout = true;
	
	reState(response,logout);
}

function DeleteUser({id, reState}) {
	return (
		<button className="btn" id={id} onClick={delUser.bind(null,reState)}>Delete</button>
	);
}

export default DeleteUser;