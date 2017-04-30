import { ADD_TODO, REMOVE_TODO, TOGGLE_TODO } from 'constants';

const defaultState = [];

const todos = (state = defaultState, action) => {
  switch (action.type) {
    case ADD_TODO:
      return [...state, { id: Date.now(), text: action.text, completed: false }];

    case REMOVE_TODO:
      return state.filter(todo => todo.id !== action.id);

    case TOGGLE_TODO:
      return state.map(todo => {
        if (todo.id === action.id) {
          return { ...todo, completed: !todo.completed };
        }
        return todo;
      });

    default:
      return state;
  }
};

export default todos;
