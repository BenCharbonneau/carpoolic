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
		this.props.setMess(response);

		this.setState({modalClass: 'closed'})
	}
	render() {
		const createComp = <CreateRide userId={this.props.id} close={this.hideCreate} />

		return (
			<div id="container">
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