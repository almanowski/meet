import React from 'react';
import {shallow} from 'enzyme';
import NumberOfEvents from '../NumberOfEvents';

describe('<NumberOfEvents /> component', () => {
  let NumberOfEventshWrapper;
  beforeAll(() => {
    NumberOfEventshWrapper = shallow(<NumberOfEvents />);
  });

  // When a user hasn't specified a number, 32 is the default number

  test('render text input', () => {
    expect(NumberOfEventshWrapper.find('.number')).toHaveLength(1);
  });

  test('renders text input correctly', () => {
    const eventNumber = NumberOfEventshWrapper.state('eventNumber');
    expect(NumberOfEventshWrapper.find('.number').prop('value')).toBe(eventNumber);
  });

  // User can change the number of events they want to see

  test('change state when text input changes', () => {
    NumberOfEventshWrapper.setState({
      eventNumber: '32'
    });
    const eventObject = {target: {value: '15'}};
    NumberOfEventshWrapper.find('.number').simulate('change', eventObject);
    expect(NumberOfEventshWrapper.state('eventNumber')).toBe('15');
  });

  test('eventNumber to be empty if value zero or below', () => {
    const eventObject = {target: {value: '0'}};
    NumberOfEventshWrapper.find('.number').simulate('change', eventObject);
    expect(NumberOfEventshWrapper.state('eventNumber')).toBe(0);
  });

  test('eventNumber to be empty if value above 32', () => {
    const eventObject = {target: {value: '33'}};
    NumberOfEventshWrapper.find('.number').simulate('change', eventObject);
    expect(NumberOfEventshWrapper.state('eventNumber')).toBe(32);
  });

  
});