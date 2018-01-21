'use strict';

/*
 * Handles scheduled trip map functionality
 * author@ robinson
 */

angular.module( 'AfterView.ScheduledTripsMap', [] )

.service( 'ScheduledTripsMap', ['TripService', function( TripService )
{
  // Data
  let all_locations,
      map,
      markers = [];

  // Functions
  // Generate the map markers
  var generateMarkers = function( locations )
  {
    console.log( 'PastTripsMap: generating markers' );

    for( let i = 0; i < locations.length; ++i )
      markers.push( new google.maps.Marker( {title: locations[i].location,
                                             position: locations[i].coord,
                                             map: null,
                                             trips: locations[i].trips,
                                             location: locations[i].location,
                                             animation: google.maps.Animation.DROP} ) );

    console.log( new google.maps.Marker() );
    // generateMarkerInfoWindows( markers );
  };

  // Generate the marker info windows
  var generateMarkerInfoWindows = function( markers )
  {
    console.log( 'PastTripsMap: generating info windows' );

    // Create elevation service object and trip_div array
    let elevator = new google.maps.ElevationService;

    for( let i = 0; i < markers.length; ++i )
    {
      console.log( markers[i] );
      let trip_divs = [];

      // Create the html string to be displayed
      markers[i].trips.forEach(
        function( trip_name )
        {
          trip_divs.push( '<div>' + trip_name + '</div>' );
        }
      );

      // Get elevation for each marker
      elevator.getElevationForLocations(
        {
          'locations': [{lat: markers[i].getPosition().lat(), lng: markers[i].getPosition().lng()}]
        },
        function( results, status )
        {
          console.log( 'ELEVATION RETRIEVAL STATUS: ', status );

          // Check Return of call to get elevation
          if( status === 'OK' )
          {
            if( results[0] )
            {
              // Generate html string for info window
              let elevation = results[0].elevation;
              let info_string = "<h1>" + markers[i].location + "</h1>" +
                                "<p> <u>elevation</u>: <b>" + elevation + "</b> <i>meters</i>" +
                                "<br /> <b style='padding-left: 57px;'>" + elevation*3.28084 + "</b> <i>feet</i>" +
                                "<div style='margin-bottom: 5px;'> <u>Trips</u> </div>" + trip_divs.join( '' ) + "</p>";

              // Create the InfoWindow and attach to click event on marker
              let info_window = new google.maps.InfoWindow( {content: info_string} );

              // Add callback functions
              markers[i].addListener( 'click',
                function()
                {
                  info_window.open( map, markers[i] );
                }
              );
            }
          }
        }
      );
    }
  }

  // Initialize the map
  var initMap = function()
  {
    console.log( 'PastTripMaps: initializing the map' );

    map = new google.maps.Map( document.getElementById( 'map' ), {
      zoom: 6,
      center: {lat: 40.81, lng: -96.68}
    });
  };

  // Create all markers and add to map
  var showTripMarkers = function( locations )
  {
    console.log( 'PastTripsMap: showing trip markers', locations.length );

    // Generate the markers
    generateMarkers( locations );

    // Check for empty list
    if( locations.length == 0 )
    {
      markers.forEach(
        function( marker )
        {
          marker.setMap( null );
        }
      );
    }

    // Set map for markers
    for( let i = 0; i < markers.length; ++i )
    {
      markers[i].setMap( map );
    }

    // Display arrows between markers
    var line_symbol = {
      path: google.maps.SymbolPath.FORWARD_CLOSED_ARROW
    };

    // Create the polyline and add the symbol via the 'icons' property.
    // TODO move to function
    for( let i = 0; i < locations.length; ++i )
    {
      if( locations[i+1] )
      {
        // Create line between two coords
        var line = new google.maps.Polyline({
          path: [locations[i].coord, locations[i+1].coord],
          icons: [{
            icon: line_symbol,
            offset: '100%'
          }],
          map: map
        });
      }
    }
  };

  // Set the animation of a marker containing matching trip name
  var setMarkerAnimation = function( trip_name, animation )
  {
    console.log( 'PastTripsMap: setting marker animation to ', animation );

    for( let i = 0; i < markers.length; ++i )
    {
      if( markers[i].trips.includes( trip_name ) )
        markers[i].setAnimation( animation );

      else
        markers[i].setAnimation( null );
    }
  };

  // Map function to same name for testing purposes
  return {
    initMap: initMap,
    showTripMarkers: showTripMarkers,
    setMarkerAnimation: setMarkerAnimation
  };

}]);
