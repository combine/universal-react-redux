/* eslint-disable no-console */
var webpack = require('webpack');
var WebpackDevServer = require('webpack-dev-server');
var hotCordova = process.env.HOT_CORDOVA;
var config = require('./config.' + (hotCordova ? 'cordova' : 'development'));
var hostname = process.env.HOSTNAME || 'localhost';

console.info('Firing up Wepback dev server...');

new WebpackDevServer(webpack(config), {
  publicPath: config.output.publicPath,
  hot: true,
  historyApiFallback: true,
  noInfo: false,
  quiet: false,
  headers: {'Access-Control-Allow-Origin': '*'},
  stats: {
    colors: true
  }
}).listen(config.devServerPort, hostname, function errorCallback(err) {
  if (err) {
    console.error(err);
  } else {
    console.info('🚧 Webpack client dev-server listening on ' + hostname + ':' + config.devServerPort + ' with publicPath:' + config.output.publicPath);
  }
});
