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
const env = process.env.NODE_ENV || 'development';

export default function render(component, initialState) {
  if (env === 'development') {
    global.ISOTools.refresh();
  }

  const assets = global.ISOTools.assets();
  const title = config.name;
  const favicon = assets.assets['./common/images/favicon.png'];
  const vendorJs = assets.javascript.vendor;
  const appJs = assets.javascript.app;
  const html = renderToString(component);
  const stylesheet = env === 'development'
    ? config.assetHost + 'styles.css'
    : assets.styles.app;

  return compile({ html, title, favicon, stylesheet, vendorJs, appJs, initialState });
}
