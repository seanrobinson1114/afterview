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

  // Get the failure string
  static get FAILURE_STRING() {
    return 'failed to load any data';
  }
}

// Export RequestHandler class for accessibility through import
export default RequestHandler;
