import React from 'react';
import RideList from '../RideList';

function HomePageContainer({userId}) {
  return (
    <div>
      <RideList userId={userId} />
    </div>
  );
}

export default HomePageContainer;
