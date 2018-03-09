/*
 * Contains all queries that will be exposed through restful endpoints for scheduled_trips collection
 * author@ sean
 */

const mongoose = require( 'mongoose' ),
      ScheduledTrip = mongoose.model( 'ScheduledTrips' ),
      fs = require( 'fs' );

// Define object that will be exported
module.exports = {
  // Returns all scheduled trips
  listAllTrips: ( request, response ) => {
    ScheduledTrip.find( {}, ( error, trip ) => {
      if( error )
        response.send( error );

      response.json( trip );
    });
  },
  // Returns the total number of trips
  getNumberOfTrips: ( request, response ) => {
    ScheduledTrip.find().distinct( 'name' ).count( ( error, total ) => {
      if( error )
        response.send( error );

        response.json( total );
    });
  },
  // Returns the duration of requested trip
  getDuration: ( request, response ) => {
    ScheduledTrip.find( {"name": request.params.tripName}, 'duration', ( error, duration ) => {
      if( error )
        response.send( error );

        response.json( duration[0].get( 'duration' ) );
    });
  },
  // Returns the number of people on requested trip
  getPeople: ( request, response ) => {
    ScheduledTrip.find( {"name": request.params.tripName}, 'people', ( error, people ) => {
      if( error )
        response.send( error );

        response.json( people[0].get( 'people' ) );
    });
  }
};