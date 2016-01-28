import { combineReducers } from 'redux';
import { routeReducer } from 'react-router-redux';

// Import your reducers here
import example from './example';

const rootReducer = combineReducers({
  routing: routeReducer,
  example
});

export default rootReducer;
