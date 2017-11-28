'use strict';

/*
 * Past Trips module
 * @author robinson
 */

angular.module( 'AfterView.PastTrips', [] )

// Configure state info
.config( ['$stateProvider', function( $stateProvider )
{
  $stateProvider
    .state( 'pasttrips',
    {
      url: '/ptrips',
      templateUrl: 'templates/past-trips.html',
      controller: 'pastTripsCtrl',
      controllerAs: 'pastTripsCtrl'
    });

}]) // End of state config

// Only stores state parameters so they can be passed to directives and determine views
.controller('pastTripsCtrl', [function()
{
  // Member Data
  var that = this;

}]); // End of controller definition
