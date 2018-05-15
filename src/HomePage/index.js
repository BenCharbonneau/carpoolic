import React,{Component} from 'react';
import RideListContainer from '../RideListContainer';
import Banner from '../Banner';

function HomePage({userId, showSearch}) {
  return (
    <div>
      <Banner id={userId} nav="Search for Rides" navFunc={showSearch} title="Carpoolic"/>
      <RideListContainer userId={userId} />
    </div>
  );
}


export default HomePage;
