import React, {Component} from 'react';

class Alert extends Component {
  constructor(props) {
    super(props);
    this.color = null;
  }

  getStyle = () => {
    return {
      color: 'black',
      backgroundColor: this.backgroundColor,
      padding: '5px 10px',
      fontSize: '14px', 
      fontWeight: '400',
      borderRadius: '4px',
    };
  }

  render() {
    return (
      <div>
        <p style={this.getStyle()}>{this.props.text}</p>
      </div>
    );
  }
}

class InfoAlert extends Alert {
  constructor(props) {
    super(props);
    this.backgroundColor = 'rgba(0, 55, 255, 0.3)';
  }
}

class ErrorAlert extends Alert {
  constructor(props) {
    super(props);
    this.backgroundColor = 'rgba(255, 0, 0, 0.5)';
  }
}

export {InfoAlert, ErrorAlert};