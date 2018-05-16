import React, { Component } from 'react';
import ShowRide from '../ShowRide';
import Modal from '../Modal';

class RideListContainer extends Component {
  constructor() {
    super();
    this.state = {
      rides: [],
      modalClass: 'closed',
      message: '',
      ride: -1
    }
  }
  componentDidMount() {
    if (this.props.srchCrit) {
      this.getRides().catch((err) => {
        console.log(err);
      })
    }
    else {
      this.getUserRides().catch((err) => {
        console.log(err);
      })    
    }
  }
  getUserRides = async () => {

   const ridesJSON = await fetch('http://localhost:9292/users/' + this.props.userId + '/rides', {
      credentials: 'include'
    });

    const rides = await ridesJSON.json();
  
    this.setState({rides: rides});
  }
  getRides = async () => {
    try {
      const ridesJSON = await fetch('http://localhost:9292/rides', {
        credentials: 'include'
      });

      const rides = await ridesJSON.json();

      this.setState({rides: rides.retrieved_rides});
    }
    catch (err) {
      console.log(err);
    }
  }
  rideShow = (e) => {
    if(e.target.tagName !== "BUTTON") {
      this.setState({modalClass: 'open', ride: e.currentTarget.id})
    }
  }
  rideHide = (response) => {
    console.log("Here");
    let message;
    if (response && response.message) message = response.message
    //this.setState({modalClass: 'closed', ride: -1, message: message})
  }
  render() {

    const rides = this.state.rides.map((ride) => {
      return (
        <li key={ride.id} id={ride.id} onClick={this.rideShow}>
          <ShowRide userId={this.props.userId} fields={['name','pickup','destination','pickup_time','driver','delete']} rideId={ride.id} close={this.rideHide}/> 
        </li>
      );
    })

    const showComp = (this.state.ride >= 0) ? <ShowRide userId={this.props.userId} rideId={this.state.ride} close={this.rideHide} /> : ''

    return (
      <div>
        { this.state.message ? <p>{this.state.message}</p> : '' }
        <ul>{rides}</ul>
        <Modal comp={showComp} cssClass={this.state.modalClass}/>
      </div>
    );
  }
}

export default RideListContainer;
