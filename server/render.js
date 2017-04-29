// cache the main layout template with lodash
import { template } from 'lodash';
import { renderToString } from 'react-dom/server';
import config from './config';
import fs from 'fs';

// Tell node.js to load html files as a string
require.extensions['.html'] = (module, filename) => {
  module.exports = fs.readFileSync(filename, 'utf8');
};

const compile = template(require('../common/layouts/server.html'));

export default function render(component, initialState) {
  // TODO: Replace this.
  if (process.env.NODE_ENV == 'development') {
    global.ISOTools.refresh();
  }

  const assets = global.ISOTools.assets().assets;
  const assetHost = config.assetHost;
  const title = config.name;
  const favicon = assets['./common/images/favicon.png'];
  const stylesheet = assetHost + 'styles.css';
  const vendorJs = assetHost + 'vendor.js';
  const appJs = assetHost + 'app.js';
  const html = renderToString(component);

  return compile({ html, title, favicon, stylesheet, vendorJs, appJs, initialState });
}
