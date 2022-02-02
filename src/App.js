import React, {Component} from 'react';
import './App.css';
import EventList from './EventList';
import CitySearch from './CitySearch';
import NumberOfEvents from './NumberOfEvents';
import {extractLocations, getEvents, checkToken, getAccessToken} from './api';
import WelcomeScreen from './WelcomeScreen';
import {InfoAlert} from './Alert';

import './nprogress.css';


class App extends Component {
  state = {
    events: [],
    locations: [],
    eventNumber: 32,
    currentLocation: 'all',
    showWelcomeScreen: undefined
  }

  async componentDidMount() {
    this.mounted = true;
    const accessToken = localStorage.getItem('access_token');
    const isTokenValid = (await checkToken(accessToken)).error ? false : true;
    const searchParams = new URLSearchParams(window.location.search);
    const code = searchParams.get('code');

    this.setState({showWelcomeScreen: !(code || isTokenValid) });
    if ((code || isTokenValid) && this.mounted) {
      getEvents().then((events) => {
        if (this.mounted) {
          this.setState({events: events.slice(0, this.state.eventNumber), locations: extractLocations(events) });
        }
      });
    }

/*     getEvents().then((events) => {
      if (this.mounted) {
        this.setState({events: events.slice(0, this.state.eventNumber), locations: extractLocations(events)});
      }
    }); */

    if (!navigator.onLine) {
      this.setState ({
        infoText: 'You are offline.'
      })
    }
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
          eventNumber: eventCount,
          currentLocation: location
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
    if (this.state.showWelcomeScreen === undefined) return <div className='App' />
    return (
      <div>
        <header>
          <p className="Logo">LEME</p>
          <p className="Slogan">- Learn new skills & meet new people</p>
        </header>
        <div className="info-alert" style={this.state.infoText ? undefined : {display: 'none'}}>
          <InfoAlert text={this.state.infoText} />
        </div>
        <div className="App">
          <CitySearch locations={this.state.locations} updateEvents={this.updateEvents} />
          <NumberOfEvents eventNumber={this.state.eventNumber} updateNumberOfEvents={this.updateNumberOfEvents}/>
          <EventList events={this.state.events} />
          <WelcomeScreen showWelcomeScreen={this.state.showWelcomeScreen} getAccessToken={() => {getAccessToken()}} />
        </div>
      </div>
    );
  }
}

export default App;
