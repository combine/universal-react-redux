// cache the main layout template with lodash
import { template } from 'lodash';
import { renderToString } from 'react-dom/server';
import { Helmet } from 'react-helmet';

const { NODE_ENV } = process.env;
const compile = template(require('../common/layouts/server.html'));
const env = NODE_ENV || 'development';

export default function render(component, initialState = {}) {
  if (env === 'development') {
    global.ISOTools.refresh();
  }

  const assets = global.ISOTools.assets();
  const favicon = assets.assets['./common/images/favicon.png'];
  const vendorJs = assets.javascript.vendor;
  const appJs = assets.javascript.app;
  const html = renderToString(component);
  const helmet = Helmet.renderStatic();
  const vendorCss = assets.styles.vendor;
  const appCss = assets.styles.app;

  return compile(
    { html, helmet, favicon, vendorCss, appCss, vendorJs, appJs, initialState }
  );
}
