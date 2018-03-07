/*!
 * Class handling rendering of form elements used to create new trips
 * author@ alex
 */

// Imports
import React, { Component } from 'react';
import DatePicker from 'react-datepicker';
import moment from 'moment';

import 'react-datepicker/dist/react-datepicker.css';

class NewTripForm extends Component {
    constructor(props) {
        super(props);
        
        this.state = {
            start_date: moment(),
            end_date: moment().add(1, 'weeks'),
            destinations: "WI",
            activity_type: "hiking"
        };

        this.handleStartDateChange = this.handleStartDateChange.bind(this);
        this.handleEndDateChange = this.handleEndDateChange.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
    };

    handleStartDateChange(date) {
        this.setState({
            start_date: date
        });
    }

    handleEndDateChange(date) {
        this.setState({
            end_date: date
        });
    }

    handleInputChange(event) {
        const target = event.target;
        const value = target.value;
        const name = target.name;

        this.setState({
            [name]: value
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
            </form>
        );
    }
}

export default NewTripForm
