/*
 * Class handling rendering of form elements used to create new trips
 * author@ alex
 */

// Imports
import React, { Component } from 'react';
import moment from 'moment';
import DatePicker from 'react-datepicker';
import { CountryDropdown, RegionDropdown } from 'react-country-region-selector';
import 'react-datepicker/dist/react-datepicker.css';
import { FormGroup, ControlLabel, FormControl, Button, Form, Col } from 'react-bootstrap';

class NewTripForm extends Component {
  constructor(props) {
    super(props);
    console.log( 'schdprops', props);

    this.state = {
      name: '',
      country: 'United States',
      region: '',
    };

    // Bind functions to scope
    this.validateStartDate = this.validateStartDate.bind( this );
    this.validateEndDate = this.validateEndDate.bind( this );

    this.handleTripNameChange = this.handleTripNameChange.bind( this );
    this.handleStartDateChange = this.handleStartDateChange.bind( this );
    this.handleEndDateChange = this.handleEndDateChange.bind( this );
    this.handleCountryChange = this.handleCountryChange.bind( this );
    this.handleRegionChange = this.handleRegionChange.bind( this );
    this.handleActivityChange = this.handleActivityChange.bind( this );
    this.handleSubmit = this.handleSubmit.bind( this );
  };

  // Validate the start date
  validateStartDate() {
    // Check for undefined and check its validity
    if( this.state.start_date ) {
      const start_date_string = this.state.start_date.format( 'MM-DD-YYYY' );
      const current_date_string = moment().format( 'MM-DD-YYYY' );

      if( !this.state.end_date ) {
        if( start_date_string > current_date_string )
          return 'success';

        else if( start_date_string < current_date_string )
          return 'error';

        else if( start_date_string == current_date_string )
          return 'warning';
      }

      else {
        const end_date_string = this.state.end_date.format( 'MM-DD-YYYY' );

        if( (start_date_string > end_date_string) || (start_date_string < current_date_string) )
          return 'error';

        else if( start_date_string < end_date_string )
          return 'success';

        else if( (start_date_string == end_date_string) || (start_date_string == current_date_string) )
          return 'warning';
      }
    }
  }

  // Validate the end date
  validateEndDate() {
    // Check for undefined and check validity
    if( this.state.end_date ) {
      const end_date_string = this.state.end_date.format( 'MM-DD-YYYY' );
      const current_date_string = moment().format( 'MM-DD-YYYY' );

      if( !this.state.start_date ) {
        if( end_date_string > current_date_string )
          return 'success';

        else if( end_date_string < current_date_string )
          return 'error';

        else if( end_date_string == current_date_string )
          return 'warning';
      }

      else {
        const start_date_string = this.state.start_date.format( 'MM-DD-YYYY' );

        if( (end_date_string < start_date_string) || (end_date_string < current_date_string) )
          return 'error';

        else if( end_date_string > start_date_string )
          return 'success';

        else if( end_date_string == start_date_string )
          return 'warning';
      }
    }
  }

  handleTripNameChange(event) {
    this.setState({
      name: event.target.value
    });
  }

  handleStartDateChange(date) {
    this.setState({
      start_date: date,
    });
  }

  handleEndDateChange(date) {
    this.setState({
      end_date: date
    });
  }

  handleCountryChange(country) {
    this.setState({
      country: country
    });
  }

  handleRegionChange(region) {
    this.setState({
      region: region
    });
  }

  handleActivityChange(event) {
    this.setState({
      type: event.target.value
    });
  }

  handleSubmit(event) {
    //alert('Your trip called ' + this.state.name + ' was submitted: ' + this.state.type + ' in ' + this.state.region + ', ' + this.state.country + ' (' + this.state.start_date.format("MMM Do YYYY") + " - " + this.state.end_date.format("MMM Do YYYY") + ')');
    let self = this;

    let xhr = new XMLHttpRequest();
    xhr.open( 'POST', 'http://localhost:8080/schdtrips/addTrip', true );
      xhr.onload = () => {
        self.props.onSaveSuccess();
        console.log( 'all data finished posting' );
      }
      xhr.setRequestHeader("Content-type", "application/json");
      xhr.send( JSON.stringify(this.state) );
      event.preventDefault();
  }

  render() {
    return(
      <div className="form">
        <Form horizontal onSubmit={this.handleSubmit}>

          <FormGroup controlId="tripName" bsSize="large">
            <Col componentClass={ControlLabel} sm={4}>
              Trip Name
            </Col>
            <Col>
              <FormControl
                type="text"
                value={this.state.name}
                placeholder="trip name"
                onChange={this.handleTripNameChange}
                sm={10}
              />
            </Col>
          </FormGroup>

          <FormGroup
            controlId="tripStartDate"
            validationState={this.validateStartDate()}
          >
            <Col componentClass={ControlLabel} sm={4}>
              Start Date
            </Col>
            <Col>
              <FormControl
                componentClass={DatePicker}
                placeholderText="start date"
                selected={this.state.start_date}
                onChange={this.handleStartDateChange}
                sm={10}
              />
            </Col>
          </FormGroup>

          <FormGroup
            controlId="tripEndDate"
            validationState={this.validateEndDate()}
          >
            <Col componentClass={ControlLabel} sm={4}>
              End Date
            </Col>
            <Col>
              <FormControl
                componentClass={DatePicker}
                placeholderText="end date"
                selected={this.state.end_date}
                onChange={this.handleEndDateChange}
                sm={10}
              />
            </Col>
          </FormGroup>

          <FormGroup controlId="destinationCountry">
            <ControlLabel> Destination Country </ControlLabel>
            <br/>
            <FormControl
              componentClass={CountryDropdown}
              value={this.state.country}
              onChange={this.handleCountryChange}
            />
          </FormGroup>

          <FormGroup controlId="destinationRegion">
            <ControlLabel> Destination Region </ControlLabel>
            <br/>
            <FormControl
              componentClass={RegionDropdown}
              country={this.state.country}
              value={this.state.region}
              onChange={this.handleRegionChange}
            />
          </FormGroup>

          <FormGroup controlId="tripActivity" bsSize="large">
            <ControlLabel> Activity </ControlLabel>
            <FormControl componentClass="select" placeholder="select">
              {this.props.tripTypes.map( (type, i) => <option value={type} key={i}> {type} </option> )}
            </FormControl>
          </FormGroup>

          <Button type="submit">Submit</Button>
        </Form>
      </div>
    );
  }
}

export default NewTripForm
