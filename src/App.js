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
    //Get the rides for the user and set loggedIn to true in state
    this.getRides({loggedIn: true, userId: id})
    .catch((err) => {
      console.log(err);
    });
  }
  showToggle = () => {
    //Toggle the text for the menu buttons based on whether the user is viewing their rides or searching for other users' rides
    let bannerButt = '';
    if (this.state.srchCrit === false) {
      bannerButt = 'View My Rides';
    }
    else {
      bannerButt = 'Search for Rides';
    }

    //Get the rides to show to the user and set the button text in state
    this.getRides({bannerButt: bannerButt, srchCrit: !this.state.srchCrit})
    .catch((err) => {
      console.log(err);
    });
  }
  getRides = async (body={}) => {
    //Get either all rides or a user's rides from the server using a fetch
    //In the parameters, accept an object that can be added to state
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

      //If the user is searching rides, get all rides. This will be updated later to search based on search criteria.
      if (srchCrit) {
        const ridesJSON = await fetch(process.env.REACT_APP_DEV_API_URL+'rides', {
          credentials: 'include'
        });

        const rides = await ridesJSON.json();

        body.rides = rides.retrieved_rides;

        this.setState(body);
      }
      //Otherwise, get the rides for the logged in user
      else if (userId) {
       const ridesJSON = await fetch(process.env.REACT_APP_DEV_API_URL+'users/' + userId + '/rides', {
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
    //Set a message to be added to state and get the user's rides again
    const message = {};
    if (response) message.message = response.message;

    this.getRides(message)
    .catch((err) => {
      console.log(err);
    });
  }
  logout = async () => {
    //log a user out and reset the state of the app
    const responseJSON = await fetch(process.env.REACT_APP_DEV_API_URL+'users/logout',{
      credentials: 'include'
    });

    const response = await responseJSON.json();

    this.setState({loggedIn: false, message: response.message, userId: -1, rides: []});
  }
  render() {
    return (
      <div className="App">
        <div className="bg">
            <h1 className="transbox">Carpoolic</h1>
        </div>
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
