/*
 * Contains all queries that will be exposed through restful endpoints for visited_locations collection
 * author@ sean
 */

const mongoose = require( 'mongoose' ),
      VisitedLocation = mongoose.model( 'VisitedLocations' );

// Define object to be exported
module.exports =
{
  // Returns all trips in collection
  listAllVisitedLocations: ( request, response ) => {
    VisitedLocation.find( {}, ( error, trip ) => {
      if( error )
        response.send( error );

        response.json( trip );
    });
  },
  // Get number of locations visited_locations
  getNumberOfVLocations: ( request, response ) => {
    VisitedLocation.find().distinct( 'location' ).count( ( error, total ) => {
      if( error )
        response.send( error );

        response.json( total );
    });
  }
};
