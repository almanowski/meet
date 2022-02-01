import React, {Component} from 'react';

import {ErrorAlert} from './Alert';

class NumberOfEvents extends Component {
  constructor(props) {
    super(props);
      this.state = {
        eventNumber: 32,
      }
  }

  handleInputChanged = (event) => {
    let value = event.target.value;
    if (value <= 0) {
      this.setState({
        eventNumber: 0,
        errorText: 'Please select a number higher than 0',
      });
    } else if (value > 32) {
      this.setState({
        eventNumber: 32,
        errorText: 'Please select a number lower than 33',
      });
    } else {
      this.setState({
        eventNumber: value,
        errorText: undefined
      });
    }
    if (this.props.updateNumberOfEvents)
      this.props.updateNumberOfEvents(value);
  };
 

  render() {
    return (
      <div className="number-of-events">
        <p className="number-of-events">Number of Events:</p>
        <input type="number" className="number" value={this.state.eventNumber} 
        onChange={this.handleInputChanged} 
        />
        <div className="warning-alert" style={this.state.errorText ? undefined : {display: 'none'}}>
          <ErrorAlert text={this.state.errorText} />
        </div>
      </div>
    )
  }
}

export default NumberOfEvents;