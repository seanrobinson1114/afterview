'use strict';

/*
 * Handles api calls
 * author@ robinson
 */

angular.module( 'AfterView.UrlManager', [] )

.factory( 'UrlManager', [function()
{
  // Data
  let trips_url = 'http://localhost:3000/trips',
      trip_names_url = 'http://localhost:3000/trips/getAllTripNames/',
      trip_types_url = 'http://localhost:3000/trips/getUniqueTypes/',
      trip_states_url = 'http://localhost:3000/trips/getUniqueStates/',
      trip_countries_url = 'http://localhost:3000/trips/getUniqueCountries/',
      trips_images_url = 'http://localhost:3000/trips/getImagesForTrip/',
      scheduled_trips_url = 'http://localhost:3000/schdtrips',
      scheduled_trip_duration_url = 'http://localhost:3000/schdtrips/getDuration/',
      scheduled_trip_people_url = 'http://localhost:3000/schdtrips/getPeople/',
      image_base_url = 'http://localhost:3000/images/';

  // Map everything to same name for testing purposes
  return {
    trips_url: trips_url,
    trip_names_url: trip_names_url,
    trip_types_url: trip_types_url,
    trip_states_url: trip_states_url,
    trip_countries_url: trip_countries_url,
    trips_images_url: trips_images_url,
    scheduled_trips_url: scheduled_trips_url,
    scheduled_trip_duration_url: scheduled_trip_duration_url,
    scheduled_trip_people_url: scheduled_trip_people_url,
    image_base_url: image_base_url
  };

}]);
