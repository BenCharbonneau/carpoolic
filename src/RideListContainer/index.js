import React, { Component } from 'react';
import ShowRide from '../ShowRide';
import Modal from '../Modal';

class RideListContainer extends Component {
  constructor() {
    super();
    this.state = {
      modalClass: 'closed',
      ride: -1
    }
  }
  rideShow = (e) => {
    if(e.target.tagName !== "BUTTON") {
      this.setState({modalClass: 'open', ride: e.currentTarget.id})
    }
  }
  rideHide = (response) => {
    this.props.setMess(response);

    this.setState({modalClass: 'closed', ride: -1});
  }
  render() {
    const rides = this.props.rides ? this.props.rides.map((ride) => {
      return (
        <li key={ride.id} id={ride.id} onClick={this.rideShow}>
          <ShowRide userId={this.props.userId} fields={['name','pickup','destination','pickup_time','driver','delete']} rideId={ride.id} close={this.rideHide}/> 
        </li>
      );
    }) : [];

    const showComp = (this.state.ride >= 0) ? <ShowRide userId={this.props.userId} rideId={this.state.ride} close={this.rideHide} /> : ''

    return (
      <div>
        <ul>{rides}</ul>
        <Modal comp={showComp} cssClass={this.state.modalClass}/>
      </div>
    );
  }
}

export default RideListContainer;
