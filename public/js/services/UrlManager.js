'use strict';

/*
 * Handles api calls
 * author@ robinson
 */

angular.module( 'AfterView.UrlManager', [] )

.factory( 'UrlManager', [function()
{
  // Data
  let trips_url = location.protocol + '//' + location.host + '/trips',
      trip_names_url = location.protocol + '//' + location.host + '/trips/getAllTripNames/',
      trip_types_url = location.protocol + '//' + location.host + '/trips/getUniqueTypes/',
      trip_states_url = location.protocol + '//' + location.host + '/trips/getUniqueStates/',
      trip_countries_url = location.protocol + '//' + location.host + '/trips/getUniqueCountries/',
      trips_images_url = location.protocol + '//' + location.host + '/trips/getImagesForTrip/',
      scheduled_trips_url = location.protocol + '//' + location.host + '/schdtrips',
      scheduled_trip_duration_url = location.protocol + '//' + location.host + '/schdtrips/getDuration/',
      scheduled_trip_people_url = location.protocol + '//' + location.host + '/schdtrips/getPeople/',
      image_base_url = location.protocol + '//' + location.host + '/images/';

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
