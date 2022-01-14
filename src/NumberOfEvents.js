import React, {Component} from 'react';

class NumberOfEvents extends Component {
  state = {
    defaultNumber: 32,
  }

  handleInputChanged = (event) => {
    const value = event.target.value;
    
    this.setState({
      defaultNumber: value,
    });
  };

  render() {
    return (
      <div className="number-of-events">
        <p>Number of Events:</p>
        <input type="text" className="number" value={this.state.defaultNumber} onChange={this.handleInputChanged} />

      </div>
    )
  }
}

export default NumberOfEvents;