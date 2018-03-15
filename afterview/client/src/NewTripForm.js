/*!
 * Class handling rendering of form elements used to create new trips
 * author@ alex
 */

// Imports
import React, { Component } from 'react';
import moment from 'moment';
import DatePicker from 'react-datepicker';
import { CountryDropdown, RegionDropdown } from 'react-country-region-selector';

import 'react-datepicker/dist/react-datepicker.css';

class NewTripForm extends Component {
    constructor(props) {
        super(props);
        
        this.state = {
            start_date: moment(),
            end_date: moment().add(1, 'weeks'),
            destination_country: 'United States',
            destination_regions: '',
            activity_type: "hiking"
        };

        this.handleStartDateChange = this.handleStartDateChange.bind(this);
        this.handleEndDateChange = this.handleEndDateChange.bind(this);
        this.handleCountryChange = this.handleCountryChange.bind(this);
        this.handleRegionChange = this.handleRegionChange.bind(this);
        this.handleActivityChange = this.handleActivityChange.bind(this);
    };

    handleStartDateChange(date) {
        this.setState({
            start_date: date,
            end_date: date > this.state.end_date ? date : this.state.end_date
        });
    }

    handleEndDateChange(date) {
        this.setState({
            start_date: date < this.state.start_date ? date : this.state.start_date,
            end_date: date
        });
    }

    handleCountryChange(country) {
        this.setState({
            destination_country: country
        });
    }

    handleRegionChange(region) {
        this.setState({
            destination_regions: region
        });
    }

    handleActivityChange(activity) {
        this.setState({
            activity_type: activity
        });
    }
    
    render() {
        return (
          <form>
             <label>
                Trip Dates:
                  <DatePicker
                    selected={this.state.start_date}
                    selectsStart
                    startDate={this.state.start_date}
                    endDate={this.state.end_date}
                    onChange={this.handleStartDateChange}/>
              </label>
              <br />
              <label>
                End Date:
                  <DatePicker
                    selected={this.state.end_date}
                    selectsEnd
                    startDate={this.state.start_date}
                    endDate={this.state.end_date}
                    onChange={this.handleEndDateChange}/>
              </label>
              <br />
              <label>
                Destination Country:
                  <CountryDropdown
                    value={this.state.destination_country}
                    onChange={this.handleCountryChange}/>
              </label>
              <br />
              <label>
                Destination Region:
                  <RegionDropdown
                    country={this.state.destination_country}
                    value={this.state.destination_regions}
                    onChange={this.handleRegionChange}/>
              </label>
              <br />
              <label>
                Activity:
                  <select
                    value={this.state.activity_type}
                    onChange={this.handleActivityChange}>
                    <option value="mountaineering">Mountaineering</option>
                    <option value="hiking">Hiking</option>
                  </select>
              </label>
            </form>
        );
    }
}

export default NewTripForm
