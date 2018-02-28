/*
 * Class handling rendering of elements for past trips section of site
 * author@ sean
 */

// Imports
import React, { Component } from 'react';
import TripFilter from './TripFilter';
import TripList from './TripList';
import GETRequestHandler from './GETRequestHandler';
import CacheManager from './CacheManager';

/*
 * Private class function that should not be directly accessible from instances of class
 * Current standards don't support private class functions
 * Make remote request to retrieve data from api and set the state
 * Helpful Note: the [] around kenum_value.key when setting the state are used to compute the value of the variable and use it as a property name
 */
function makeRequestSetState( kenum ) {
  let self = this;
  let kenum_value = CacheManager.KENUMS[kenum];

  if( !self.state ) {
    // Send request for getting all trip names
    if( !self.cache_manager.getValue( kenum ) ) {
      new GETRequestHandler().getData( kenum_value.url ).then( data => {
        self.setState( {[kenum_value.key]: data} );
        // TODO decide what to do if cache is not successful: don't update state?
        self.cache_manager.updateKey( kenum, data );
      });
    }
    else {
      self.setState( {[kenum_value.key]: self.cache_manager.getValue( kenum ) } );
    }
  }
}

class PastTrips extends Component {
  constructor(props) {
    super(props);

    // Creat ajax GET and cache handlers
    this.cache_manager = new CacheManager();
  }

  // Invoked immediately after component is mounted
  componentDidMount() {
    const self = this;

    // Bind the makeRequestSetState function to the current scope
    var makeRequestSetStateBound = makeRequestSetState.bind( this );

    // Loop through every available key
    for( let kenum in CacheManager.KENUMS ) {
      makeRequestSetStateBound( kenum );
    }
  }

  render() {
    console.log( 'state', this.state );
    return (
      <div>
        <div className="filters">
          { this.state && this.state.trip_types &&
              <TripFilter title="Type" values={this.state.trip_types}/>
          }
          { this.state && this.state.trip_states &&
              <TripFilter title="State" values={this.state.trip_states}/>
          }
          { this.state && this.state.trip_countries &&
              <TripFilter title="Country" values={this.state.trip_countries}/>
          }
        </div>
        <div>
        { this.state && this.state.trip_names &&
            <TripList trips={this.state.trip_names}/>
        }
        </div>
      </div>
    );
  }
}

export default PastTrips;
