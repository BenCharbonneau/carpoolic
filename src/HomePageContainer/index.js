import React from 'react';
import Banner from '../Banner';
import UserRideList from '../UserRideList';


function HomePageContainer({userId}) {
  return (
    <div>
      <Banner id={userId} title="Carpoolic"/>
      <UserRideList userId={userId} />
    </div>
  );
}

export default HomePageContainer;
