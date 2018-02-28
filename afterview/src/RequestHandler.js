/*
 * Class that handles making ajax requests to api
 * author@ sean
 */

class RequestHandler {
  constructor() {
    this.xhr = new XMLHttpRequest();
  }

  // Send the request
  async getData( url ) {
    throw new Error( 'Subclass must override this method' );
  }
}

// Export RequestHandler class for accessibility through import
export default RequestHandler;
