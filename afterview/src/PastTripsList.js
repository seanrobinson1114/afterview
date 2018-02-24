/*
 * Class describing component that lists all past trips not filtered out
 */

// Imports
import React, { Component } from 'react';
import TripFilter from './TripFilter'

// Class definition
class PastTripsList extends Component {
  // render
  render() {
    return (
      <div className="filters">
        <TripFilter title="Type"/>
        <TripFilter title="State"/>
        <TripFilter title="Country"/>
      </div>
    );
  }
}

// Export class
export default PastTripsList;
