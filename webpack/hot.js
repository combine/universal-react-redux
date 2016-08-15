/* eslint-disable no-console */
const webpack = require('webpack');
const host = require('./host')();

module.exports = {
  entry: (hotUrl = host.HOST_URL) => ([
    'webpack-dev-server/client?' + hotUrl,
    'webpack/hot/only-dev-server'
  ]),
  plugins: [
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin()
  ],
  loaders: [{
    test: /\.scss$/,
    loader: 'style!css!sass'
  }, {
    test: /\.jsx$|\.js$/,
    loader: 'babel',
    exclude: /node_modules/,
    // use react-transform to hot reload modules when hot is specified
    query: {
      plugins: [
        ['react-transform', {
          transforms: [{
            transform: 'react-transform-hmr',
            imports: ['react'],
            locals: ['module']
          }, {
            transform: 'react-transform-catch-errors',
            imports: ['react', 'redbox-react']
          }]
        }]
      ]
    }
  }]
};
