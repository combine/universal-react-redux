var path              = require('path');
var env               = process.env.NODE_ENV || 'development';
var webpack           = require('webpack');
var webpackConfig     = require(`./config.${env}`);
var HtmlWebpackPlugin = require('html-webpack-plugin');
var port              = process.env.PORT || 3001;
var hostname          = process.env.HOSTNAME || 'localhost';
var host              = 'http://' + hostname + ':' + port;
var outputPath        = 'cordova/www/';
var hotAssetHost      = host + '/' + outputPath;
var hotCordova        = process.env.HOT_CORDOVA;
var p                 = require('../package.json');

// this is the URL that gets inserted into the application as the base url
// for all API requests. In the browser it can simply be /api, but on cordova
// where there is no server, it must point to a remote location
// NOTE: Must include trailing slash in the url (/).
var apiRootUrl = {
  production: 'https://bulk-b2b.herokuapp.com/',
  development: 'http://localhost:3000/'
};

webpackConfig.output = {
  path: path.join(__dirname, '../' + outputPath),
  filename: 'bundle.js',
  publicPath: hotCordova ? hotAssetHost : './'
};

// replace globals
// skip the last plugin from the require()'d config file, which is the globals
// definition file...
webpackConfig.plugins = webpackConfig.plugins.slice(0, -2).concat(
  // ...and replace it with the new globals set here
  new webpack.DefinePlugin({
    'process.env': {
      'NODE_ENV': JSON.stringify(env)
    },
    '__CORDOVA__': true,
    '__PRODUCTION__': env == 'production',
    '__DEVELOPMENT__': env != 'production',
    '__BASE_URL__': JSON.stringify(apiRootUrl[env])
  }),
  // add another plugin to save an index.html file based on the cordova template
  new HtmlWebpackPlugin({
    template: './common/templates/cordova.html',
    title: p.name,
    bundleJs: (hotCordova ? hotAssetHost : '') + 'bundle.js',
    stylesheet: (hotCordova ? hotAssetHost : '') + 'styles.css',
    initialState: {}
  })
);

module.exports = webpackConfig;
