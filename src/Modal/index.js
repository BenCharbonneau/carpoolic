import React from 'react';
import './style.css';

function Modal({comp,cssClass,close}) {
	return (
		<div className={cssClass}>
			<div className="modal">
				{comp}
				<button className="modal-btn ok-btn" onClick={close}>OK</button>
			</div>
		</div>
	);
}

export default Modal;