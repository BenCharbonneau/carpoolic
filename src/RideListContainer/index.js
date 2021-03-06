import React, { Component } from 'react';
import ShowRide from '../ShowRide';
import Modal from '../Modal';
import './style.css';

class RideListContainer extends Component {
  constructor() {
    super();
    this.state = {
      modalClass: 'closed',
      ride: -1
    }
  }
  rideShow = (e) => {
    //pop up a modal with the show page for a ride if a user clicks on the ride
    if(e.target.tagName !== "BUTTON") {
      this.setState({modalClass: 'open', ride: e.currentTarget.id})
    }
  }
  rideHide = (response) => {
    //hide the modal and show any messages
    this.props.setMess(response);

    this.setState({modalClass: 'closed', ride: -1});
  }
  render() {
    //build the list of rides using the show ride component
    const rides = this.props.rides ? this.props.rides.map((ride) => {
      return (
        <ShowRide key={ride.id} userId={this.props.userId} rowClick={this.rideShow} cssClass="from-list" rideId={ride.id} close={this.rideHide} fields={['name','pickup','destination','pickup_time','driver','delete']}/> 
      );
    }) : [];

    //add wrappers to the list to make it a table
    const showComp = (this.state.ride >= 0) ? <table><tbody><ShowRide userId={this.props.userId} cssClass="from-modal" rideId={this.state.ride} close={this.rideHide} /></tbody></table> : ''

    return (
      <div className="list-container">
        <h3>Rides</h3>
        <table>
          <thead>
            <tr>
              <th>Ride Name</th>
              <th>Pickup Location</th>
              <th>Destination</th>
              <th>Pickup Time</th>
              <th>Driver</th>
            </tr>
          </thead>
          <tbody>
            {rides}
          </tbody>
        </table>
        <Modal comp={showComp} close={this.rideHide} cssClass={this.state.modalClass}/>
      </div>
    );
  }
}

export default RideListContainer;
