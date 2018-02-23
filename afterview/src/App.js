import React, { Component } from 'react';
import logo from './mountain-15-48-260771.png';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="header-wrapper">
        <header>
          <div className="App">
            <img src={logo} className="logo" alt="logo" />
            <div className="App-title">Welcome!</div>
            <div className="emoji_left"> &#9975;</div>
            <div className="tent_emoji_left">&#9978;</div>
            <div className="emoji_right"> &#9975; </div>
            <div className="tent_emoji_right">&#9978;</div>
          </div>
          <div className="fluid-container">
            <div className="nav-container">
              <nav className="page-nav">
                <ul className="nav-ul">
                  <li className="nav-li">
                    <a className="nav-a" ui-sref="pasttrips"> Past </a>
                  </li>
                  <li className="nav-li">
                    <a className="nav-a" ui-sref="proposedtrips"> Scheduled </a>
                  </li>
                  <li className="nav-li">
                    <a className="nav-a" ui-sref="inprogresstrips"> Active </a>
                  </li>
                </ul>
              </nav>
            </div>
          </div>
        </header>
      </div>
    );
  }
}

export default App;
