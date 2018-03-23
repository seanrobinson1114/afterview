/*
 * Class handling rendering of elements for scheduled trips of site
 * author@ alex, sean
 */

// Imports
import React, { Component } from 'react';
import NewTripForm from './NewTripForm';
import ScheduledTripsCacheManager from './ScheduledTripsCacheManager';
import ScheduledTrip from './ScheduledTrip';

class ScheduledTrips extends Component {
  constructor( props ) {
    super( props );

    // Create cache
    this.cache_manager = new ScheduledTripsCacheManager();

    // Bind functions
    this.updateState = this.updateState.bind( this );
  }

  // Invoked immediately after component is mounted
  componentDidMount() {
    let self = this;
    this.cache_manager.loadStaticValues().then( () => {
      self.setState({
        trip_names: self.cache_manager.getStaticValue( "TRIP_NAMES" ),
        trip_types: self.cache_manager.getStaticValue( "TRIP_TYPES" )
      });
    });
  }

  updateState() {
    let self = this;
    this.cache_manager.updateStaticValues().then( () => {
      self.setState({
        'trip_names': self.cache_manager.getStaticValue( "TRIP_NAMES" )
      });
    });
  }

  render() {
    return (
      <div>
        <div>
        { this.state && this.state.trip_names &&
          this.state.trip_names.map((trip, i) => <ScheduledTrip key={i} name={trip}/>)
        }
        </div>
        { this.state && this.state.trip_types &&
          <NewTripForm onSaveSuccess={this.updateState} tripTypes={this.state.trip_types}/>
        }
      </div>
    );
  }
}

export default ScheduledTrips
