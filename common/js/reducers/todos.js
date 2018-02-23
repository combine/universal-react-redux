import {
  ADD_TODO, REMOVE_TODO, TOGGLE_TODO,
  FETCH_TODOS_REQUEST, FETCH_TODOS_SUCCESS, FETCH_TODOS_FAILURE
} from '@constants/index';

const defaultState = {
  todos: [],
  isFetching: false,
  isFetched: false,
  error: null
};

const todos = (state = defaultState, action) => {
  switch (action.type) {
    case ADD_TODO:
      return {
        ...state,
        todos: [
          ...state.todos, { id: Date.now(), text: action.text, completed: false }
        ]
      };

    case REMOVE_TODO:
      return {
        ...state,
        todos: state.todos.filter(todo => todo.id !== action.id)
      };

    case TOGGLE_TODO:
      return {
        ...state,
        todos: state.todos.map(todo => {
          if (todo.id === action.id) {
            return { ...todo, completed: !todo.completed };
          }
          return todo;
        })
      };

    case FETCH_TODOS_REQUEST:
      return { ...state, isFetching: true, isFetched: false };

    case FETCH_TODOS_SUCCESS:
      return { ...state, todos: action.todos, isFetching: false, isFetched: true };

    case FETCH_TODOS_FAILURE:
      return { ...state, isFetching: false, isFetched: false, error: action.error };

    default:
      return state;
  }
};

export default todos;
