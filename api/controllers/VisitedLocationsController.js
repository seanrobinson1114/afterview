/*
 * Contains all functions/queries that will be exposed through restful endpoints for visited_locations collection
 * author@ robinson
 */

'use strict';

const mongoose = require( 'mongoose' ),
    VisitedLocation = mongoose.model( 'VisitedLocations' );

// Define object to be exported
module.exports =
{
  // Returns all trips in collection
  listAllVisitedLocations: function( request, response )
  {
    VisitedLocation.find( {},
      function( error, trip )
      {
        if( error )
          response.send( error );

        response.json( trip );
      }
    );
  },
  // Get number of locations visited_locations
  getNumberOfVLocations: function( request, response )
  {
    VisitedLocation.find().distinct( 'location' ).count(
      function( error, total )
      {
        if( error )
          response.send( error );

        response.json( total );
      }
    );
  }
};
