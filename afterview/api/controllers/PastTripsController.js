/*
 * Contains all functions/queries that will be exposed through restful endpoints for past_trips collection
 * author@ sean
 */

const mongoose = require( 'mongoose' ),
      PastTrip = mongoose.model( 'PastTrips' ),
      fs = require( 'fs' ),
      https = require( 'https' );

// Define object that will be exported
module.exports = {
  // Returns all trips in collection
  listAllTrips: ( request, response ) => {
    PastTrip.find( {}, ( error, trip ) => {
      if( error )
        response.send( error );

      response.json( trip );
    });
  },
  // Returns all trips with their associated type, state, and country
  listAllTripNameTypeStateCountry: ( request, response ) => {
    PastTrip.find( {}, ( error, trips ) => {
      let obj = {};

      if( error )
        response.send( error );

      trips.forEach( ( trip ) => {
        obj[trip.name] = {type: trip.type, state: trip.state, country: trip.country};
      });

      response.json( obj );
    });
  },
  // Returns all pictures for specified trip
  listAllPicturesFromTrip: ( request, response_ini ) => {
    let images = [],
        image_url = 'https://content.googleapi.com/storage/v1/b/afterview-image/o?prefix=images/' + request.params.tripName;

    https.get( image_url, ( response ) => {
      let image_names = [],
          data = '';

      response.on( 'data', ( chunk ) => {
        process.stdout.write( chunk );
        console.log( '\n' );
        data += chunk.toString();
      });

      response.on( 'end', () => {
        let temp = JSON.parse( data );
        for( let i = 0; i < temp.items.length; ++i )
        {
          let split_str = temp.items[i].name.split( '/' );
          image_names.push( split_str[split_str.length - 1] );
        }
        console.log( 'image_names', image_names );
        response_ini.json( image_names );
      });
    },
    ( response ) => {
      console.log( 'error retrieving list of images from google clould storage' );
    });
  },
  // Returns list of all trip names
  listAllTripNames: ( request, response ) => {
    PastTrip.find().distinct( 'name', ( error, names ) => {
      if( error )
        response.send( error );

        response.json( names );
    });
  },
  // Returns list of all trip types
  listAllTripTypes: ( request, response ) => {
    PastTrip.find().distinct( 'type', ( error, types ) => {
      if( error )
        response.send( error );

        response.json( types );
    });
  },
  // Returns list of all trips states
  listAllTripStates: ( request, response ) => {
    PastTrip.find().distinct( 'state', ( error, states ) => {
      if( error )
        response.send( error );

        response.json( states );
    });
  },
  // Returns list of unique countries
  listAllTripCountries: ( request, response ) => {
    PastTrip.find().distinct( 'country', ( error, countries ) => {
      if( error )
        response.send( error );

        response.json( countries );
    });
  },
  // Returns the total number of trips
  getNumberOfTrips: ( request, response ) => {
    PastTrip.find().distinct( 'name' ).count( ( error, total ) => {
      if( error )
        response.send( error );

        response.json( total );
    });
  },
  // Returns the number of states visited
  getNumberOfStates: ( request, response ) => {
    PastTrip.find().distinct( 'state' ).count( ( error, total ) => {
      if( error )
        response.send( error );

        response.json( total );
    });
  },
  // Returns the duration of requested trip
  getDuration: ( request, response ) => {
    PastTrip.find( {"name": request.params.tripName}, 'details.duration', ( error, duration ) => {
      if( error )
        response.send( error );

        response.json( duration[0].get( 'details.duration' ) );
    });
  },
  // Returns the number of people on requested trip
  getPeople: ( request, response ) => {
    PastTrip.find( {"name": request.params.tripName}, 'details.people', ( error, people ) => {
      if( error )
        response.send( error );

        response.json( people[0].get( 'details.people' ) );
    });
  }
};
