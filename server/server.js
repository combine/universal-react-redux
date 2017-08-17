import path from 'path';
import Express from 'express';
import React from 'react';
import { Provider } from 'react-redux';
import { StaticRouter, matchPath } from 'react-router';
import render from './render';
import routes from 'routes';
import ErrorPage from 'components/ErrorPage';
import configureStore from 'store';
import serveStatic from 'serve-static';
import compression from 'compression';
import App from 'containers/App';
import Api from './api';

const { PORT, APPLICATION_PORT } = process.env;
const app = new Express();
const port = PORT || APPLICATION_PORT || 3000;

// gzip
app.use(compression());

// Use this middleware to serve up static files built into dist
app.use('/dist', serveStatic(path.join(__dirname, '../dist')));

// Mount the REST API
app.use('/api', Api);

// This is fired every time the server side receives a request
app.use(handleRender);

function handleRender(req, res) {
  // This can come from the server somewhere if you want to pre-populate the
  // app's initial state.
  const initialState = {};

  // Create a new Redux store instance
  const store = configureStore(initialState);

  // Grab the initial state from our Redux store
  const finalState = store.getState();

  // See react-router's Server Rendering section:
  // https://reacttraining.com/react-router/web/guides/server-rendering
  const matches = routes.reduce((matches, route) => {
    const { path } = route;
    const match = matchPath(req.url, { path, exact: true, strict: false });

    if (match) {
      const wc = route.component && route.component.WrappedComponent;

      matches.push({
        route,
        match,
        fetchData: (wc && wc.fetchData) || (() => Promise.resolve())
      });

    }

    return matches;
  }, []);

  // No matched route, render a 404 page.
  if (!matches.length) {
    res.status(404).send(render(<ErrorPage code={404} />, finalState));
    return;
  }

  // Otherwise, there is a match, so render the provider and router context
  const component = (
    <Provider store={store}>
      <StaticRouter context={{}} location={req.url}>
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
  Promise
    .all(fetchData)
    .then(() => {
      const state = store.getState();
      res.status(200).send(render(component, state));
    });

}

app.listen(port, (error) => {
  if (error) {
    console.error(error);
  } else {
    console.info(`Application server mounted locally on port ${port}.`);
  }
});
