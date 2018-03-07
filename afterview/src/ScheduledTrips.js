/*
 * Class handling rendering of elements for scheduled trips of site
 * author@ alex, sean
 */

// Imports
import React, { Component } from 'react';
import NewTripForm from './NewTripForm';
import TripFilter from './TripFilter';
import GETRequestHandler from './GETRequestHandler';
import CacheManager from './CacheManager';

class ScheduledTrips extends Component {
    render() {
        return (
          <NewTripForm/>
        );
    }
}

export default ScheduledTrips
