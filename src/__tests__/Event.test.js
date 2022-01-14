import React from 'react';
import {shallow} from 'enzyme';
import Event from '../Event';
import {mockData} from '../mock-data';

describe('<EvenList /> component', () => {
  let EventWrapper;
  beforeAll(() => {
      EventWrapper = shallow(<Event event={mockData[0]}  />);
  });

  // An event element is collapsed by default

  test('render the event componen', () => {
    expect(EventWrapper.find('.event')).toHaveLength(1);
  })

  test('summary is displayed as headline', () => {
    expect(EventWrapper.find('.summary')).toHaveLength(1);
  })

  test('dateTime is displayed', () => {
    expect(EventWrapper.find('.date-time')).toHaveLength(1);
  })

  test('location is displayed', () => {
    expect(EventWrapper.find('.location')).toHaveLength(1);
  })

  test('details-button is displayed', () => {
    expect(EventWrapper.find('.show-details')).toHaveLength(1);
  })

  test('render api-input correctly', () => {
    expect(EventWrapper.find('.summary').text()).toBe(mockData[0].summary);
    expect(EventWrapper.find('.date-time').text()).toBe(mockData[0].start.dateTime);
    expect(EventWrapper.find('.location').text()).toBe(mockData[0].location);
  })

  test('event element is collapsed by default', () => {
      expect(EventWrapper.state('collapsed')).toBe(true);
  });

  // User can expand an event to see its details

  test('clicking details-button should expand element', () => {
    EventWrapper.setState({
      collapsed: true,
    });
    EventWrapper.find('.show-details').simulate('click');
    expect(EventWrapper.state('collapsed')).toBe(false);
  });

  test('details-button is not displayed when the element is expanded', () => {
    EventWrapper.setState({
      collapsed: false,
    });
    expect(EventWrapper.find('.show-details')).toHaveLength(0);
  });

  test('event-details is displayed', () => {
    EventWrapper.setState({
      collapsed: false,
    });
    expect(EventWrapper.find('.event-details').children()).toHaveLength(4);
  });

  test('render event-details api-input correctly', () => {
    expect(EventWrapper.find('a').prop('href')).toBe(mockData[0].htmlLink);
    expect(EventWrapper.find('.description').text()).toBe(mockData[0].description);
  })

  // User can collapse an event to hide its details

  test('clicking closed-button should collaps element', () => {
    EventWrapper.setState({
      collapsed: false,
    });
    EventWrapper.find('.hide-details').simulate('click');
    expect(EventWrapper.state('collapsed')).toBe(true);
  });
  
});