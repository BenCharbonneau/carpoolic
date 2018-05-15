import React, { Component } from 'react';
import './App.css';
import Login from './Login';
import HomePageContainer from './HomePageContainer';
import RideSearchContainer from './RideSearchContainer';

class App extends Component {
  constructor() {
    super();
    this.state = {
      loggedIn: true,
      userId: 1
    }
  }
  setLoggedIn = (id) => {
    console.log(id);
    this.setState({loggedIn: true, userId: id});
  }

getRides = async () => {
  const ridesJSON = await fetch('http://localhost:9292/rides', {
    credentials: 'include'
    // body: JSON.stringify({
    //   username: username,
    //   password: password
    // })
  });
 
  const rides = await ridesJSON.json();
  const available_rides = rides.retrieved_rides
  console.log(available_rides)
  return available_rides;
}
  render() {
    return (
      <div className="App">
        {this.state.loggedIn ?
          <div>
            <HomePageContainer userId={this.state.userId} />
            <RideSearchContainer getRides={this.getRides} />
          </div>:
          <Login setLoggedIn={this.setLoggedIn}/>    
        }
      </div>
    );
  }
}

export default App;
