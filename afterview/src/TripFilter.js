/*
 * Class describing component for a trip filter
 * author@ Sean
 */

// Imports
import React, { Component } from 'react';
import './App.css';

// Class definition
class TripFilter extends Component {
  // render
  render() {
    return (
      <div className="filter">
        <span> {this.props.title} </span>
        <div> <input size="5"/> </div>
      </div>
    );
  }
}

// Export class
export default TripFilter;
