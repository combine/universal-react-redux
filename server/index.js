require('babel-register');

const ISOTools = require('webpack-isomorphic-tools');

// this must be equal to the Webpack configuration's "context" parameter
const basePath = require('path').resolve(__dirname, '..');
const isoConfig = require('../webpack/config.isomorphic');
const dev = process.env.NODE_ENV === 'development';
const isoWithConfig = new ISOTools(isoConfig);
const isoCallback = () => require('./server');

// this global variable will be used later in express middleware
global.ISOTools = isoWithConfig.development(dev).server(basePath, isoCallback);
