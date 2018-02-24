/*
 * Class describing component for header and high level navigation
 * author@ sean
 */

// Imports
import React, { Component } from 'react';
import { BrowserRouter, Route, Link } from 'react-router-dom';
import logo from './mountain-15-48-260771.png';
import PastTripsList from './PastTripsList';
import './App.css';

// Class definition
class App extends Component {
  // render
  render() {
    return (
      <BrowserRouter>
        <div className="header-wrapper">
          <header>
            <div className="App">
              <img src={logo} className="logo" alt="logo" />
              <div className="App-title"> Welcome! </div>
              <div className="emoji_left"> &#9975; </div>
              <div className="tent_emoji_left"> &#9978; </div>
              <div className="emoji_right"> &#9975; </div>
              <div className="tent_emoji_right"> &#9978; </div>
            </div>
            <div className="fluid-container">
              <div className="nav-container">
                <nav className="page-nav">
                  <ul className="nav-ul">
                    <li className="nav-li">
                      <Link className="nav-a" to="/pasttrips"> Past </Link>
                    </li>
                    <li className="nav-li">
                      <Link className="nav-a" to="/schdtrips"> Scheduled </Link>
                    </li>
                    <li className="nav-li">
                      <Link className="nav-a" to="/inprogress"> Active </Link>
                    </li>
                  </ul>
                </nav>
              </div>
            </div>
          </header>
          <Route path="/pasttrips" component={PastTripsList}/>
        </div>
      </BrowserRouter>
    );
  }
}

// Export class
export default App;
