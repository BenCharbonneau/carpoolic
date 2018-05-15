import React, {Component} from 'react';
import EditRide from '../EditRide';
import EditUser from '../EditUser';

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
	render() {

		let comp;
		if (this.state.show) {
			comp = this.props.rideId ? <EditRide id={this.props.rideId} close={this.props.close}/> : <EditUser id={this.props.userId} close={this.props.close}/>
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