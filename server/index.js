require('babel-register');

// Adds common/js to the app module path so we can access local modules without
// having to use relative paths on the server-side. This is done on the client
// side using webpack's `resolve`.
require('app-module-path').addPath('common/js');

// css-modules-require-hook package allows us to require css files on the server.
require('css-modules-require-hook')({
  extensions: ['.scss'],
  generateScopedName: require('../package.json').config.css,
  devMode: process.env.NODE_ENV === 'development'
});

// this must be equal to the Webpack configuration's "context" parameter
const basePath = require('path').resolve(__dirname, '..');

// configure isomoprhic tools
const ISOTools = require('webpack-isomorphic-tools');
const isoConfig = require('../webpack/isomorphic').default;
const server = require('./server');

// this global variable will be used later in express middleware
global.ISOTools = new ISOTools(isoConfig).server(basePath, () => server);
