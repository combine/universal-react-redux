import path from 'path';
import Express from 'express';
import React from 'react';
import ReactDOMServer from 'react-dom/server';
import { Provider } from 'react-redux';
import { RouterContext, match } from 'react-router';
import routes from 'routes';
import config from './config';
import configureStore from 'store';
import serveStatic from 'serve-static';
import fs from 'fs';
import compression from 'compression';
import template from 'lodash/template';

// Tell node.js to load html files as a string
require.extensions['.html'] = (module, filename) => {
  module.exports = fs.readFileSync(filename, 'utf8');
};

const app = new Express();
const port = config.port;

// cache the main layout template with lodash
const compiledTemplate = template(require('../common/layouts/server.html'));

// gzip
app.use(compression());

// Use this middleware to serve up static files built into dist
app.use('/dist', serveStatic(path.join(__dirname, '../dist')));

// This is fired every time the server side receives a request
app.use(handleRender);

function handleRender(req, res) {
  // Compile an initial state
  // This can come from the server somewhere if you want to pre-populate the
  // app's initial state.
  const initialState = { };

  // Create a new Redux store instance
  const store = configureStore(initialState);

  // Grab the initial state from our Redux store
  const finalState = store.getState();

  // See react-router's Server Rendering section:
  // https://github.com/rackt/react-router/blob/master/docs/guides/advanced/ServerRendering.md
  match({ routes, location: req.url }, (error, redirectLocation, renderProps) => {
    if (redirectLocation) {
      res.redirect(301, redirectLocation.pathname + redirectLocation.search);
    } else if (error) {
      res.status(500).send(error.message);
    } else if (renderProps == null) {
      res.status(404).send('Not found');
    } else {

      // for isomorphic requires. see index.js
      // clear require() cache if in development mode
      // (makes asset hot reloading work)
      if (process.env.NODE_ENV == 'development') {
        global.ISOTools.refresh();
      }

      renderProps.assets = global.ISOTools.assets();

      // Render the component to a string with the RouterContext
      let html = ReactDOMServer.renderToString(
        <Provider store={store}>
          <RouterContext {...renderProps} />
        </Provider>
      );
      // Send the rendered page back to the client
      res.send(renderFullPage(html, finalState, renderProps));
    }
  });
}

function renderFullPage(html, initialState, renderProps) {
  let assets = renderProps.assets.assets;
  let assetHost = config.assetHost;
  let title = config.name;
  let favicon = assets['./common/images/favicon.png'];
  let stylesheet = assetHost + 'styles.css';
  let vendorJs = assetHost + 'vendor.js';
  let appJs = assetHost + 'app.js';
  return compiledTemplate({
    html,
    title,
    favicon,
    stylesheet,
    vendorJs,
    appJs,
    initialState
  });
}

app.listen(port, (error) => {
  if (error) {
    console.error(error);
  } else {
    console.info(`🌎 Application server listening on port ${port}.`);
  }
});
