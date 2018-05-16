import React from 'react';
import RideListContainer from '../RideListContainer';

function HomePage({userId}) {
  return (
    <div>
      <RideListContainer userId={userId} />
    </div>
  );
}


export default HomePage;
