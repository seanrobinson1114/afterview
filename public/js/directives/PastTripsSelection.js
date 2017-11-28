'use strict';

/*
 * Directive for displaying past trips
 * author@ Robinson
 */

angular.module( 'AfterView.PastTripsSelection', [] )

.directive( 'pastTripsSelection', ['TripService', 'PastTripsMap', function( TripService, PastTripsMap )
{
  return {
    restrict: 'E',
    templateUrl: 'templates/past-trips-selection.html',
    controllerAs: 'pastTripsSelectionCtrl',
    bindToController: true,
    controller: function()
    {
      // Data
      var that = this;

      this.type_filter = 'All';
      this.state_filter = 'All';
      this.country_filter = 'All';
      this.selected_trip_name = null;

      // Get all trip objects
      TripService.getAllTrips().then(
        function( trips )
        {
          console.log( 'PastTripsDisplay: Got response from TripService.getAllTrips()' );

          if( trips )
          {
            that.all_trips = trips;

            // Add clicked property to each trip object for tracking current selected
            that.all_trips.forEach(
              function( trip )
              {
                trip.clicked = false;
              }
            );

            // Deep copy used on template
            that.display_trips = angular.copy( that.all_trips );

            // Load the map and the markers
            PastTripsMap.initMap();
            PastTripsMap.showTripMarkers( that.display_trips );
          }
        },
      );

      // Get all trip names
      TripService.getAllTripNames().then(
        function( trip_names )
        {
          console.log( 'PastTripsDisplay: Got response from TripService.getAllTripNames()' );

          if( trip_names )
            that.all_trip_names = trip_names;
        }
      );

      // Get all trip types
      TripService.getAllTripTypes().then(
        function( trip_types )
        {
          console.log( 'PastTripsDisplay: Got response from TripService.getAllTripTypes()' );

          if( trip_types )
            that.all_trip_types = trip_types;
        }
      );

      // Get all trip states
      TripService.getAllTripStates().then(
        function( trip_states )
        {
          console.log( 'PastTripsDisplay: Got response from TripService.getAllTripStates()' );

          if( trip_states )
            that.all_trip_states = trip_states;
        }
      );

      // Get all trip countries
      TripService.getAllTripCountries().then(
        function( trip_countries )
        {
          console.log( 'PastTripsSelection: Got response from TripService.getAllTripCountries()' );

          if( trip_countries )
            that.all_trip_countries = trip_countries;
        }
      );

      // Get number of trips
      TripService.getNumberOfTrips().then(
        function( total )
        {
          console.log( 'PastTripsDisplay: Got response from TripService.getNumberOfTrips' );

          if( total )
            that.number_of_trips = total;
        }
      );

      // Get number of visited locations
      TripService.getNumberOfVisitedLocations().then(
        function( total )
        {
          console.log( 'PastTripsDisplay: Got response from TripService.getNumberOfVisitedLocations' );

          if( total )
            that.number_of_locations = total;
        }
      )

      // Functions
      // Set the type filter
      this.setFilter = function( type, state, country )
      {
        console.log( 'Setting filters to type: ' + type + ', state: ' + state + ', country: ' + country );

        this.type_filter = type;
        this.state_filter = state;
        this.country_filter = country;

        // Clear the images array
        typeof this.selected_trip_images !== 'undefined' ? this.selected_trip_images.length = 0 : console.warn( 'PastTripsDisplay: No trip selected, wont reset images array' );

        // Remove any trip objects from display that don't have matching type
        this.display_trips = this.all_trips.filter(
          function( trip_object )
          {
            console.log( 'Filtering trip object: ', trip_object );

            return ( ( trip_object.type === type || type === 'All' ) && ( trip_object.state === state || state === 'All' ) && ( trip_object.country === country || country === 'All' ) );
          }
        );
        console.log( 'CHECK: ', this.display_trips );
        // Display markers for filtered trips
        PastTripsMap.showTripMarkers( this.display_trips );
      };

      // Reload passtrips state with selected trip name passed as parameters
      this.loadImageGallery = function( trip )
      {
        console.log( 'PastTripsSelection: changing value sent to image-gallery template: ' + trip.name );

        this.selected_trip_name = trip.name;

        // Set clicked properties for all_trips
        this.all_trips.forEach(
          function( trip_obj )
          {
            if( trip_obj.name == trip.name )
              trip_obj.clicked = true;

            else
              trip_obj.clicked = false;
          }
        );

        // Set clicked properties for display_trips
        this.display_trips.forEach(
          function( trip_obj )
          {
            if( trip_obj.name == trip.name )
              trip_obj.clicked = true;

            else
              trip_obj.clicked = false;
          }
        );

        // Change the animation for the corresponding marker
        PastTripsMap.setMarkerAnimation( trip.name, google.maps.Animation.BOUNCE );
      };

    }
  }
}]);
