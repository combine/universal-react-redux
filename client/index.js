import 'babel-polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'react-router-redux';
import { AppContainer } from 'react-hot-loader';
import createHistory from 'history/createBrowserHistory';
import configureStore from 'store';
import App from 'containers/App';

const history = createHistory();

/* Images
 * This space is reserved for images that are required by server rendering,
 * e.g. the favicon and any other images that need to be in the base HTML file.
 */
import '../common/images/favicon.png';

// The root element of your app
const rootElement = document.getElementById('app');

// Creates the Redux store based on the initial state passed down by the server
// rendering.
const initialState = window.__INITIAL_STATE__;
const store = configureStore(initialState, history);

const render = (Component) => {
  ReactDOM.render(
    <Provider store={store}>
      <AppContainer>
        <ConnectedRouter history={history}>
          <Component />
        </ConnectedRouter>
      </AppContainer>
    </Provider>,
    rootElement
  );
};

render(App);

if (module.hot) {
  // We need to re-require the main App module.
  module.hot.accept('../common/js/containers/App', () => {
    render(require('../common/js/containers/App').default);
  });
}
