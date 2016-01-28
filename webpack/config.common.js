var ISO       = require('webpack-isomorphic-tools/plugin');
var isDev     = process.env.NODE_ENV === 'development';
var isoPlugin = new ISO(require('./config.isomorphic')).development(isDev);

module.exports = {
  preLoaders: [{
    test: /\.jsx$|\.js$/,
    loader: 'eslint-loader',
    exclude: /node_modules/
  }],
  loaders: [{
    test: /\.json$/,
    loader: 'json'
  }, {
    test: isoPlugin.regular_expression('images'),
    loader: 'url-loader?limit=10240'
  }, {
    test: /\.(woff(2)?|eot|ttf|svg)(\?[a-z0-9=\.]*)?$/,
    loader: 'file'
  }, {
    test: /\.css?$/,
    loaders: ['style', 'raw']
  }]
};
