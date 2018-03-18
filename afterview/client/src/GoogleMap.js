/*
 * Google map component for a displaying past trip info
 * author@ sean
 */

// Imports
import React, { Component } from 'react';
import { Map, Marker, InfoWindow, GoogleApiWrapper } from 'google-maps-react';

export class GoogleMap extends Component {
  constructor( props ) {
    super( props );

    // this.loadMarkers = this.loadMarkers.bind( this );
  }

  // // Load all the markers
  // loadMarkers() {
  //
  // }

  render() {
    return(
      <Map google={this.props.google}
           zoom={3}
           initialCenter={{lat: 48,lng: -60}}
           style={{width: '100%', height: '75vh', position: 'relative'}}
           onReady={this.loadMarkers}>

           {this.props.visitedLocations.map( (vloc, i) => <Marker key={i} title={vloc.location} position={vloc.coord}/>)}
      </Map>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: 'AIzaSyCYKMnirszCM6eP2lAvpzgf5bwUcvPvLbc'
})(GoogleMap)
