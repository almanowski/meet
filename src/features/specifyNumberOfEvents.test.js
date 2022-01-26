import React from 'react';
import {loadFeature, defineFeature} from "jest-cucumber";
import {mount} from 'enzyme';

import {mockData} from '../mock-data';

import NumberOfEvents from '../NumberOfEvents';
import App from '../App';


const feature = loadFeature('./src/features/specifyNumberOfEvents.feature');

defineFeature(feature, test => {
  test('When user hasn’t specified a number, 32 is the default number.', ({ given, when, then }) => {
    let AppWrapper
    AppWrapper = mount(<App />);
    given('the list of events has been loaded', () => {
      AppWrapper.update();
      expect(AppWrapper.find('.event')).toHaveLength(mockData.length)
    });

    when('a user does not enter or select a specific number of events to be shown', () => {

    });

    
    then('thirty-two will be the number of events displayed', () => {
      expect(AppWrapper.find(NumberOfEvents).props().eventNumber).toEqual(32);
    });
  });

  test('User can change the number of events they want to see.', ({ given, when, then }) => {
    let AppWrapper
    AppWrapper = mount(<App />);
    given('the list of events has been loaded', () => {
      AppWrapper.update();
      expect(AppWrapper.find('.event')).toHaveLength(mockData.length)
    });

    when('a user enters or selects a specific number of events to be shown', async () => {
      AppWrapper.find('.number').simulate('change', { target: { value: 5 } });
      AppWrapper.update();
    });

    then('the specific number of events will be displayed', () => {
      expect(AppWrapper.state('eventNumber')).toEqual(5);
    });
  });
});