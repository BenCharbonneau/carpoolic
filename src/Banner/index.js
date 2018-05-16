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
	showCreate = () => {
		this.setState({modalClass: 'open'})
	}
	hideCreate = (response) => {
		let message
		if (response && response.message) message = response.message

		//this.props.setParentState();

		this.setState({modalClass: 'closed',message: message})
	}
	render() {
		const createComp = <CreateRide close={this.hideCreate} />

		return (
			<div id="container">
				{ this.state.message ? <p>{this.state.message}</p> : '' }
				<button onClick={this.showCreate}>Create Ride</button>
				<button onClick={this.props.navFunc}>{this.props.nav}</button>
				<h1>{this.props.title}</h1>
				<EditButton btnText="Edit Account" userId={this.props.id}/>
				<button onClick={this.props.logout} >Logout</button>
				<Modal cssClass={this.state.modalClass} comp={createComp}/>
			</div>
		);
	}
}

export default Banner;