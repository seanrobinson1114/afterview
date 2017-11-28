'use strict';

/*
 * Handles api calls
 * author@ robinson
 */

angular.module( 'AfterView.TripService', [] )

.factory( 'TripService', [ 'UrlManager', '$http', function( UrlManager, $http )
{
  // Data
  let trips_url = UrlManager.trips_url,
      trip_names_url = UrlManager.trip_names_url,
      trip_types_url = UrlManager.trip_types_url,
      trip_states_url = UrlManager.trip_states_url,
      trip_countries_url = UrlManager.trip_countries_url,
      trips_images_url = UrlManager.trips_images_url,
      scheduled_trips_url = UrlManager.scheduled_trips_url,
      scheduled_trip_duration_url = UrlManager.scheduled_trip_duration_url,
      scheduled_trip_people_url = UrlManager.scheduled_trip_people_url,
      custom_header = {'x-access-token': localStorage.getItem( 'token' ) };

  // Functions
  // Get token from local storage
  var getToken = function()
  {
    console.log( 'TripService: getToken()' );

    return localStorage.getItem( 'token' );
  }

  var setCustomHeader = function()
  {
    console.log( 'TripService: setCustomHeader()' );

    custom_header['x-access-token'] = localStorage.getItem( 'token' );
  }

  // Set the token
  var setToken = function( new_token )
  {
    console.log( 'TripService: setToken()' );

    localStorage.setItem( 'token', new_token );
    setCustomHeader();
  }

  // Returns promise that resolves to array of all trip objects
  var getAllTrips = function()
  {
    console.log( 'TripService: getAllTrips()' );

    return $http.get( trips_url, {headers: JSON.stringify( custom_header )} ).then(
      function success( response )
      {
        console.log( 'TripService: getAllTrips(): Succesfully retrieved all trip objects' );

        return response.data;
      },
      function error( response )
      {
        console.error( 'TripService: getAllTrips(): Failed to retrieve all trip objects' );

        // Reset token and perform call again if token returned from original
        if( 'new_token' in response.data && response.data.new_token != getToken() )
        {
          setToken( response.data.new_token );
          return getAllTrips();
        }

        else if( 'new_token' in response.data )
          return getAllTrips();

        else
          return 0;
      },
    );
  };

  // Returns promise that resolves to array of all trip names
  var getAllTripNames = function()
  {
    return $http.get( trip_names_url, {headers: custom_header} ).then(
      function success( response )
      {
        console.log( 'TripService: getAllTripNames(): Successfully retrieved all trip names' );

        return response.data;
      },
      function error( response )
      {
        console.error( 'TripService: getAllTripNames(): Failed to retrieve all trip names' );

        // Reset token and perform call again if token returned from original
        if( 'new_token' in response.data && response.data.new_token != getToken() )
        {
          setToken( response.data.new_token );
          return getAllTripNames();
        }

        else if( 'new_token' in response.data )
          return getAllTripNames();

        else
          return 0;
      }
    );
  };

  // Returns promise that resolves to array of all trip types
  var getAllTripTypes = function()
  {
    return $http.get( trip_types_url, {headers: custom_header} ).then(
      function success( response )
      {
        console.log( 'TripService: getAllTripTypes(): Successfully retrieved all trip types' );

        return response.data;
      },
      function error( response )
      {
        console.error( 'TripService: getAllTripTypes(): Failed to retrieve all trip types' );

        // Reset token and perform call again if token returned from original
        if( 'new_token' in response.data && response.data.new_token != getToken() )
        {
          setToken( response.data.new_token );
          return getAllTripTypes();
        }

        else if( 'new_token' in response.data )
          return getAllTripTypes();

        else
          return 0;
      }
    );
  };

  // Returns promise that resolves to array of all trip states
  var getAllTripStates = function()
  {
    return $http.get( trip_states_url, {headers: custom_header} ).then(
      function success( response )
      {
        console.log( 'TripService: getAllTripStates(): Successfully retrieved all trip states' );

        return response.data;
      },
      function error( response )
      {
        console.error( 'TripService: getAllTripStates(): Failed to retrieve all trip states' );

        // Reset token and perform call again if token returned from original
        if( 'new_token' in response.data && response.data.new_token != getToken() )
        {
          setToken( response.data.new_token );
          return getAllTripStates();
        }

        else if( 'new_token' in response.data )
          return getAllTripStates();

        else
          return 0;
      }
    );
  };

  // Returns promise that resolves to all unique trip countries
  var getAllTripCountries = function()
  {
    return $http.get( trip_countries_url, {headers: custom_header} ).then(
      function success( response )
      {
        console.log( 'TripService: getAllTripCountries(): Successfully retrieved all trip countries' );

        return response.data;
      },
      function error( response )
      {
        console.error( 'TripService: getAllTripCountries(): Failed to retrieve all trip countries' );

        if( 'new_token' in response.data && response.data.new_token != getToken() )
        {
          setToken( response.data.new_token );
          return getAllTripCountries();
        }

        else if( 'new_token' in response.data )
          return getAllTripCountries();

        else
          return 0;
      }
    );
  }

  // Returns promise that resolves to array of all trip images
  var getAllTripImages = function( trip_name )
  {
    return $http.get( trips_images_url + trip_name, {headers: custom_header} ).then(
      function success( response )
      {
        console.log( 'TripService: getAllTripImages(): Successfully retrieved all trip images' );

        return response.data;
      },
      function error( response )
      {
        console.error( 'TripService: getAllTripStates(): Failed to retrieve all trip images' );

        if( 'new_token' in response.data && response.data.new_token != getToken() )
        {
          setToken( response.data.new_token );
          return getAllTripImages( trip_name );
        }

        else if( 'new_token' in response.data )
          return getAllTripImages( trip_name );

        else
          return 0;
      }
    );
  };

  // Returns promise that resolves to array of visited locations objects
  var getAllVisitedLocations = function()
  {
    return $http.get( 'http://localhost:3000/vlocations', {headers: custom_header} ).then(
      function success( response )
      {
        console.log( 'TripService: getAllVisitedLocations(): Successfully retrieved response' );

        return response.data;
      },
      function error( response )
      {
        console.error( 'TripService: getAllVisitedLocations(): Failed to retrieve information' );

        // Reset token and perform call again if token returned from original
        if( 'new_token' in response.data && response.data.new_token != getToken() )
        {
          setToken( response.data.new_token );
          return getAllVisitedLocations();
        }

        else if( 'new_token' in response.data )
          return getAllVisitedLocations();

        else
          return 0;
      }
    );
  };

  // Get number of trips
  var getNumberOfTrips = function()
  {
    return $http.get( 'http://localhost:3000/trips/getNumberOfTrips', {headers: custom_header} ).then(
      function success( response )
      {
        console.log( 'TripService: getNumberOfTrips(): Successfully retrieved response' );

        return response.data;
      },
      function error( response )
      {
        console.error( 'TripService: getNumberOfTrips(): Failed to retrieve information' );

        // Reset token and perform call again if token returned from original
        if( 'new_token' in response.data && response.data.new_token != getToken() )
        {
          setToken( response.data.new_token );
          return getNumberOfTrips();
        }

        else if( 'new_token' in response.data )
          return getNumberOfTrips();

        else
          return 0;
      }
    );
  };

  // Get number of visited locations
  var getNumberOfVisitedLocations = function()
  {
    return $http.get( 'http://localhost:3000/vlocations/getNumberOfLocations', {headers: custom_header} ).then(
      function success( response )
      {
        console.log( 'TripService: getNumberOfVisitedLocations(): Successfully retrieved response' );

        return response.data;
      },
      function error( response )
      {
        console.error( 'TripService: getNumberOfVisitedLocations(): Failed to retrieve information' );

        // Reset token and perform call again if token returned from original
        if( 'new_token' in response.data && response.data.new_token != getToken() )
        {
          setToken( response.data.new_token );
          return getNumberOfVisitedLocations();
        }

        else if( 'new_token' in response.data )
          return getNumberOfVisitedLocations();

        else
          return 0;
      }
    );
  };

  // Get number of trip
  var getDuration = function( trip_name )
  {
    return $http.get( 'http://localhost:3000/trips/getDuration/' + trip_name, {headers: custom_header} ).then(
      function success( response )
      {
        console.log( 'TripService: getTripDuration(): Successfully retrieved response' );

        return response.data;
      },
      function error( response )
      {
        console.error( 'TripService: getTripDuration(): Failed to retrieve information' );

        // Reset token and perform call again if token returned from original
        if( 'new_token' in response.data && response.data.new_token != getToken() )
        {
          setToken( response.data.new_token );
          return getDuration( trip_name );
        }

        else if( 'new_token' in response.data )
          return getDuration( trip_name );

        else
          return 0;
      }
    );
  };

  // Get people present on trip
  var getPeople = function( trip_name )
  {
    return $http.get( 'http://localhost:3000/trips/getPeople/' + trip_name, {headers: custom_header} ).then(
      function success( response )
      {
        console.log( 'TripService: getPeople(): Successfully retrieved response' );

        return response.data;
      },
      function error( response )
      {
        console.error( 'TripService: getPeople(): Failed to retrieve information' );

        if( 'new_token' in response.data && response.data.new_token != getToken() )
        {
          setToken( response.data.new_token );
          return getPeople( trip_name );
        }

        else if( 'new_token' in response.data )
          return getPeople( trip_name );

        else
          return 0;
      }
    );
  };

  // Calls for scheduled trips - should probably be moved to different module
  var getAllScheduledTrips = function()
  {
    return $http.get( scheduled_trips_url, {headers: custom_header} ).then(
      function success( response )
      {
        console.log( 'TripService: getAllScheduledTrips(): Successfully retrieved response' );

        return response.data;
      },
      function error( response )
      {
        console.error( 'TripService: getAllScheduledTrips(): Failed to retrieved response' );

        if( 'new_token' in response.data && response.data.new_token != getToken() )
        {
          setToken( response.data.new_token );
          return getAllScheduledTrips();
        }

        else if( 'new_token' in response.data )
          return getAllScheduledTrips();

        else
          return 0;
      }
    );
  };

  // Get duration for specific scheduled trip
  var getScheduledTripDuration = function( trip_name )
  {
    return $http.get( scheduled_trip_duration_url + trip_name, {headers: custom_header} ).then(
      function success( response )
      {
        console.log( 'TripService: getScheduledTripDuration(): Successfully retrieved response from api' );

        return response.data;
      },
      function error( response )
      {
        console.error( 'TripService: getScheduledTripDuration(): Failed to retrieve response from api' );

        if( 'new_token' in response.data && response.data.new_token != getToken() )
        {
          setToken( response.data.new_token );
          return getScheduledTripDuration( trip_name );
        }

        else if( 'new_token' in response.data )
          return getScheduledTripDuration( trip_name );

        else
          return 0;
      }
    );
  };

  // Get people for scheduled trip
  var getScheduledTripPeople = function( trip_name )
  {
    return $http.get( scheduled_trip_people_url + trip_name, {headers: custom_header} ).then(
      function success( response )
      {
        console.log( 'TripService: getScheduledTripPeople(): Successfully retrieved response' );

        return response.data;
      },
      function error( response )
      {
        console.error( 'TripService: getScheduledTripPeople(): Failed to retrieve response' );

        if( 'new_token' in response.data && response.data.new_token != getToken() )
        {
          setToken( response.data.new_token );
          return getScheduledTripPeople( trip_name );
        }

        else if( 'new_token' in response.data )
          return getScheduledTripPeople( trip_name );

        else
          return 0;
      }
    );
  };

  // Map functions to same name for testing purposes
  return {
    getToken: getToken,
	  getAllTrips: getAllTrips,
    getAllTripNames: getAllTripNames,
    getAllTripTypes: getAllTripTypes,
    getAllTripStates: getAllTripStates,
    getAllTripCountries: getAllTripCountries,
    getAllTripImages: getAllTripImages,
    getAllVisitedLocations: getAllVisitedLocations,
    getNumberOfTrips: getNumberOfTrips,
    getNumberOfVisitedLocations: getNumberOfVisitedLocations,
    getDuration: getDuration,
    getPeople: getPeople,
    // Below: functions to move to new module
    getAllScheduledTrips: getAllScheduledTrips,
    getScheduledTripDuration: getScheduledTripDuration,
    getScheduledTripPeople: getScheduledTripPeople
  };

}]);
