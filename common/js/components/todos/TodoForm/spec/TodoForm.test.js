import React from 'react';
import TodoForm from '../index';
import { mount } from 'enzyme';

describe('TodoForm', () => {
  it('renders correctly', () => {
    const component = mount(<TodoForm />);
    expect(component).toMatchSnapshot();
  });

  describe('clicking on submit button', () => {
    test('calls the onSubmit prop', () => {
      const mockSubmit = jest.fn();
      const component = mount(<TodoForm onSubmit={mockSubmit} />);

      // test form submission
      component.setState({ todoText: 'Foobar' });
      component.find('form').simulate('submit');

      expect(mockSubmit.mock.calls.length).toEqual(1);
    });
  });
});
