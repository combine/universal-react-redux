import { compose, createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from 'reducers';
import persistState from 'redux-localstorage';

/* localStorage Persisted States
 * Set up persisted state properties via localStorage. They should be added
 * by their property name of the piece of state you want to persist, e.g:
 * const persistedStates = ['session', 'order'];
 */
const persistedStates = [];

export default function configureStore(initialState, localStorage = true) {
  /* Middleware
   * Configure this array with the middleware that you want included. thunk
   * is included by default, and react-router-redux's syncHistory is also
   * applied if an `options.history` object was passed to configureStore.
   */
  let middleware = [thunk];

  // Add universal enhancers here
  let enhancers = [];

  // Client-side enhancers and middleware
  if (isBrowser()) {
    if (localStorage) {
      enhancers.push(persistState(persistedStates));
    }
  }

  const enhancer = compose(...[
    applyMiddleware(...middleware),
    ...enhancers
  ]);

  // create store with enhancers, middleware, reducers, and initialState
  const store = createStore(rootReducer, initialState, enhancer);

  return store;
}

function isBrowser() {
  return (typeof window !== 'undefined' && typeof window.document !== 'undefined');
}
