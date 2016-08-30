import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

// Import your reducers here
import example from './example';

const rootReducer = combineReducers({
  routing: routerReducer,
  example
});

export default rootReducer;
