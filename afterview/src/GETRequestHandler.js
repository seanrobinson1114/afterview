/*
 * Class that handles making GET requests to api
 * author@ sean
 */

// Imports
import RequestHandler from './RequestHandler';

/*
 * Private class functions that should not be directly accessible from instances of class
 * Current standards don't support private class functions
 */

// Attaches all listeners to request and sends request
function attachListeners( request ) {
  return new Promise( ( resolve, reject ) => {
    attachDataLoadedListener( request, resolve );
    attachErrorOccuredListener( request, reject );

    // Send the request
    request.send();
  });
}

// Attaches listener for onload (request complete) event
function attachDataLoadedListener( request, resolve ) {
  request.onload = () => {
    console.log( 'all data finished loading' );
    resolve( request.responseText );
  }
}
console.log( 'request rejected' )
// Attaches listener for onerror (error occured) event
function attachErrorOccuredListener( request, reject ) {
  request.onerror = () => {
    console.log( 'error occured listener triggered', request.response );
    reject( request.responseText );
  }
}

class GETRequestHandler extends RequestHandler {
  constructor() {
    super();
    this.type = 'GET';
  }
  // Send the request
  async getData( url ) {
    let response;

    // Open request and attach event listener
    try {
      this.xhr.open( this.type, url, true );
      response = await attachListeners( this.xhr );
    } catch( e ) {
      console.log( 'GET request ERROR: ', e );
    }
    return ( response ? JSON.parse( response ) : [RequestHandler.FAILURE_STRING] );
  }
}

export default GETRequestHandler;
