import React, { Component } from 'react';
import './App.css';
import Login from './Login';
import HomePage from './HomePage';
import SearchPage from './SearchPage';

class App extends Component {
  constructor() {
    super();
    this.state = {
      loggedIn: true,
      userId: 1,
      page: ''
    }
  }
  setLoggedIn = (id) => {
    console.log(id);
    this.setState({loggedIn: true, userId: id});
  }
  showSearch = () => {
    this.setState({page: 'search'})
  }
  showHome = () => {
    this.setState({page: ''})
  }
  render() {

    const page = this.state.page ? <SearchPage showHome={this.showHome} userId={this.state.userId} /> : 
    <HomePage showSearch={this.showSearch} userId={this.state.userId} />

    return (
      <div className="App">
        {this.state.loggedIn ?
          <div>
            {page}
          </div>:
          <Login setLoggedIn={this.setLoggedIn}/>    
        }
      </div>
    );
  }
}

export default App;
