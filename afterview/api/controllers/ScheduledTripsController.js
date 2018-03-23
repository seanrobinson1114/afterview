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
  // Returns all trip data
  getTripDetails: ( request, response ) => {
    ScheduledTrip.find( {'name': request.params.tripName}, ( error, trip ) => {
      if( error ) {
        console.log( error );
        response.send( error );
      }

      // TODO: This query needs to be updated so that you can only ever get
      //       one value returned.
      response.json( trip[0] );
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
  },
  // Returns list of all trip names
  listAllTripNames: ( request, response ) => {
    ScheduledTrip.find().distinct( 'name', ( error, names ) => {
      if( error )
        response.send( error )

        response.json( names );
    });
  },

  // Insert new Scheduled Trip
  addTrip: ( request, response ) => {
    let new_trip = {name: request.body.name,
                start_date: request.body.start_date,
                end_date: request.body.end_date,
                country: request.body.country,
                region: request.body.region,
                type: request.body.type};

    ScheduledTrip.create( new_trip, ( error ) => {
      if( error )
        response.send( error );

      else
        response.send( 'success' );
    });
  }
};
