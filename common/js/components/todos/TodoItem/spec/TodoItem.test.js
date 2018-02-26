import React from 'react';
import TodoItem from '../index';
import { shallow } from 'enzyme';

describe('TodoItem', () => {
  it('renders correctly', () => {
    const component = shallow(<TodoItem todo={{ id: 1, text: 'Work' }} />);
    expect(component).toMatchSnapshot();
  });
});
