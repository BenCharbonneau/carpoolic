import React from 'react';
import RideList from '../RideList';
import Banner from '../Banner';

function HomePageContainer({userId}) {
  return (
    <div>
      <Banner id={userId} title="Carpoolic"/>
      <RideList userId={userId} />
    </div>
  );
}

export default HomePageContainer;
