import React from 'react';
import RideListContainer from '../RideListContainer';
import Banner from '../Banner';

function SearchPage({userId, showHome, logout}) {
  return (
    <div>
      <Banner id={userId} nav="View My Rides" navFunc={showHome} logout={logout} title="Carpoolic"/>
      <RideListContainer userId={userId} srchCrit={true}/>
    </div>
  );
}


export default SearchPage;