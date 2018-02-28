/*
 * Class that handles making GET requests to api
 * author@ sean
 */

// Imports
import RequestHandler from './RequestHandler';

/*
 * Private class function that should not be directly accessible from instances of class
 * Current standards don't support private class functions
 * Attaches listener for onreadystatechange which resolves/rejects promise once complete
 */
function dataLoadingListener( request ) {
  return new Promise( function( resolve, reject) {
    // Attach event listener
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

class GETRequestHandler extends RequestHandler {
  constructor() {
    super();
    this.type = "GET";
  }
  // Send the request
  async getData( url ) {
    let response;

    // Open request and attach event listener
    try {
      this.xhr.open( this.type, url, true );
      response = await dataLoadingListener( this.xhr );
    } catch( e ) {
      console.log( 'error: ', e );
    }
    console.log( 'GET', response );
    return JSON.parse( response );
  }
}

export default GETRequestHandler;
