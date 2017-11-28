'use strict';

/*
 * Displays images from selected trip
 * author@ robinson
 */

angular.module( 'AfterView.RepeatDoneNotify', [] )

.directive( 'doneNotify', [function()
{
  return function( scope, element, attributes )
  {
    if( scope.$last )
      scope.$eval( attributes.doneNotify );
  }

}]);
