/*
 * Class describing component that lists all past trips not filtered out
 * author@ sean
 */

// Imports
import React, { Component } from 'react';

class TripList extends Component {
  render() {
    return (
      <div>
        {this.props.trips.map((trip, i) => <button key={i}> {trip} </button>)}
      </div>
    );
  }
}

// Export class
export default TripList;
