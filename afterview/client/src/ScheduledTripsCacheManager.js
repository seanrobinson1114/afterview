/*
 * Class that handles updating and retrieving values from the browser
 * author@ alex
 */

// Imports
import GETRequestHandler from './GETRequestHandler';

// Frozen objects of fixed cache keys and urls
let static_data_enums = {
  TRIP_NAMES: {key: 'scheduled_trip_names', url: 'http://localhost:8080/schdtrips/getAllTripNames'}
};
Object.freeze( static_data_enums );

/* 
 * Private class function
 * Make remote requests to retrieve data from static sections of api.
 */
function makeRequestAndGetStaticData( sd_enum ) {
  let sd_enum_props = static_data_enums[sd_enum];

  return new GETRequestHandler().getData( sd_enum_props.url ).then( data => {
    if( data !== GETRequestHandler.FAILURE_STRING ) {
      return data;
    }
  });
}

class ScheduledTripsCacheManager {
  constructor() {
    this.storage_available = window.localStorage;
  }

  // Returns all static data enums
  static get staticDataEnums() {
    return static_data_enums;
  }

  // Return the current value of a static data enum
  getStaticValue( sd_enum ) {
    if( this.storage_available && ScheduledTripsCacheManager.staticDataEnums.hasOwnProperty( sd_enum ) )
      return JSON.parse( localStorage.getItem( ScheduledTripsCacheManager.staticDataEnums[sd_enum].key ) )

    throw new Error( 'Browser storage unavailable or wrong key was used!' );
  }

  /*
   * Load all static data and store in the browser's localStorage. 
   * If data corresponding to an enum already exists in the browser's 
   * localStorage the load request will be ignored for that enum.
   * 
   */
  loadStaticValues() {
    if( this.storage_available ) {
      for( let sd_enum in ScheduledTripsCacheManager.staticDataEnums ) {
        if( !localStorage.getItem( ScheduledTripsCacheManager.staticDataEnums[sd_enum].key ) ) {
          return makeRequestAndGetStaticData( sd_enum ).then( ( response ) => {
            localStorage.setItem( ScheduledTripsCacheManager.staticDataEnums[sd_enum].key, JSON.stringify( response ) );
          });
        }
        else
          return new Promise( (resolve, reject ) => { resolve() } );
      }
    }
    else
      throw new Error( 'Browser storage unavailable' );
  }

  /*
   * Updates the static data in the browser's localStorage.
   * This will force a reload of all static data. It should only be called
   * when the static data is changed (e.g. after database posts)
   */
  updateStaticValues() {
    //if( this.storage_available ) {
    if( window.localStorage ) {
      for( let sd_enum in ScheduledTripsCacheManager.staticDataEnums ) {
        return makeRequestAndGetStaticData( sd_enum ).then( ( response ) => {
          localStorage.setItem( ScheduledTripsCacheManager.staticDataEnums[sd_enum].key, JSON.stringify( response ) );
        });
      }
    }
    else
      throw new Error( 'Browser storage unavailable' );
  }

  // Return the current value of a key
  getValue( key ) {
    if( this.storage_available ) {
      return JSON.parse( localStorage.getItem( key ) );
    }

    throw new Error( 'Browser storage unavailble!' );
  }

  // Set the value of a key
  setValue( key, value ) {
    if( this.storage_available ) {
      localStorage.setItem( key, JSON.stringify( value ) )
    }
    else
      throw new Error( 'Browser storage unavailable!' );
  }
}

export default ScheduledTripsCacheManager;
