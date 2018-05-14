import React from 'react';
import RideList from '../RideList';
import CreateRide from '../CreateRide';

function HomePageContainer({userId}) {
  return (
    <div>
      <RideList userId={userId} />
    </div>
  );
}

export default HomePageContainer;
