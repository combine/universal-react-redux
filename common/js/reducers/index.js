import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

// Import your reducers here
import todos from './todos';

const rootReducer = combineReducers({
  routing: routerReducer,
  todos
});

export default rootReducer;
