import React from 'react';
import './style.css';

function Modal({comp,cssClass}) {
	return (
		<div className={cssClass}>
			<div className="modal">
				{comp}
			</div>
		</div>
	);
}

export default Modal;