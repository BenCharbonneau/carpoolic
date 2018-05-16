import React from 'react';
import './style.css';

function Modal({comp,cssClass}) {
	console.log("here");
	return (
		<div className={cssClass}>
			<div className="modal">
				{comp}
			</div>
		</div>
	);
}

export default Modal;