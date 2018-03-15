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
    start_date: {
      type: String,
      required: 'Departure date',
      uppercase: true
    },
    end_date: {
      type: String,
      required: 'Return date'
    },
    country: {
      type: String,
      required: 'Destination country'
    },
    region: {
      type: String,
      required: 'Destination region'
    },
    type: {
      type: String,
      required: 'Activity type'
    }
  },
  // Specify existing collection to use
  {
    collection : 'scheduled_trips'
  })
);
