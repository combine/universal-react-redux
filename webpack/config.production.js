var path       = require('path');
var webpack    = require('webpack');
var outputPath = 'dist/';
var port       = process.env.PORT || 3001;
var hostname   = process.env.HOSTNAME || 'localhost';
var host       = 'http://' + hostname + ':' + port;
var assetHost  = process.env.ASSET_HOST || host + '/' + outputPath;
var common     = require('./config.common');
var baseUrl    = '/';
var isoConfig  = require('./config.isomorphic');

// plugins
var CompressionPlugin = require('compression-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var IsomorphicPlugin  = require('webpack-isomorphic-tools/plugin');

module.exports = {
  devServerPort: port,
  devtool: 'cheap-module-source-map',
  context: path.resolve(__dirname, '..'),
  entry: ['./client/index'],
  output: {
    path: path.join(__dirname, ('../' + outputPath)),
    filename: 'bundle.js',
    publicPath: assetHost
  },
  plugins: [
    new ExtractTextPlugin('styles.css'),
    new webpack.ContextReplacementPlugin(/moment[\/\\]locale$/, /en|es/),
    new IsomorphicPlugin(isoConfig),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      }
    }),
    new CompressionPlugin({
      asset: '[file].gz',
      algorithm: 'gzip',
      test: /\.css$|\.js$|\.html$/,
      threshold: 10240,
      minRatio: 0.8
    }),
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify('production')
      },
      '__CORDOVA__': false,
      '__PRODUCTION__': true,
      '__DEVELOPMENT__': false,
      '__BASE_URL__': JSON.stringify(baseUrl)
    })
  ],
  resolve: {
    extensions: ['', '.js', '.scss']
  },
  module: {
    loaders: common.loaders.concat({
      test: /\.scss$/,
      loader: ExtractTextPlugin.extract('css!sass')
    }, {
      test: /\.js$/,
      loaders: ['babel'],
      exclude: /node_modules/
    })
  }
};
