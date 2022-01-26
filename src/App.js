import React, {Component} from 'react';
import './App.css';
import EventList from './EventList';
import CitySearch from './CitySearch';
import NumberOfEvents from './NumberOfEvents';
import {extractLocations, getEvents} from './api';

import './nprogress.css';


class App extends Component {
  state = {
    events: [],
    locations: [],
    eventNumber: 32,
    currentLocation: 'all'
  }

  componentDidMount() {
    this.mounted = true;
    getEvents().then((events) => {
      if (this.mounted) {
        this.setState({events: events.slice(0, this.state.eventNumber), locations: extractLocations(events)});
      }
    });
  }

  componentWillUnmount(){
    this.mounted = false;
  }

  updateEvents = (location, eventCount) => {
    getEvents().then((events) => {
      let locationEvents = (location === 'all') ?
        events : 
        events.filter((event) => event.location === location);
      eventCount = this.state.eventNumber;
      if (this.mounted) {
        this.setState({
          events: locationEvents.slice(0, eventCount),
          eventNumber: eventCount
        });
      }
    });
  }

  updateNumberOfEvents = (eventCount) => {
    this.setState({
      eventNumber: eventCount
    });
    this.updateEvents(this.state.currentLocation);
  }

  render() {
    return (
      <div className="App">
        <CitySearch locations={this.state.locations} updateEvents={this.updateEvents} />
        <NumberOfEvents eventNumber={this.state.eventNumber} updateNumberOfEvents={this.updateNumberOfEvents}/>
        <EventList events={this.state.events} />
      </div>
    );
  }
}

export default App;
