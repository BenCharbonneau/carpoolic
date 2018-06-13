import React from 'react';

const delUser = async (reState,e) => {
	//delete the user and log them out
	const id = e.currentTarget.id
	const responseJSON = await fetch(process.env.REACT_APP_DEV_API_URL+'users/' + id, {
		credentials: 'include',
		method: "DELETE"
	});

	const response = await responseJSON.json();
	const logout = true;
	
	reState(response,logout);
}

function DeleteUser({id, reState}) {
	return (
		<button className="modal-btn" id={id} onClick={delUser.bind(null,reState)}>Delete</button>
	);
}

export default DeleteUser;