/*
 * Class describing component that lists all past trips not filtered out
 * author@ sean
 */

// Imports
import React, { Component } from 'react';

class TripList extends Component {
  constructor( props ) {
    super( props );

    this.state = {filtered_trips: this.props.trips};
  }

  // Invoked before mounted component receives new props
  // TODO possibly move to shouldComponentUpdate -> new filter may result in exact same list of trips?
  componentWillReceiveProps( new_props ) {
    console.log( 'new props', new_props );

    // TODO perform filter and set state
    // this.setState( {filtered_trips: } );
  }

  render() {
    return (
      <div>
        {this.state.filtered_trips.map((trip, i) => <button key={i}> {trip} </button>)}
      </div>
    );
  }
}

// Export class
export default TripList;
