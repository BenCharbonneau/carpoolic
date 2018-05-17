import React,{Component} from 'react';
import EditButton from '../EditButton';
import CreateRide from '../CreateRide';
import Modal from '../Modal';

class Banner extends Component {
	constructor() {
		super();
		this.state = {
			modalClass: 'closed',
			message: ''
		}
	}
	showModal = () => {
		this.setState({modalClass: 'open'})
	}
	hideModal = (response,logout) => {

		if (logout) {
			this.props.logout();
		}

		this.setState({modalClass: 'closed'});

		this.props.setMess(response);

	}
	render() {
		const createComp = <CreateRide userId={this.props.id} close={this.hideModal} />

		return (
			<div id="container">
				<button onClick={this.showModal}>Create Ride</button>
				<button onClick={this.props.navFunc}>{this.props.nav}</button>
				<h1>{this.props.title}</h1>
				<EditButton btnText="Edit Account" close={this.hideModal} userId={this.props.id}/>
				<button onClick={this.props.logout}>Logout</button>
				<Modal cssClass={this.state.modalClass} close={this.hideModal} comp={createComp}/>
			</div>
		);
	}
}

export default Banner;