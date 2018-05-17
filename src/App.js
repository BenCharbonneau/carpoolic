import React, { Component } from 'react';
import './App.css';
import Login from './Login';
import RideListContainer from './RideListContainer';
import Banner from './Banner';

class App extends Component {
  constructor() {
    super();
    this.state = {
      loggedIn: false,
      userId: -1,
      bannerButt: 'Search for Rides',
      srchCrit: false,
      rides: [],
      message: ''
    }
  }
  setLoggedIn = (id) => {
    this.getRides({loggedIn: true, userId: id})
    .catch((err) => {
      console.log(err);
    });
  }
  showToggle = () => {
    let bannerButt = '';
    if (this.state.srchCrit === false) {
      bannerButt = 'View My Rides';
    }
    else {
      bannerButt = 'Search for Rides';
    }

    this.getRides({bannerButt: bannerButt, srchCrit: !this.state.srchCrit})
    .catch((err) => {
      console.log(err);
    });
  }
  getRides = async (body={}) => {
    try {

      let userId;
      if (body.userId) {
        userId = body.userId;
      }
      else if (this.state.userId > 0) {
        userId = this.state.userId;
      }

      let srchCrit;
      if (body.srchCrit !== undefined) {
        srchCrit = body.srchCrit;
      }
      else {
        srchCrit = this.state.srchCrit;
      }

      if (!body.message) body.message = '';

      if (srchCrit) {
        const ridesJSON = await fetch('http://localhost:9292/rides', {
          credentials: 'include'
        });

        const rides = await ridesJSON.json();

        body.rides = rides.retrieved_rides;

        this.setState(body);
      }
      else if (userId) {
       const ridesJSON = await fetch('http://localhost:9292/users/' + userId + '/rides', {
          credentials: 'include'
        });

        const rides = await ridesJSON.json();

        body.rides = rides.rides;

        this.setState(body);
      }
    }
    catch (err) {
      console.log(err);
    }
  }
  setMessage = (response) => {

    const message = {};
    if (response) message.message = response.message;

    this.getRides(message)
    .catch((err) => {
      console.log(err);
    });
  }
  logout = async () => {
    const responseJSON = await fetch('http://localhost:9292/users/logout',{
      credentials: 'include'
    });

    const response = await responseJSON.json();

    this.setState({loggedIn: false, message: response.message});
  }
  render() {
    return (
      <div className="App">
        {this.state.loggedIn ?
          <div>
            <Banner id={this.state.userId} setMess={this.setMessage} nav={this.state.bannerButt} navFunc={this.showToggle} logout={this.logout} title="Carpoolic"/>
            { this.state.message ? <p>{this.state.message}</p> : '' }
            <RideListContainer userId={this.state.userId} rides={this.state.rides} setMess={this.setMessage}/>
          </div>:
          <Login setLoggedIn={this.setLoggedIn} mess={this.state.message}/>    
        }
      </div>
    );
  }
}

export default App;
