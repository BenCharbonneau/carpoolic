import React,{Component} from 'react';
import RideListContainer from '../RideListContainer';
import Banner from '../Banner';

function SearchPage({userId, showHome}) {
  return (
    <div>
      <Banner id={userId} nav="View My Rides" navFunc={showHome} title="Carpoolic"/>
      <RideListContainer userId={userId} srchCrit={true}/>
    </div>
  );
}


export default SearchPage;