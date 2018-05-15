import React from 'react'

const remPass = async (reState,e) => {
	const id = e.currentTarget.id
	// await fetch('database rides/delete/'+id,{
	// 	credentials: 'include'
	// });

	reState();
}

function RemovePassButton({id, reState}) {
	return (
		<button id={id} onClick={remPass.bind(null,reState)}>X</button>
	);
}

export default RemovePassButton;