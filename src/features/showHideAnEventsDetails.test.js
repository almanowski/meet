import React from 'react';
import {loadFeature, defineFeature} from "jest-cucumber";
import {mount, shallow} from 'enzyme';

import {mockData} from '../mock-data';

import App from '../App';
import Event from '../Event';


const feature = loadFeature('./src/features/showHideAnEventsDetails.feature');

defineFeature(feature, test => {
  test('An event element is collapsed by default.', ({ given, when, then, and }) => {
    let AppWrapper
    AppWrapper = mount(<App />);
    given('the list of events has been loaded', () => {
      AppWrapper.update();
      expect(AppWrapper.find('.event')).toHaveLength(mockData.length)
    });

    when('a user doesn\'t click on an event element', () => {

    });

    let EventWrapper;
    then('the event element will be collapsed by default', () => {
      EventWrapper = shallow(<Event event={mockData[0]}  />)
      expect(EventWrapper.state('collapsed')).toBe(true);
    });

    and('hide event details', () => {
      expect(EventWrapper.find('.event-details').children()).toHaveLength(0);
    });
  });


  test('User can expand an event to see its details.', ({ given, when, then, and }) => {
    let AppWrapper
    AppWrapper = mount(<App />);
    given('the list of events has been loaded', () => {
      AppWrapper.update();
      expect(AppWrapper.find('.event')).toHaveLength(mockData.length)
    });

    let EventWrapper
    when('a user clicks on an element', () => {
      EventWrapper = shallow(<Event event={mockData[0]}  />)
      EventWrapper.find('.show-details').simulate('click');
    });

    then('the event element will expand', () => {
      expect(EventWrapper.state('collapsed')).toBe(false);
    });

    and('show event details', () => {
      expect(EventWrapper.find('.event-details').children()).toHaveLength(4);
    });
  });

  test('User can collapse an event to hide its details.', ({ given, and, when, then }) => {
    let EventWrapper
    given('the event element has been clicked', () => {
      EventWrapper = shallow(<Event event={mockData[0]}  />)
      EventWrapper.find('.show-details').simulate('click');
    });

    and('is expanded', () => {
      expect(EventWrapper.state('collapsed')).toBe(false);
    });

    when('a user clicks on the event element again or clicks a specific button', () => {
      EventWrapper.find('.hide-details').simulate('click');
    });

    then('the event element will collapse', () => {
      expect(EventWrapper.state('collapsed')).toBe(true);
    });

    and('will hide the event details', () => {
      expect(EventWrapper.find('.event-details').children()).toHaveLength(0);
    });
  });
});