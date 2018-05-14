import React, { Component } from 'react';
import './App.css';
import Login from './Login';
import HomePageContainer from './HomePageContainer';

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
  render() {
    return (
      <div className="App">
        {this.state.loggedIn ?
          <HomePageContainer userId={this.state.userId} />:
          <Login setLoggedIn={this.setLoggedIn}/>    
        }
      </div>
    );
  }
}

export default App;
