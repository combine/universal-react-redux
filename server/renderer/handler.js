import React from 'react';
import { Provider } from 'react-redux';
import { StaticRouter, matchPath } from 'react-router';
import { setMobileDetect, mobileParser } from 'react-responsive-redux';
import { ErrorPage } from 'components/common';
import render from './render';
import routes from 'routes';
import configureStore from 'store';
import App from 'containers/App';

export default function handleRender(req, res) {
  const initialState = {};
  // Create a new Redux store instance
  const store = configureStore(initialState);

  // Server side responsive detection
  const mobileDetect = mobileParser(req);

  // set mobile detection for our responsive store
  store.dispatch(setMobileDetect(mobileDetect));

  // Grab the initial state from our Redux store
  const finalState = store.getState();

  // See react-router's Server Rendering section:
  // https://reacttraining.com/react-router/web/guides/server-rendering
  const matchRoutes = routes => {
    return routes.reduce((matches, route) => {
      const { path } = route;
      const match = matchPath(req.baseUrl, {
        path,
        exact: true,
        strict: false
      });

      if (match) {
        const wc = route.component && route.component.WrappedComponent;

        matches.push({
          route,
          match,
          fetchData: (wc && wc.fetchData) || (() => Promise.resolve())
        });
      }

      if (!match && route.routes) {
        // recursively try to match nested routes
        const nested = matchRoutes(route.routes);

        if (nested.length) {
          matches = matches.concat(nested);
        }
      }

      return matches;
    }, []);
  };

  const matches = matchRoutes(routes);

  // No matched route, render a 404 page.
  if (!matches.length) {
    res.contentType('text/html');
    res.status(404).send(render(<ErrorPage code={404} />, finalState));
    return;
  }

  // Otherwise, there is a match, so render the provider and router context
  const context = {};
  const component = (
    <Provider store={store}>
      <StaticRouter context={context} location={req.originalUrl}>
        <App />
      </StaticRouter>
    </Provider>
  );

  // an array of fetchData promises.
  const fetchData = matches.map(match => {
    const { fetchData, ...rest } = match; // eslint-disable-line no-unused-vars

    // return fetch data Promise, excluding unnecessary fetchData method
    return match.fetchData({ store, ...rest });
  });

  // Execute the render only after all promises have been resolved.
  Promise.all(fetchData).then(() => {
    const state = store.getState();
    const markup = render(component, state);

    // A 301 redirect was rendered somewhere if context.url exists after
    // rendering has happened.
    if (context.url) {
      return res.redirect(301, context.url);
    }

    return res.status(200).send(markup);
  });
}
