import React, { Component } from 'react';
import ShowRide from '../ShowRide';
import Modal from '../Modal';

class RideListContainer extends Component {
  constructor() {
    super();
    this.state = {
      rides: [],
      modalClass: 'closed',
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
    console.log(rides, "User");
  
    this.setState({rides: rides});
  }
  getRides = async () => {
    try {
      const ridesJSON = await fetch('http://localhost:9292/rides', {
        credentials: 'include'
      });

      const rides = await ridesJSON.json();
      console.log(rides, "List");

      this.setState({rides: rides.retrieved_rides});
    }
    catch (err) {
      console.log(err);
    }
  }
  rideShow = (e) => {
    console.log(e.target);
    if (e.target.tagName !== "BUTTON") {
      this.setState({modalClass: 'open', ride: e.currentTarget.id})
    }
  }
  rideHide = () => {
    this.setState({modalClass: 'closed', ride: -1})
  }
  render() {

    const rides = this.state.rides.map((ride) => {
      return (
        <li key={ride.id} id={ride.id} onClick={this.rideShow}>
          <ShowRide userId={this.props.userId} fields={['name','pickup','destination','pickup_time','driver','delete']} rideId={ride.id}/> 
        </li>
      );
    })

    const showComp = <ShowRide userId={this.props.userId} rideId={this.state.ride} close={this.rideHide} />

    return (
      <div>
        <ul>{rides}</ul>
        <Modal comp={showComp} cssClass={this.state.modalClass}/>
      </div>
    );
  }
}

export default RideListContainer;
