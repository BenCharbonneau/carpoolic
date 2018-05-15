import React from 'react';
import UserRideList from '../UserRideList';

function HomePageContainer({userId}) {
  return (
    <div>
      <RideList userId={userId} />
    </div>
  );
}

export default HomePageContainer;
