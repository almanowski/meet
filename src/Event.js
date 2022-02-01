import React, {Component} from "react";

class Event extends Component {
  state = {
    collapsed: true,
  };

  handleItemClicked = () => {
    this.setState({
      collapsed: !this.state.collapsed,
    });
  }

  render() {
    const {event} = this.props;
    const {collapsed} = this.state;
    
    return (
      <div className="event">
        <h2 className="summary">{event.summary}</h2>
        <p className="date-time">{event.start.dateTime}</p>
        <p className="location">{event.location}</p>

        {collapsed && 
          <button className="show-details" onClick={() => this.handleItemClicked()}>Details</button>
        }
        
        {!collapsed && 
          <div className="event-details">
            <p><b>About event:</b></p>
            <a className="link" href={event.htmlLink} target="_blank" rel="noreferrer">See details on Google Calender</a>
            <p className="description">{event.description}</p>
            <button className="hide-details" onClick={() => this.handleItemClicked()}>X</button>
          </div>
        }
      </div>
    )
  }
}
export default Event;