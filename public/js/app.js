'use strict';

/*
 * Application module for TBD
 * Declares all modules needed for app as dependencies
 * In index.html, <html lang="en" ng-app="NCM">: ng-app="NCM" refers to this module
 * author@ robinson
 */

angular.module( 'AfterView', [
  'ui.router',
  'ui.bootstrap',
  'ngAnimate',
  'AfterView.ImageGallery',
  'AfterView.PastTrips',
  'AfterView.ProposedTrips',
  'AfterView.ScheduledTripsMap',
  'AfterView.InprogressTrips',
  'AfterView.PastTripsSelection',
  'AfterView.TripService',
  'AfterView.RepeatDoneNotify',
  'AfterView.PastTripsMap',
  'AfterView.UrlManager'
])
.config([ '$urlRouterProvider', function( $urlRouterProvider )
{
  // Default path which index.html will route to for bad urls
  $urlRouterProvider.otherwise( '/ptrips' );
}]);
