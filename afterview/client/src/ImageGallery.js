/*
 * Class describing component that displays images
 */

// Imports
import React, { Component } from 'react';

class ImageGallery extends Component {
  constructor( props ) {
    super( props );

  }

  render() {
    return (
      <div> {this.props.tripName} </div>
    );
  }
}

// Export class
export default ImageGallery;
