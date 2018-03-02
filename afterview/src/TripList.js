/*
 * Class describing component that lists all past trips not filtered out
 * author@ sean
 */

// Imports
import React, { Component } from 'react';

class TripList extends Component {
  constructor( props ) {
    super( props );
  }

  render() {
    console.log( 'TRIP LIST', this.props );
    return (
      <div>
      {this.props.trips.map((trip, i) => <div><button key={i}> {trip} </button></div>)}
      </div>
    );
  }
}

// Export class
export default TripList;
