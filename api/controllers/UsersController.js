/*
 * Contains all functions/queries that will be exposed through restful endpoints for users collection
 * author@ robinson
 */

'use strict';

const mongoose = require( 'mongoose' ),
      User = mongoose.model( 'Users' ),
      crypto = require( 'crypto' ),
      auth = require( 'basic-auth' );

// Use native promises
mongoose.Promise = global.Promise;

// Generate hex encoded salt with desired size
let genSalt = function( size )
{
  console.log( 'Generating salt with size ', size );

  return crypto.randomBytes( size ).toString( 'hex' );
}

// Function for hashing password
let hashPass = function( salt, password )
{
  console.log( 'Generating hashed password' );

  // Create hash and update with users password
  let hash = crypto.createHmac( 'sha512', salt );
  hash.update( password );

  return hash.digest( 'hex' );
}

// Define object to be exported
module.exports =
{
  // Check users credentials
  attemptLogin: function( username, password )
  {
    console.log( 'Checking users credentials for login' );

    return User.find( {"username": username} ).lean().exec().then(
      function success( user )
      {
        console.log( 'Retrieved response from User.find query' );

        // User found
        if( user.length > 0 )
        {
          if( hashPass( user[0].creds.salt.buffer, password ).toString() == user[0].creds.pass.buffer.toString()  )
          {
            console.log( 'Credentials Accepted! Permitting login' );

            return true;
          }
          // Incorrect password
          else {
            console.log( 'Invalid password! Denying login' );

            return false;
          }
        }
        // User not found
        else {
          console.log( 'Invalid username! Denying login' );

          return false;
        }
      },
      function error( response )
      {
        console.log( 'Error! Error occured while performing query for login' );
      }
    );
  },
  // Return the logged in username
  getLoggedInUsername: function( request, response )
  {
    console.log( 'Getting logged in username' );

    let user_cred = auth( request );
    response.json( user_cred.name );
  }
};
