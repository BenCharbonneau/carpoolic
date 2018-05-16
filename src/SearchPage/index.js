import React from 'react';
import RideListContainer from '../RideListContainer';

function SearchPage({userId}) {
  return (
    <div>
      <RideListContainer userId={userId} srchCrit={true}/>
    </div>
  );
}


export default SearchPage;