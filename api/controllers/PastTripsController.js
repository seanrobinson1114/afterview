/*
 * Contains all functions/queries that will be exposed through restful endpoints for past_trips collection
 * author@ robinson
 */

'use strict';

const mongoose = require( 'mongoose' ),
    PastTrip = mongoose.model( 'PastTrips' ),
    fs = require( 'fs' ),
    https = require( 'https' );

// Define object to be exported
module.exports =
{
  // Returns all trips in collection
  listAllTrips: function( request, response )
  {
    PastTrip.find( {},
      function( error, trip )
      {
        if( error )
          response.send( error );

      response.json( trip );
      }
    );
  },
  // Returns all pictures for specified trip
  listAllPicturesFromTrip: function( request, response_ini )
  {
    var images = [];
    https.get( 'https://content.googleapis.com/storage/v1/b/afterview-image/o?prefix=images/' + request.params.tripName,
      function( response )
      {
        var image_names = [];
        var data = '';

        response.on( 'data',
          function( chunk )
          {
            process.stdout.write( chunk );
            console.log( '\n' );
            data += chunk.toString();
          }
        );
        response.on( 'end',
          function()
          {
            let temp = JSON.parse( data );
            for( let i = 0; i < temp.items.length; ++i )
            {
              let split_str = temp.items[i].name.split( '/' );
              image_names.push( split_str[split_str.length - 1] );
            }
            console.log( 'image_names', image_names );
            response_ini.json( image_names );
          }
        );
      },
      function error( response )
      {
        console.log( 'error retrieving list of images from google clould storage' );
      }
    );

    // var images = [];
    // fs.readdir( './public/images/' + request.params.tripName + '/',
    //   function( error, files )
    //   {
    //     files.forEach(
    //       function( file )
    //       {
    //         images.push( file );
    //       }
    //     );
    //     response.json( images );
    //   }
    // );
  },
  // Returns list of all trip names
  listAllTripNames: function( request, response )
  {
    PastTrip.find().distinct( 'name',
      function( error, names )
      {
        if( error )
          response.send( error );

        response.json( names );
      }
    );
  },
  // Returns list of all trip types
  listAllTripTypes: function( request, response )
  {
    PastTrip.find().distinct( 'type',
      function( error, types )
      {
        if( error )
          response.send( error );

        response.json( types );
      }
    );
  },
  // Returns list of all trips states
  listAllTripStates: function( request, response )
  {
    PastTrip.find().distinct( 'state',
      function( error, states )
      {
        if( error )
          response.send( error );

        response.json( states );
      }
    );
  },
  // Returns list of unique countries
  listAllTripCountries: function( request, response )
  {
    PastTrip.find().distinct( 'country',
      function( error, countries )
      {
        if( error )
          response.send( error );

        response.json( countries );
      }
    );
  },
  // Returns the total number of trips
  getNumberOfTrips: function( request, response )
  {
    PastTrip.find().distinct( 'name' ).count(
      function( error, total )
      {
        if( error )
          response.send( error );

        response.json( total );
      }
    );
  },
  // Returns the number of states visited
  getNumberOfStates: function( request, response )
  {
    PastTrip.find().distinct( 'state' ).count(
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
    PastTrip.find( {"name": request.params.tripName}, 'details.duration',
      function( error, duration )
      {
        if( error )
          response.send( error );

        response.json( duration[0].get( 'details.duration' ) );
      }
    );
  },
  // Returns the number of people on requested trip
  getPeople: function( request, response )
  {
    PastTrip.find( {"name": request.params.tripName}, 'details.people',
      function( error, people )
      {
        if( error )
          response.send( error );

        response.json( people[0].get( 'details.people' ) );
      }
    );
  }
};
