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
    this.image_count = 0;
    this.state= {images_ready: false};

    // Bind functions
    this.imageLoaded = this.imageLoaded.bind( this );
  }

  // Called on every successful image load
  imageLoaded() {
    this.image_count++;
    console.log( 'image loaded ', this.image_count );
    console.log( 'total images ', this.props.imageNames.length );

    // Check if all images are loaded
    if( this.image_count === this.props.imageNames.length )
      this.setState( {images_ready: true} );
  }

  //Invoked before mounted component receives new props
  componentWillReceiveProps( new_props ) {
    console.log( 'props', this.props );
    console.log( 'new props', new_props );
    this.image_url = 'https://storage.googleapis.com/afterview-image/images/' + new_props.tripName;
    this.setState( {images_ready: false} );
    this.image_count = 0;
  }

  render() {
    return (
      <div>
        { !this.state.images_ready &&
          <div> Loading </div>
        }
        <div className={(this.state.images_ready? 'ready' : 'loading')}>
          <div> {this.props.tripName} </div>
            {this.props.imageNames.map((image_name, i) => <div key={i}> <img src={this.image_url+'/'+image_name} onLoad={this.imageLoaded} alt={image_name}/> </div>)}
        </div>
      </div>
    );
  }
}

// Export class
export default ImageGallery;
