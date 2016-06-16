const path = require('path');
const baseConfig = require('./config.base');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const host = require('./host')({ OUTPUT_PATH: 'cordova/www/' });
const p = require('../package.json');
const HOT = process.env.HOT || false;

const plugins = [
  new ExtractTextPlugin('styles.css'),
  new webpack.DefinePlugin({
    'process.env': { 'NODE_ENV': JSON.stringify('development') },
    '__CORDOVA__': true
  }),
  // Saves an index.html file based on the cordova template
  new HtmlWebpackPlugin({
    template: './common/layouts/cordova.html',
    title: p.name,
    bundleJs: HOT ? `${host.ASSET_HOST}/bundle.js` : 'bundle.js' ,
    stylesheet: HOT ? `${host.ASSET_HOST}/styles.css` : 'styles.scss',
    initialState: {}
  })
];

const loaders = [{
  test: /\.scss$/,
  loader: ExtractTextPlugin.extract('css!sass')
}, {
  test: /\.jsx$|\.js$/,
  loader: 'babel',
  exclude: /node_modules/
}];

module.exports = Object.assign({}, baseConfig, {
  output: Object.assign({}, baseConfig.output, {
    path: path.join(__dirname, ('../' + host.OUTPUT_PATH)),
    publicPath: HOT ? host.ASSET_HOST : './'
  }),
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
