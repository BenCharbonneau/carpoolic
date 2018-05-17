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
	hideEdit = (response) => {
		this.props.close(response);
		this.setState({show: false})
	}
	render() {

		let comp;
		if (this.state.show) {
			comp = this.props.rideId ? <EditRide id={this.props.rideId} close={this.hideEdit}/> : <EditUser id={this.props.userId} close={this.hideEdit}/>
			comp = <Modal comp={comp} cssClass="open"/>
		}
		else {
			comp = (<button onClick={this.showEdit}>{this.props.btnText}</button>)
		}
		
		return (
			comp
		);
	}
}

export default EditButton;