/*
 * Class describing component that displays images
 */

// Imports
import React, { Component } from 'react';
import GETRequestHandler from './GETRequestHandler';
import CacheManager from './CacheManager';

class ImageGallery extends Component {
  constructor( props ) {
    super( props );

    // const url = 'https://storage.googleapi.com/afterview-image/images/';
    this.url = 'http://localhost:8080/trips/getImagesForTrip/';
    this.cache_manager = new CacheManager();
  }

  // Invoked before mounted component receives new props
  componentWillReceiveProps( new_props ) {
    let self = this;

    // Get image names for the trip
    if( !self.cache_manager.getValue( new_props.tripName + '_image_names' ) ) {
      new GETRequestHandler().getData( this.url + new_props.tripName).then( data => {
        if( data !== GETRequestHandler.FAILURE_STRING ) {
          self.cache_manager.updateKey( new_props.tripName + '_image_names', data );
          console.log( 'image_names\n', data );
        }
        else {
          // TODO
        }
      });
    }
    else {
      let temp = self.cache_manager.getValue( new_props.tripName + '_image_names' );
      console.log( 'image_names\n', temp );
    }
  }

  render() {
    return (
      <div> {this.props.tripName} </div>
    );
  }
}

// Export class
export default ImageGallery;
