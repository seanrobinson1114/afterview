/*
 * Class describing component that displays images
 */

// Imports
import React, { Component } from 'react';

class ImageGallery extends Component {
  constructor( props ) {
    super( props );

    // this.url = 'http://localhost:8080/trips/getImagesForTrip/';
    this.image_url = 'https://storage.googleapis.com/afterview-image/images/' + props.tripName;
  }

  //Invoked before mounted component receives new props
  componentWillReceiveProps( new_props ) {
    console.log( 'props', this.props );
    console.log( 'new props', new_props );
    this.image_url = 'https://storage.googleapis.com/afterview-image/images/' + new_props.tripName;
  }

  render() {
    return (
      <div>
        <div> {this.props.tripName} </div>
        {this.props.imageNames.map((image_name, i) => <div key={i}> <img src={this.image_url+'/'+image_name} alt={image_name}/> </div>)}
      </div>
    );
  }
}

// Export class
export default ImageGallery;
