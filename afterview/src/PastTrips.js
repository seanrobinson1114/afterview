/*
 * Class handling rendering of elements for past trips section of site
 * author@ sean
 */

// Imports
import React, { Component } from 'react';
import TripFilter from './TripFilter';
import TripList from './TripList';

class PastTrips extends Component {
  constructor(props) {
    super(props);

    // Filter lists
    this.types = ['type1', 'type2' ];
    this.states = ['state1', 'state2'];
    this.countries = ['country1', 'country2'];

    // Trip list
    this.trips = ['trip1', 'trip2', 'trip3', 'trip4', 'trip5', 'trip6', 'trip7', 'trip8', 'trip9', 'trip10'];
  }

  render() {
    return (
      <div>
        <div className="filters">
          <TripFilter title="State" values={this.states}/>
          <TripFilter title="Country" values={this.countries}/>
          <TripFilter title="Type" values={this.types}/>
        </div>
        <div>
          <TripList trips={this.trips}/>
        </div>
      </div>
    );
  }
}

export default PastTrips;
