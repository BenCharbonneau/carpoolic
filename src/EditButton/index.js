import React, {Component} from 'react';
import EditRide from '../EditRide';
import EditUser from '../EditUser';
import Modal from '../Modal';

class EditButton extends Component {
	constructor() {
		super();
		this.state = {
			show: false
		}
	}
	showEdit = () => {
		this.setState({show: true})
	}
	hideEdit = (response,logout) => {
		this.props.close(response,logout);
		this.setState({show: false});
	}
	render() {

		let comp;
		if (this.state.show) {
			comp = this.props.rideId ? <EditRide id={this.props.rideId} close={this.hideEdit}/> : <EditUser id={this.props.userId} close={this.hideEdit}/>
			comp = <Modal comp={comp} close={this.hideEdit} cssClass="open"/>
		}
		else {
			comp = (<button className="modal-btn" onClick={this.showEdit}>{this.props.btnText}</button>)
		}
		
		return (
			comp
		);
	}
}

export default EditButton;