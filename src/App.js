import React, {Component} from 'react';
import './App.css';
import EventList from './EventList';
import CitySearch from './CitySearch';
import NumberOfEvents from './NumberOfEvents';
import EventGenre from './EventGenre';
import {extractLocations, getEvents, checkToken, getAccessToken} from './api';
import WelcomeScreen from './WelcomeScreen';
import {ErrorAlert} from './Alert';
import {ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer} from 'recharts';

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
    if (navigator.onLine) {
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
      } else if (!navigator.onLine) {
        getEvents().then((events) => {
          if (this.mounted) {
            this.setState({events: events.slice(0, this.state.eventNumber), locations: extractLocations(events) });
          }
      });  
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

  getData = () => {
    const {locations, events} = this.state;
    const data = locations.map((location) => {
      const number = events.filter((event) => event.location === location).length
      const city = location.split(', ').shift()
      return {city, number};
    })
    return data;
  };

  render() {
      return (
      <div>
        <header>
          <p className="Logo">MEET</p>
          <p className="Slogan">Learn new skills & meet new people</p>
        </header>
          <div className="App">
          {!navigator.onLine &&
            <div className="offline-alert">
              <ErrorAlert text='You are offline' />
            </div>
          }
          <CitySearch locations={this.state.locations} updateEvents={this.updateEvents} />
          <NumberOfEvents eventNumber={this.state.eventNumber} updateNumberOfEvents={this.updateNumberOfEvents}/>

          <div className="data-vis-wrapper">
            <EventGenre events={this.state.events} />
            <ResponsiveContainer height={400}>
              <ScatterChart margin={{top: 20, right: 20, bottom: 20, left:20}}>
                <CartesianGrid stroke="#ffe2b8" fill="#fff" />
                <XAxis type="category" dataKey="city" name="city" stroke="#804a00" strokeWidth={2} />
                <YAxis allowDecimals={false} type="number"  dataKey="number" name="number of events" stroke="#804a00" strokeWidth={2} />
                <Tooltip cursor={{ strokeDasharray: '3 3' }} />
                <Scatter  data={this.getData()} fill="#ffb347" shape="star" />
              </ScatterChart>
            </ResponsiveContainer>
          </div>

          <EventList events={this.state.events} />
        </div>
        <WelcomeScreen showWelcomeScreen={this.state.showWelcomeScreen} getAccessToken={() => { getAccessToken() }} />
      </div>
      )

  }
}

export default App;
