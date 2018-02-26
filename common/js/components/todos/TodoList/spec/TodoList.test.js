import React from 'react';
import TodoList from '../index';
import { shallow } from 'enzyme';

describe('TodoList', () => {
  let todos = {
    isFetched: true,
    todos: [
      {
        id: 1,
        text: 'Learn React',
        completed: true
      },
      {
        id: 2,
        text: 'Learn Redux',
        completed: true
      }
    ]
  };


  it('renders correctly', () => {
    const component = shallow(<TodoList todos={todos} />);
    expect(component).toMatchSnapshot();
  });
});
