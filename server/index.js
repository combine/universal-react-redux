require('babel-register');

// Adds common/js to the app module path so we can access local modules without
// having to use relative paths on the server-side. This is done on the client
// side using webpack's `resolve`.
require('app-module-path').addPath('common/js');

// this must be equal to the Webpack configuration's "context" parameter
const basePath = require('path').resolve(__dirname, '..');
const ISOTools = require('webpack-isomorphic-tools');

// this global variable will be used later in express middleware
global.ISOTools = new ISOTools(require('../webpack/isomorphic'))
  .development(process.env.NODE_ENV === 'development')
  .server(basePath, () => require('./server'));
