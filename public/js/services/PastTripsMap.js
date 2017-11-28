'use strict';

/*
 * Handles map functionality for past trips
 * author@ robinson
 */

angular.module( 'AfterView.PastTripsMap', [] )

.service( 'PastTripsMap', ['TripService', function( TripService )
{
  // Data
  let all_locations,
      map,
      markers = [];

  // Get all visited locations and generate markers
  TripService.getAllVisitedLocations().then(
    function( locations )
    {
      console.log( 'PastTripsMap: got response from TripService.getAllVisitedLocations()' );

      generateMarkers( locations );
    }
  );

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

    generateMarkerInfoWindows( markers );
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
      zoom: 3,
      center: {lat: 48, lng: -60}
    });
  };

  // Create all markers and add to map
  var showTripMarkers = function( displayed_trips )
  {
    console.log( 'PastTripsMap: showing trip markers', displayed_trips.length );

    // Check for empty list
    if( displayed_trips.length == 0 )
    {
      markers.forEach(
        function( marker )
        {
          marker.setMap( null );
        }
      );
    }

    for( let i = 0; i < markers.length; ++i )
    {
      for( let j = 0; j < displayed_trips.length; ++j )
      {
        if( markers[i].trips.includes( displayed_trips[j].name ) )
        {
          markers[i].setMap( map );
          break;
        }
        else
          markers[i].setMap( null );
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
