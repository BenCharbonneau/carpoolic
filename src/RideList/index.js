import React, { Component } from 'react';
import ShowRide from '../ShowRide';

class RideList extends Component {
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
   // const ridesJSON = await fetch('database users/id/rides',{
    //  credentials: 'include',
    //  body: JSON.stringify({
    //    username: username,
    //    password: password
    //  })
    // });

    //const rides = ridesJSON.json();

    const rides = {
      success: true,
      rides: [
        {id: 1, name: 'Awesome ride to the moon', driver_user_id: 1, pickup: 'Wrigley', destination: 'Soldier Field', pickup_date: '1/1/2019', pickup_time: '6:00 AM'},
        {id: 2, name: 'A ride on the crazy train.', driver_user_id: 2, pickup: 'Wrigley', destination: 'Soldier Field', pickup_date: '1/1/2019', pickup_time: '6:00 AM'}
      ]
    }

    this.setState({ rides: rides.rides});
  }
  render() {

    const rides = this.state.rides.map((ride) => {
      return (
        <li key={ride.id}>
          <ShowRide userId={this.props.userId} fields={['name','pickup','destination','pickup_time','driver','delete']} rideId={ride.id}/>
        </li>
      );
    })

    return (
      <div>
        <ul>{rides}</ul>
      </div>
    );
  }
}

export default RideList;
