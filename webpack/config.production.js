var path       = require('path');
var webpack    = require('webpack');
var outputPath = 'dist/';
var port       = process.env.PORT || 3001;
var hostname   = process.env.HOSTNAME || 'localhost';
var assetHost  = process.env.ASSET_HOST || '/' + outputPath;
var common     = require('./config.common');
var baseUrl    = '/';
var isoConfig  = require('./config.isomorphic');

// plugins
var CompressionPlugin = require('compression-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var IsomorphicPlugin  = require('webpack-isomorphic-tools/plugin');

module.exports = {
  devtool: 'cheap-module-source-map',
  context: path.resolve(__dirname, '..'),
  entry: ['./client/index'],
  output: {
    path: path.join(__dirname, ('../' + outputPath)),
    filename: '[name].[hash].js',
    publicPath: assetHost
  },
  plugins: [
    new webpack.optimize.DedupePlugin(),
    new ExtractTextPlugin('[name].[hash].css'),
    new webpack.ContextReplacementPlugin(/moment[\/\\]locale$/, /en|es/),
    new IsomorphicPlugin(isoConfig),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        screw_ie8: true,
        warnings: false,
      }
    }),
    new webpack.optimize.AggressiveMergingPlugin(),
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
