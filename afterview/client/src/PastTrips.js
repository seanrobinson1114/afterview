/*
 * Class handling rendering of elements for past trips section of site
 * author@ sean
 */

// Imports
import React, { Component } from 'react';
import TripFilter from './TripFilter';
import TripList from './TripList';
import ImageGallery from './ImageGallery';
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
        if( data !== GETRequestHandler.FAILURE_STRING ) {
          self.setState( {[kenum_value.key]: data} );
          self.cache_manager.updateKey( kenum, data );
        }
        else {
          self.setState( {[kenum_value.key]: [data]} );
        }
      });
    }
    else {
      self.setState( {[kenum_value.key]: self.cache_manager.getValue( kenum ) } );
    }
  }
}

class PastTrips extends Component {
  constructor( props ) {
    super( props );

    // Creat ajax GET and cache handlers
    this.cache_manager = new CacheManager();

    // Bind functions to the scope to access using 'this' keyword
    this.notifyFilterChange = this.notifyFilterChange.bind( this );
    this.notifyTripSelection = this.notifyTripSelection.bind( this );
  }

  // Updates state with new filter value to trigger change in child components
  notifyFilterChange( filter, value ) {
    let key = filter + '_filter';
    this.setState( {[key]: value} );
  }

  // Updates state with selected trip to trigger change in child components
  notifyTripSelection( trip_name ) {
    this.setState( {selected_trip: trip_name} );
  }

  // Invoked immediately after component is mounted
  componentDidMount() {
    // Bind the makeRequestSetState function to the current scope
    let makeRequestSetStateBound = makeRequestSetState.bind( this );

    // Loop through every available key
    for( let kenum in CacheManager.KENUMS ) {
      makeRequestSetStateBound( kenum );
    }
  }

  render() {
    return (
      <div>
        <div className="filters">
          { this.state && this.state.trip_types &&
              <TripFilter title="Type" values={this.state.trip_types} filterChange={this.notifyFilterChange}/>
          }
          { this.state && this.state.trip_states &&
              <TripFilter title="State" values={this.state.trip_states} filterChange={this.notifyFilterChange}/>
          }
          { this.state && this.state.trip_countries &&
              <TripFilter title="Country" values={this.state.trip_countries} filterChange={this.notifyFilterChange}/>
          }
        </div>
        <div>
          { this.state && this.state.trip_names &&
              <TripList trips={this.state.trip_names}
                        typeFilter={this.state.type_filter}
                        stateFilter={this.state.state_filter}
                        countryFilter={this.state.country_filter}
                        tripSelection={this.notifyTripSelection}/>
          }
        </div>
        <div>
          { this.state && this.state.selected_trip &&
              <ImageGallery tripName={this.state.selected_trip}/>
          }
        </div>
      </div>
    );
  }
}

export default PastTrips;
