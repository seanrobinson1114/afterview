/*
 * Contains route information for application
 * author@ robinson
 */

'use strict';

module.exports = function( app )
{
  const PastTrips = require( '../controllers/PastTripsController' ),
        ScheduledTrips = require( '../controllers/ScheduledTripsController' ),
        VisitedLocations = require( '../controllers/VisitedLocationsController' ),
        Users = require( '../controllers/UsersController' ),
        auth = require( 'basic-auth' ),
        path = require( 'path' ),
        jwt = require( 'jsonwebtoken' ),
        crypto = require( 'crypto' ),
        gcs = require( '@google-cloud/storage' )();

  var jwt_info = {
    token: null,
    key: crypto.randomBytes( 16 ).toString( 'hex' )
  };

  // Authentication user
  var authenticate = ( request, response, next, valid_token = true ) => {
    console.log( 'Authenticating user' );

    // auth( request ) returns object with name and pass property parsed from authorization header
    let user_cred = auth( request );

    // Check if any required field is missing
    if( !user_cred || !user_cred.name || !user_cred.pass ) {
      console.log( 'Missing credentials! Denying login' );

      response.set( 'WWW-Authenticate', 'Basic realm=Standard Realm' );

      return response.sendStatus( 401 );
    }
    // Check user credentials
    else {
      Users.attemptLogin( user_cred.name, user_cred.pass ).then( ( login_status ) => {
        console.log( 'Retrieved response from credential check' );

        // Check return of credential check
        if( login_status ) {
          console.log( 'user is valid, returning initial request' );

          // Generate needed json web token info
          jwt_info.claims = {
            iss: user_cred.name
          };

          jwt_info.token = jwt.sign( jwt_info.claims, jwt_info.key, {expiresIn: '5h'} );

          // check if new token or next request should be returned
          if( valid_token )
            return next();

          else
            return response.status( 403 ).send( {new_token: jwt_info.token} );
        }
        else {
          response.set( 'WWW-Authenticate', 'Basic realm=Standard Realm' );

          return response.sendStatus( 401 );
        }
      });
    }
  };

  // Check users tokens
  var check_token = ( request, response, next ) => {
    console.log( 'Checking user token' );

    // Get token from header or url param and user info from auth header
    let token = request.headers['x-access-token'] || ( request.query && request.query.token );
    let decoded_token = jwt.decode( token );
    let user_cred = auth( request );

    if( token ) {
      jwt.verify( token.toString( 'hex' ), jwt_info.key, ( error, decoded ) => {
        // Expired token
        if( error && error.name === 'TokenExpiredError' )
        {
          // Redirect reponse to index.html, should re-authenticate
          console.log( 'ERROR Expired token', error );

          authenticate( request, response, next, false );
        }
        // Invalid token
        else if( error && error.message === 'invalid token' ) {
          console.log( 'ERROR Invalid token! ', false );

          authenticate( request, response, next, false );
        }
        // Invalid signature
        else if( error && error.message === 'invalid signature' ) {
          console.log( 'ERROR Invalid signature!', error );

          authenticate( request, response, next, false );
        }
        // Unexpected error
        else if( error ) {
          console.log( 'Error: unexpected', error );

          response.status( 403 ).send( 'unauthorized' );
        }
        // Valid token
        else if( decoded.iss === user_cred.name ) {
          console.log( 'Valid Token', decoded );

          next();
        }
      });
    }
    else {
      console.log( 'no token' );

      response.status( 403 ).send( 'unauthorized' );
    }
  };

  // Route users to index.html and authenticates client
  /*app.get( '/', authenticate, function( request, response )
  {
    response.sendFile( 'index.html', {root: path.join( __dirname, '../../public') } );
  });*/

  app.route( '/getToken' )
    .get( ( request, response ) => {
      response.json( jwt_info.token );
      // Reset token
      jwt_info.token = null;
    });

  // Prevent access to api calls if user doesn't have valid token
//  app.get( '/trips/*', check_token );
  // app.get( '/images/*', check_token );
  // app.get( '/uinf/*', check_token );
//  app.get( '/vlocations/*', check_token );

  // Get the username of person logged in
  app.route( '/uinf/uname' )
    .get( Users.getLoggedInUsername );

  // PastTrips Routes
  // Get all past trip objects
  app.route( '/trips' )
    .get( PastTrips.listAllTrips );

  // Get all trip names, types, states, and countries
  app.route( '/trips/getAllNameTypeStateCountry' )
    .get( PastTrips.listAllTripNameTypeStateCountry );

  // Get all picture names for specified trip
  app.route( '/trips/getImagesForTrip/:tripName' )
    .get( PastTrips.listAllPicturesFromTrip );

  // Get all trip names
  app.route( '/trips/getAllTripNames' )
    .get( PastTrips.listAllTripNames );

  // Get all unique trip types
  app.route( '/trips/getUniqueTypes' )
    .get( PastTrips.listAllTripTypes );

  // Get all unique trip states
  app.route( '/trips/getUniqueStates' )
    .get( PastTrips.listAllTripStates );

  // Get all unique countries from trips
  app.route( '/trips/getUniqueCountries' )
    .get( PastTrips.listAllTripCountries );

  // Get number of trips
  app.route( '/trips/getNumberOfTrips' )
    .get( PastTrips.getNumberOfTrips );

  // Get the number of states visited
  app.route( '/trips/getNumberOfStates' )
    .get( PastTrips.getNumberOfStates );

  // VisitedLocations Routes
  // Get all visited locations
  app.route( '/vlocations' )
    .get( VisitedLocations.listAllVisitedLocations );

  // Get the number of visited locations
  app.route( '/vlocations/getNumberOfLocations' )
    .get( VisitedLocations.getNumberOfVLocations );

  // Get the duration of requested trip
  app.route( '/trips/getDuration/:tripName' )
    .get( PastTrips.getDuration );

  // Get the people on the requested trip
  app.route( '/trips/getPeople/:tripName' )
    .get( PastTrips.getPeople );

  // ScheduleTrip routes
  // Get all scheduled trips
  app.route( '/schdtrips' )
    .get( ScheduledTrips.listAllTrips );

  // Get number of scheduled trips
  app.route( '/schdtrips/getNumberOfTrips' )
    .get( ScheduledTrips.getNumberOfTrips );

  // Get the duration of the selected trip
  app.route( '/schdtrips/getDuration/:tripName' )
    .get( ScheduledTrips.getDuration );

  // Get the people going on specified trips
  app.route( '/schdtrips/getPeople/:tripName' )
    .get( ScheduledTrips.getPeople );
};
