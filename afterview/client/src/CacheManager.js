/*
 * Class that handles updating and retrieving values from the browser localStorage
 * author@ sean
 * TODO handle possibility of key not being update by the time value is retrieved
 */

// Create list of acceptable keys and freeze it (make elements immutable)
let key_enums = {
  TRIP_NAMES: {key: 'trip_names', url: 'http://localhost:8080/trips/getAllTripNames'},
  TRIP_TYPES: {key: 'trip_types', url: 'http://localhost:8080/trips/getUniqueTypes/'},
  TRIP_STATES: {key: 'trip_states', url: 'http://localhost:8080/trips/getUniqueStates/'},
  TRIP_COUNTRIES: {key: 'trip_countries', url: 'http://localhost:8080/trips/getUniqueCountries/'},
  TRIP_NAME_TYPE_STATE_COUNTRY: {key: 'trip_name_state_type_country', url: 'http://localhost:8080/trips/getAllNameTypeStateCountry'}
};
Object.freeze( key_enums );

class CacheManager {
  constructor() {
    this.storage_available = window.localStorage;
  }

  // Returns available self
  static get KENUMS() {
    return key_enums;
  }

  // Throws custom error: TODO make better
  static throwCKError() {
    throw new Error( 'Browser storage unavailable or wrong key was used' );
  }

  // Updates the keys value in the browsers localStorage
  updateKey( kenum, value ) {
    ( this.storage_available && key_enums.hasOwnProperty( kenum ) ) ? localStorage.setItem( key_enums[kenum].key, JSON.stringify( value ) ) : CacheManager.throwCKError()
  }

  // Returns the current value of the key
  getValue( kenum ) {
    return ( ( this.storage_available && key_enums.hasOwnProperty( kenum ) ) ? JSON.parse( localStorage.getItem( key_enums[kenum].key ) ) : CacheManager.throwCKError() )
  }
}

export default CacheManager;
