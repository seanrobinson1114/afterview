/*
 * Contains schema definition for past_trips collection
 * author@ robinson
 */

'use strict';

const mongoose = require( 'mongoose' ),
      Schema = mongoose.Schema;

// Define and export the schema definition
module.exports = mongoose.model( 'PastTrips',
  new Schema(
  {
    type:
    {
      type: String,
      required: 'Type of trip',
      uppercase: true
    },
    state:
    {
      type: String,
      required: 'State occured in',
      uppercase: true
    },
    name:
    {
      type: String,
      required: 'Name of picture directory'
    }
  },
  // Specify existing collection to use
  {
    collection : 'past_trips'
  })
);
