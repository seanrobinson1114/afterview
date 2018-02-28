/*
 * Class that handles making ajax requests to api
 * author@ sean
 */

/*
 * Private class function that should not be directly accessible from instances of class
 * Current standards don't support private class functions
 * Attaches listener for onreadystatechange which resolves/rejects promise once complete
 */
function dataLoadingListener( request ) {
  return new Promise( function( resolve, reject) {
    request.onreadystatechange = () => {
      if( request.readyState === XMLHttpRequest.DONE && request.status === 200 ) {
        console.log( 'caught success event' );
        resolve( request.responseText );
      }
      else {
        console.log('caught fail event');
      }
    }
    // Send the request
    request.send();
  });
}

class RequestHandler {
  constructor( type, url ) {
    this.url = url;
    this.type = type;
    this.xhr = new XMLHttpRequest();
  }

  // Send the request
  async getData() {
    let response;

    // Open request and attach event listener
    try {
      this.xhr.open( this.type, this.url, true );
      response = await dataLoadingListener( this.xhr );
    } catch( e ) {
      console.log( 'error: ', e );
    }
    // console.log( 'ASYNC/AWAIT: ', response );
    return response;
  }
}

// Export RequestHandler class for accessibility through import
export default RequestHandler;
