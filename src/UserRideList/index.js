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
    this.getRides().catch((err) => {
      console.log(err);
    })
  }
  getRides = async () => {

    userId = 

   const ridesJSON = await fetch('http://localhost:9292/' + userId + '/rides', {
      credentials: 'include'
      // body: JSON.stringify({
      //   username: username,
      //   password: password
      // })
    });

    const rides = await ridesJSON.json();
    const available_rides = rides.retrieved_rides
    console.log(available_rides)
    this.setState({rides: available_rides});
  }
   //<ShowRide userId={this.props.userId} fields={['name','pickup','destination','pickup_time','driver','delete']} rideId={ride.id}/>
  render() {

    const rideList = this.state.rides.map((ride) => {
      return (
        <li key={ride.id}>
          ride description: {ride.name} <br />
          ride destination: {ride.destination} <br />
          available seats: {ride.passenger_slots} <br />
          pickup date: {ride.pickup_date} <br />
          pickup time: {ride.pickup_time} <br />
          pickup location: {ride.pickup} <br />
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
//<ul>{rideList}</ul>
export default UserRideList;
