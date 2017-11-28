'use strict';

/*
 * Proposed Trips module
 * @author robinson
 */

angular.module( 'AfterView.ProposedTrips', [] )

// Configure state info
.config( ['$stateProvider', function( $stateProvider )
{
  $stateProvider
    .state( 'proposedtrips',
    {
      url: '/prpsdtrips',
      templateUrl: 'templates/proposed-trips.html',
      controller: 'proposedTripsCtrl',
      controllerAs: 'proposedTripsCtrl'
    });

}]) // End of state config

// Stores state parameters so they can be passed to directives and determine views
.controller('proposedTripsCtrl', ['TripService', 'ScheduledTripsMap', function( TripService, ScheduledTripsMap )
{
  // Member Data
  var that = this;

  // Get number of scheduled trips
  TripService.getAllScheduledTrips().then(
    function( s_trips )
    {
      console.log( 'ProposedTrips: got response from TripService', s_trips.length );

      that.all_trips = s_trips;
      that.number_of_trips = s_trips.length;

      // Add clicked property to each trip object for tracking current selected
      that.all_trips.forEach(
        function( trip )
        {
          trip.clicked = false;
        }
      );
    }
  );

  // Functions
  this.displayTripInfo = function( trip_name )
  {
    console.log( 'ProposedTrips: displayTripInfo(): ', trip_name );

    this.selected_trip = trip_name;
    this.itinerary_link = 'itineraries/'+trip_name+'/itinerary.html';

    // Get the selected trips info
    TripService.getScheduledTripDuration( trip_name ).then(
      function( duration )
      {
        console.log( 'ProposedTrips: got response from TripService.getScheduledTripDuration' );

        that.trip_duration = duration;
      }
    );

    TripService.getScheduledTripPeople( trip_name ).then(
      function( people )
      {
        console.log( 'ProposedTrips: got response from TripService.getScheduledTripPeople' );

        that.trip_people = people.join( ', ' );
      }
    );

    // Reset clicked properties for each trip
    this.all_trips.forEach(
      function( trip_obj )
      {
        if( trip_obj.name == trip_name )
          trip_obj.clicked = true;

        else
          trip_obj.clicked = false;
      }
    );
  };

  // Initialize the map
  ScheduledTripsMap.initMap();

}]); // End of controller definition
