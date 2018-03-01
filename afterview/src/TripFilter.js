/*
 * Class describing component for a trip filter
 * author@ Sean
 */

// Imports
import React, { Component } from 'react';
import './App.css';

class TripFilter extends Component {
  render() {
    return (
      <div>
        <div className="filter">
          <span> {this.props.title} </span>
          <div>
            <select>
              {this.props.values.map((value, i) => <option value={value} key={i}> {value} </option>)}
            </select>
          </div>
        </div>
      </div>
    );
  }
}

// Export class
export default TripFilter;
