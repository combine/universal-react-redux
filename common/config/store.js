import { compose, createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from '../reducers';
import persistState from 'redux-localstorage';
import { syncHistory } from 'react-router-redux';

export default function configureStore(initialState, options = {}) {
  const opts = Object.assign({}, {
    history: null,
    dispatchRouteChanges: false
  }, options);


  /* localStorage Persisted States
   * Set up persisted state properties via localStorage. They should be added
   * by their property name of the piece of state you want to persist, e.g:
   * const persistedStates = ['session', 'order'];
   */
  const persistedStates = [];

  /* Middleware
   * Configure this array with the middleware that you want included. thunk
   * is included by default, and react-router-redux's syncHistory is also
   * applied if an `options.history` object was passed to configureStore.
   */
  const middleware = [
    // add more middlware here
    thunk
  ].concat(
    opts.history ? [syncHistory(opts.history)] : []
  );

  // Create an a composed method which enhances redux's createStore with
  // additional functionality
  let enhancers = [
    // Universal enhancers (both server and client-side)
    applyMiddleware.apply(this, middleware)

  ].concat(isBrowser() ? [
    // Add browser/client-side only enhancers here
    // e.g. localStorage, geolocation, etc.
    persistState(persistedStates)

  ] : [
    // Add server-side only enhancers here

  ]);

  let enhanced = compose.apply(this, enhancers);

  // create store with enhancers, middleware, reducers, and initialState
  const store = enhanced(createStore)(rootReducer, initialState);

  if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept('../reducers', () => {
      const nextRootReducer = require('../reducers').default;
      store.replaceReducer(nextRootReducer);
    });
  }

  return store;
}

function isBrowser() {
  return (typeof window !== 'undefined' && typeof window.document !== 'undefined');
}
