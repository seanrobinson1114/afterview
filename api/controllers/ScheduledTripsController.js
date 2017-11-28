/*
 * Contains all functions/queries that will be exposed through restful endpoints for scheduled_trips collection
 * author@ robinson
 */

'use strict';

const mongoose = require( 'mongoose' ),
    ScheduledTrip = mongoose.model( 'ScheduledTrips' ),
    fs = require( 'fs' );

// Define object to be exported
module.exports =
{
  // Returns all scheduled trips
  listAllTrips: function( request, response )
  {
    ScheduledTrip.find( {},
      function( error, trip )
      {
        if( error )
          response.send( error );

      response.json( trip );
      }
    );
  },
  // Returns the total number of trips
  getNumberOfTrips: function( request, response )
  {
    ScheduledTrip.find().distinct( 'name' ).count(
      function( error, total )
      {
        if( error )
          response.send( error );

        response.json( total );
      }
    );
  },
  // Returns the duration of requested trip
  getDuration: function( request, response )
  {
    ScheduledTrip.find( {"name": request.params.tripName}, 'duration',
      function( error, duration )
      {
        if( error )
          response.send( error );

        response.json( duration[0].get( 'duration' ) );
      }
    );
  },
  // Returns the number of people on requested trip
  getPeople: function( request, response )
  {
    ScheduledTrip.find( {"name": request.params.tripName}, 'people',
      function( error, people )
      {
        if( error )
          response.send( error );

        response.json( people[0].get( 'people' ) );
      }
    );
  }
};
