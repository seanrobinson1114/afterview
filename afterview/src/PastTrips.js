/*
 * Class handling rendering of elements for past trips section of site
 * author@ sean
 */

// Imports
import React, { Component } from 'react';
import TripFilter from './TripFilter';
import TripList from './TripList';

import RequestHandler from './RequestHandler';

class PastTrips extends Component {
  constructor(props) {
    super(props);

    // Filter lists
    this.types = ['type1', 'type2' ];
    this.states = ['state1', 'state2'];
    this.countries = ['country1', 'country2'];
  }

  componentDidMount() {
    // Create new request handler for getting all trip names and send request
    let req_handler = new RequestHandler( "GET", "https://afterview-190318.appspot.com/trips/getAllTripNames/" );
    const self = this;
    if( !this.state ) {
      if( !window.localStorage.getItem( 'trip_names' ) ) {
        req_handler.getData().then( res => { self.setState( {trips: JSON.parse( res ) } ); localStorage.setItem( 'trip_names', res ); } );
      }
      else {
        self.setState( { trips: JSON.parse( localStorage.getItem( 'trip_names' ) ) } );
      }
    }
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
        { this.state && this.state.trips &&
            <TripList trips={this.state.trips}/>
        }
        </div>
      </div>
    );
  }
}

export default PastTrips;
