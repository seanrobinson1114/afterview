/*
 * Contains schema definition for past_trips collection
 * author@ sean
 */

const mongoose = require( 'mongoose' ),
      Schema = mongoose.Schema;

// Define and export the schema definition
module.exports = mongoose.model( 'PastTrips',
  new Schema( {
    type: {
      type: String,
      required: 'Type of trip',
      uppercase: true
    },
    state: {
      type: String,
      required: 'State occured in',
      uppercase: true
    },
    name: {
      type: String,
      required: 'Name of picture directory'
    },
    country: {
      type: String,
      required: 'Country occured in'
    }
  },
  // Specify existing collection to use
  {
    collection : 'past_trips'
  })
);
