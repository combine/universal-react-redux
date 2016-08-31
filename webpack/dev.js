const baseConfig = require('./base');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const p = require('../package.json');

const plugins = [
  new ExtractTextPlugin('styles.css')
];

const loaders = [
  {
    test: /\.jsx$|\.js$/,
    loader: 'babel-loader',
    exclude: /node_modules/
  },
  {
    test: /\.css$/,
    loader: ExtractTextPlugin.extract(
      'style',
      `css?minimize&modules&importLoaders=1&localIdentName=${p.config.css}` +
      '!postcss'
    )
  },
  {
    test: /\.scss$/,
    loader: ExtractTextPlugin.extract(
      'style',
      `css?minimize&modules&importLoaders=1&localIdentName=${p.config.css}` +
      '!postcss' +
      '!sass'
    )
  }
];

module.exports = Object.assign({}, baseConfig, {
  eslint: { configFile: './.eslintrc' },
  devtool: 'source-map',
  plugins: [
    ...baseConfig.plugins,
    ...plugins
  ],
  module: Object.assign({}, baseConfig.module, {
    loaders: [
      ...baseConfig.module.loaders,
      ...loaders
    ]
  })
});
