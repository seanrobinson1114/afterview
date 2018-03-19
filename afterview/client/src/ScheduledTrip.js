/*
 * Class handling the displaying of trip data
 * author@ alex
 */

// Imports
import React, { Component } from 'react';
import moment from 'moment';
import { Collapse, Panel } from 'react-bootstrap';
import ScheduledTripsCacheManager from './ScheduledTripsCacheManager';

class ScheduledTrip extends Component {
  constructor(props) {
    super(props);

    this.state = {
      'name': this.props.name,
      'trip_data_loaded': false,
      'display_trip_data': false,
    }

    // Create cache
    this.cache_manager = new ScheduledTripsCacheManager();

    // Bind functions
    this.loadAndDisplayTripData = this.loadAndDisplayTripData.bind( this );
  }

  loadAndDisplayTripData() {
    // Only load if necessary
    if( !this.state.trip_data_loaded ) {
      let self = this;
      this.cache_manager.loadTripData( this.state.name ).then( () => {
        self.setState( self.cache_manager.getTripData( self.state.name ) );
        self.setState({
          'trip_data_loaded': true
        });
      });
    }

    // Check if the trip data should be displayed or hidden
    if( !this.state.display_trip_data ) {
      this.setState({
        'display_trip_data': true
      });
    }
    else {
      this.setState({
        'display_trip_data': false
      });
    }
  }

  render() {
    return (
      <div>
        <button onClick={this.loadAndDisplayTripData}> {this.state.name} </button>
        <Collapse in={this.state.display_trip_data}>
          <div>
            <div>
            { this.state && this.state.start_date && this.state.end_date &&
              this.state.display_trip_data &&
              <div> Dates: {moment(this.state.start_date).format("MMM Do YYYY ")}
              to 
                           {moment(this.state.end_date).format(" MMM Do YYYY")}
              </div>
            }
            </div>
            <div>
            { this.state && this.state.country &&
              this.state.display_trip_data &&
              <div> Destination Country: {this.state.country} </div>
            }
            </div>
            <div>
            { this.state && this.state.region &&
              this.state.display_trip_data &&
              <div> Destination Region: {this.state.region} </div>
            }
            </div>
            <div>
            { this.state && this.state.type &&
              this.state.display_trip_data &&
              <div> Activity Type: {this.state.type} </div>
            }
            </div>
          </div>
        </Collapse>
      </div>
    );
  }
}

// <div>
//         { this.state && this.state.start_date && this.state.end_date &&
//           this.state.display_trip_data &&
//           <div> Dates: {moment(this.state.start_date).format("MMM Do YYYY ")}
//            to 
//                        {moment(this.state.end_date).format(" MMM Do YYYY")}
//           </div>
//         }
//         </div>
//         <div>
//         { this.state && this.state.country &&
//           this.state.display_trip_data &&
//             <div> Destination Country: {this.state.country} </div>
//         }
//         </div>
//         <div>
//         { this.state && this.state.region &&
//           this.state.display_trip_data &&
//           <div> Destination Region: {this.state.region} </div>
//         }
//         </div>
//         <div>
//         { this.state && this.state.type &&
//           this.state.display_trip_data &&
//           <div> Activity Type: {this.state.type} </div>
//         }
//         </div>

export default ScheduledTrip
