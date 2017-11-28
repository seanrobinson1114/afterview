/*
 * Contains schema definition for visited_locations collection
 * author@ robinson
 */

'use strict';

const mongoose = require( 'mongoose' ),
      Schema = mongoose.Schema;

// Define and export the schema definition
module.exports = mongoose.model( 'VisitedLocations',
  new Schema(
  {
    location:
    {
      type: String,
      required: 'Location of trip',
      uppercase: true
    },
    coord:
    {
      type: Schema.Types.Mixed,
      required: 'Lat and Lng of location'
    },
    trips:
    {
      type: Array,
      required: 'Trips associated with this location'
    }
  },
  // Specify existing collection to use
  {
    collection : 'visited_locations'
  })
);
