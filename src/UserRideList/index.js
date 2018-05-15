import React, { Component } from 'react';
import ShowRide from '../ShowRide';

class UserRideList extends Component {
  constructor() {
    super();
    this.state = {
      rides: []
    }
  }
  componentDidMount() {
    this.getUserRides().catch((err) => {
      console.log(err);
    })
  }
  getUserRides = async () => {

    userId = 

   const ridesJSON = await fetch('http://localhost:9292/' + userId + '/rides', {
      credentials: 'include'
      // body: JSON.stringify({
      //   username: username,
      //   password: password
      // })
    });

    const rides = await ridesJSON.json();
  
    console.log(rides)
    this.setState({rides: rides});
  }
   
  render() {

    const UserRideList = this.state.rides.map((ride) => {
      return (
        <li key={ride.id}>
          
        </li>
      );
    })

    return (
      <div>
        <ShowRide userId={this.props.userId} fields={['name','pickup','destination','pickup_time','driver','delete']} rideId={1}/>
      </div>
    );
  }
}

export default UserRideList;
