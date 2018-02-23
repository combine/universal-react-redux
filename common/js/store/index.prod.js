import { compose, createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from '@reducers';
import { routerMiddleware } from 'react-router-redux';

export default function configureStore(initialState, history = null) {
  /* Middleware
   * Configure this array with the middleware that you want included.
   */
  let middleware = [ thunk ];

  if (history) {
    middleware.push(routerMiddleware(history));
  }

  // Add universal enhancers here
  let enhancers = [];

  const enhancer = compose(...[
    applyMiddleware(...middleware),
    ...enhancers
  ]);

  // create store with enhancers, middleware, reducers, and initialState
  const store = createStore(rootReducer, initialState, enhancer);

  return store;
}
