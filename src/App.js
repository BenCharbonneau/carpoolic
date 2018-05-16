import React, { Component } from 'react';
import './App.css';
import Login from './Login';
import HomePage from './HomePage';
import SearchPage from './SearchPage';
import Banner from './Banner';

class App extends Component {
  constructor() {
    super();
    this.state = {
      loggedIn: false,
      userId: -1,
      page: '',
      bannerButt: 'Search for Rides'
    }
  }
  setLoggedIn = (id) => {
    this.setState({loggedIn: true, userId: id});
  }
  showToggle = () => {
    if (this.state.page === '') {
      this.setState({page: 'search', bannerButt: 'View My Rides'})
    }
    else {
      this.showHome();
    }
  }
  showHome = () => {
    this.setState({page: '', bannerButt: 'Search for Rides'})
  }
  logout = async () => {
    await fetch('http://localhost:9292/users/logout',{
      credentials: 'include'
    })

    this.setState({loggedIn: false});
  }
  render() {

    const page = this.state.page ? <SearchPage userId={this.state.userId} /> : 
    <HomePage userId={this.state.userId} />

    return (
      <div className="App">
        {this.state.loggedIn ?
          <div>
            <Banner id={this.state.userId} reState={this.forceUpdate.bind(this)} nav={this.state.bannerButt} navFunc={this.showToggle} logout={this.logout} title="Carpoolic"/>
            {page}
          </div>:
          <Login setLoggedIn={this.setLoggedIn}/>    
        }
      </div>
    );
  }
}

export default App;
