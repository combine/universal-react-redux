import { compose, createStore, applyMiddleware } from 'redux';
import rootReducer from 'reducers';

export default function configureStore(initialState) {
  /* Middleware
   * Configure this array with the middleware that you want included.
   */
  let middleware = [];

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
