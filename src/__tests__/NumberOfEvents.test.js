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
    const defaultNumber = NumberOfEventshWrapper.state('defaultNumber');
    expect(NumberOfEventshWrapper.find('.number').prop('value')).toBe(defaultNumber);
  });

  // User can change the number of events they want to see

  test('change state when text input changes', () => {
    NumberOfEventshWrapper.setState({
      defaultNumber: '32'
    });
    const eventObject = {target: {value: '15'}};
    NumberOfEventshWrapper.find('.number').simulate('change', eventObject);
    expect(NumberOfEventshWrapper.state('defaultNumber')).toBe('15');
  });


});