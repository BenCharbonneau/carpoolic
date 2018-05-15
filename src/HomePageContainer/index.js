import React from 'react';
import UserRideList from '../UserRideList';
import Banner from '../Banner';

function HomePageContainer({userId}) {
  return (
    <div>
      <Banner id={userId} title="Carpoolic"/>
      <UserRideList userId={userId} />
    </div>
  );
}

export default HomePageContainer;
