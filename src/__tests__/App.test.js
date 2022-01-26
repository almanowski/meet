import React from 'react';
import {shallow, mount} from 'enzyme';
import App from '../App';
import EventList from '../EventList';
import CitySearch from '../CitySearch';
import NumberOfEvents from '../NumberOfEvents';

import {mockData} from '../mock-data';
import {extractLocations, getEvents} from '../api';


// Unit tests
describe('<App />', () => {
  let AppWrapper;
  beforeAll(() => {
    AppWrapper = shallow(<App />)
  });

  test('render list of events', () => {
    expect(AppWrapper.find(EventList)).toHaveLength(1);
  });

  test('render CitySearch', () => {
    expect(AppWrapper.find(CitySearch)).toHaveLength(1);
  });

  test('render NumberOfEvents', () => {
    expect(AppWrapper.find(NumberOfEvents)).toHaveLength(1);
  });
})


// Integration tests
describe('<App /> integration', () => {
  let AppWrapper;
  beforeEach(() => {
    AppWrapper = mount(<App />)
  });

  // EventList
  test('App passes "events" state as a prop to EventList', () => {
    AppWrapper.update();
    const AppEventsState = AppWrapper.state('events');
    expect(AppEventsState).not.toEqual(undefined);
    expect(AppWrapper.find(EventList).props().events).toEqual(AppEventsState);
    AppWrapper.unmount();
  });

  test('App passes the data to EventList', async () => {
    AppWrapper.update();
    const EventListWrapper = AppWrapper.find(EventList);
    expect(EventListWrapper.props().events.length).toEqual(mockData.length);
    AppWrapper.unmount();
  });

  // CitySearch
  test('App passs "locations" state as a prop to CitySearch', () => {
    AppWrapper.update();
    const AppLocationsState = AppWrapper.state('locations');
    expect(AppLocationsState).not.toEqual(undefined);
    expect(AppWrapper.find(CitySearch).props().locations).toEqual(AppLocationsState);
    AppWrapper.unmount();
  });

  test('get list of events matching the city selected by the user', async () => {
    const CitySearchWrapper = AppWrapper.find(CitySearch);
    const locations = extractLocations(mockData);
    CitySearchWrapper.setState({suggestions: locations});
    const suggestions = CitySearchWrapper.state('suggestions');
    const selectedIndex = Math.floor(Math.random() * (suggestions.length));
    const selectedCity = suggestions[selectedIndex];
    await CitySearchWrapper.instance().handleItemClicked(selectedCity);
    const allEvents = await getEvents();
    const eventsToShow = allEvents.filter(event => event.location === selectedCity);
    expect(AppWrapper.state('events')).toEqual(eventsToShow);
    AppWrapper.unmount();
  });

  test('get list of all events when user selects "See all cities"', async () => {
    const suggestionItems = AppWrapper.find(CitySearch).find('.suggestions li');
    await suggestionItems.at(suggestionItems.length - 1).simulate('click');
    const allEvents = await getEvents();
    expect(AppWrapper.state('events')).toEqual(allEvents);
    AppWrapper.unmount();
  })


  // NumberOfEvents
  test('App passs "eventNumber" state as a prop to NumberOfEvents', () => {
    const AppNumberOfEventsState = AppWrapper.state('eventNumber');
    expect(AppNumberOfEventsState).not.toEqual(undefined);
    expect(AppWrapper.find(NumberOfEvents).props().eventNumber).toEqual(32);
    AppWrapper.unmount();
  });

  test('get list of events matching the number selected by the user', async () => {
    const NumberOfEventshWrapper = AppWrapper.find(NumberOfEvents);
    const selectedNumber = {target: {value: 20}};
    await NumberOfEventshWrapper.instance().handleInputChanged(selectedNumber);
    expect(AppWrapper.state('eventNumber')).toBe(20);
    AppWrapper.unmount();
  });

  test('Displayed events equal to selected Number', async () => {
    await AppWrapper.instance().updateNumberOfEvents(1);
    expect(AppWrapper.state('events').length).toEqual(1);
    AppWrapper.unmount();
  })

  test('Event props in EventList equal to selected Number', async () => {
    AppWrapper.update();
    AppWrapper.find('.number').simulate('change', { target: { value: '5' } });
    AppWrapper.update();
    const AppEventsState = AppWrapper.state('events');
    expect(AppWrapper.find(EventList).props().events.length).toEqual(AppEventsState.length)
    AppWrapper.unmount();
  });

  test('App passes "events" state as a prop to EventLis equal to selected Number', () => {
    AppWrapper.update();
    AppWrapper.find('.number').simulate('change', { target: { value: '5' } });
    AppWrapper.update();
    const AppEventsState = AppWrapper.state('events');
    expect(AppWrapper.find(EventList).props().events).toEqual(AppEventsState);
    AppWrapper.unmount();
  });
});