'use strict';

/*
 * Inprogress Trips module
 * @author robinson
 */

angular.module( 'AfterView.InprogressTrips', [] )

// Configure state info
.config( ['$stateProvider', function( $stateProvider )
{
  $stateProvider
    .state( 'inprogresstrips',
    {
      url: '/ipgrstrips',
      templateUrl: 'templates/inprogress-trips.html',
      controller: 'inprogressTripsCtrl',
      controllerAs: 'inprogressTripsCtrl'
    });

}]) // End of state config

// Stores state parameters so they can be passed to directives and determine views
.controller('inprogressTripsCtrl', [function()
{
  // Member Data
  var that = this;

}]); // End of controller definition
