import React, {Component} from 'react';

class NumberOfEvents extends Component {
  state = {
    defaultNumber: 32,
  }

  handleInputChanged = (event) => {
    const value = event.target.value;
    if (value <= 0) {
      this.setState({
        defaultNumber: '',
      });
    } else {
      this.setState({
        defaultNumber: value,
      });
      this.props.updateNumberOfEvents(value);
    }
  };
 

  render() {
    return (
      <div className="number-of-events">
        <p>Number of Events:</p>
        <input type="number" className="number" value={this.state.defaultNumber} 
        onChange={this.handleInputChanged} 
        />
      </div>
    )
  }
}

export default NumberOfEvents;