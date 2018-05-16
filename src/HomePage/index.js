import React from 'react';
import RideListContainer from '../RideListContainer';
import Banner from '../Banner';

function HomePage({userId, showSearch, logout}) {
  return (
    <div>
      <Banner id={userId} nav="Search for Rides" navFunc={showSearch} logout={logout} title="Carpoolic"/>
      <RideListContainer userId={userId} />
    </div>
  );
}


export default HomePage;
