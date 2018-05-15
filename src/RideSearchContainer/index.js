import React, { Component } from 'react';

const RideSearch = (props) => {
  if (!props.rides) {
    return <div></div>;
  }
  const rideList = props.rides.map((ride) => {
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
      <ul>{rideList}</ul>
    </div>
  );
}

export default RideSearch;