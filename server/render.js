// cache the main layout template with lodash
import { template } from 'lodash';
import { renderToString } from 'react-dom/server';
import config from './config';

const { NODE_ENV } = process.env;
const compile = template(require('../common/layouts/server.html'));
const env = NODE_ENV || 'development';

export default function render(component, initialState = {}) {
  if (env === 'development') {
    global.ISOTools.refresh();
  }

  const assets = global.ISOTools.assets();
  const title = config.name;
  const favicon = assets.assets['./common/images/favicon.png'];
  const vendorJs = assets.javascript.vendor;
  const appJs = assets.javascript.app;
  const html = renderToString(component);
  const vendorCss = assets.styles.vendor;
  const appCss = assets.styles.app;

  return compile(
    { html, title, favicon, vendorCss, appCss, vendorJs, appJs, initialState }
  );
}
