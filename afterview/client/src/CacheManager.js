/*
 * Class that handles updating and retrieving values from the browser localStorage
 * author@ sean
 * TODO handle possibility of key not being update by the time value is retrieved
 */

// Frozen object of fixed cache keys and urls, loaded on PastTrips Initialization
let key_enums = {
  TRIP_NAMES: {key: 'trip_names', url: 'http://localhost:8080/trips/getAllTripNames'},
  TRIP_TYPES: {key: 'trip_types', url: 'http://localhost:8080/trips/getUniqueTypes/'},
  TRIP_STATES: {key: 'trip_states', url: 'http://localhost:8080/trips/getUniqueStates/'},
  TRIP_COUNTRIES: {key: 'trip_countries', url: 'http://localhost:8080/trips/getUniqueCountries/'},
  TRIP_NAME_TYPE_STATE_COUNTRY: {key: 'trip_name_type_state_country', url: 'http://localhost:8080/trips/getAllNameTypeStateCountry'}
};
Object.freeze( key_enums );

class CacheManager {
  constructor() {
    this.storage_available = window.localStorage;
  }

  // Returns all kenums
  static get KENUMS() {
    return key_enums;
  }

  // Throws custom error: TODO make better
  static throwCKError() {
    throw new Error( 'Browser storage unavailable or wrong key was used' );
  }

  // Updates the keys value in the browsers localStorage
  updateStaticKey( kenum, value ) {
    ( this.storage_available && key_enums.hasOwnProperty( kenum ) ) ? localStorage.setItem( key_enums[kenum].key, JSON.stringify( value ) ) : CacheManager.throwCKError()
  }

  // Returns the current value of the key
  getStaticValue( kenum ) {
    return ( ( this.storage_available && key_enums.hasOwnProperty( kenum ) ) ? JSON.parse( localStorage.getItem( key_enums[kenum].key ) ) : CacheManager.throwCKError() );
  }

  // Creates new key with value in vari_enums object and saves in localStorage
  updateKey( key, value ) {
    this.storage_available ? localStorage.setItem( key, JSON.stringify( value ) ) : CacheManager.throwCKError()
  }

  // Return value of key in cache
  getValue( key ) {
    return ( ( this.storage_available ) ? JSON.parse( localStorage.getItem( key ) ) : CacheManager.throwCKError() );
  }
}

export default CacheManager;
