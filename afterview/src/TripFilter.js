/*
 * Class describing component for a trip filter
 * author@ sean
 */

// Imports
import React, { Component } from 'react';
import './App.css';

class TripFilter extends Component {
  constructor( props ) {
    super( props );

    // Bind function to 'this' scope so it can be used in render function
    this.selectionHandler = this.selectionHandler.bind( this );
  }

  // Calls parent component function when dropdown selection is made
  selectionHandler( event ) {
    this.props.filterChange( this.props.title.toLowerCase(), event.target.value );
  }

  render() {
    return (
      <div>
        <div className="filter">
          <span> {this.props.title} </span>
          <div>
            <select onChange={this.selectionHandler}>
              {this.props.values.map((value, i) => <option value={value} key={i}> {value} </option>)}
            </select>
          </div>
        </div>
      </div>
    );
  }
}

// Export class
export default TripFilter;
