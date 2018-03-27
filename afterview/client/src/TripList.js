/*
 * Class describing component that lists all past trips not filtered out
 * author@ sean
 */

// Imports
import React, { Component } from 'react';
import CacheManager from './CacheManager';
import { ButtonGroup, Button } from 'react-bootstrap';

class TripList extends Component {
  constructor( props ) {
    super( props );

    this.cache_manager = new CacheManager();
    this.state = {filtered_trips: this.props.trips};

    // Bind functions to 'this' scope
    this.filterTrips = this.filterTrips.bind( this );
    this.selectionHandler = this.selectionHandler.bind( this );
  }

  // Calls parent component function when trip selection is made
  selectionHandler( trip_name ) {
    this.props.tripSelection( trip_name );
  }

  // Performs filter on trip list and sets the state
  filterTrips( type = 'All', state = 'All', country = 'All') {
    let display_trips = [];

    for( let trip_name of this.props.trips ) {
      console.log( this.props.filterObj[trip_name] );
      if( ( this.props.filterObj[trip_name].type === type || type === 'All' ) &&
          ( this.props.filterObj[trip_name].state === state || state === 'All' ) &&
          ( this.props.filterObj[trip_name].country === country || country === 'All' ) ) {
            display_trips.push( trip_name );
      }
    }

    // Set the state
    this.setState( {filtered_trips: display_trips} );
  }

  // Invoked before mounted component receives new props
  componentWillReceiveProps( new_props ) {
    // Filter the trip list
    console.log( new_props );
    this.filterTrips( new_props.typeFilter,
                      new_props.stateFilter,
                      new_props.countryFilter );
  }

  render() {
    return (
      <div className="buttons">
        <ButtonGroup vertical block>
          {this.state.filtered_trips.map((trip, i) => <Button bsSize="large" key={i} onClick={() => this.selectionHandler(trip)}> {trip} </Button>)}
        </ButtonGroup>
      </div>
    );
  }
}

// Export class
export default TripList;
