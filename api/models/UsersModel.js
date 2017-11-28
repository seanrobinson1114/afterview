/*
 * Contains schema definition for users collection
 * author@ robinson
 */

'use strict';

const mongoose = require( 'mongoose' ),
      Schema = mongoose.Schema;

// Define and export the schema definition
module.exports = mongoose.model( 'Users',
  new Schema(
  {
    username:
    {
      type: String,
      required: 'alias for user'
    },
    creds:
    {
      type: Schema.Types.Mixed,
      required: 'salt and hash'
    }
  },
  // Specify existing collection to use
  {
    collection : 'users'
  })
);
