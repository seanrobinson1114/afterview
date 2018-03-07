/*
 * Contains schema definition for scheduled_trips collection
 * author@ sean
 */

const mongoose = require( 'mongoose' ),
      Schema = mongoose.Schema;

// Define and export the schema definition
module.exports = mongoose.model( 'ScheduledTrips',
  new Schema( {
    name: {
      type: String,
      required: 'Name of trip',
    },
    departure_date: {
      type: String,
      required: 'Departure date',
      uppercase: true
    },
    return_date: {
      type: String,
      required: 'Return date'
    }
  },
  // Specify existing collection to use
  {
    collection : 'scheduled_trips'
  })
);
