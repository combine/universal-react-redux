const path = require('path');
const webpack = require('webpack');
const mapValues = require('lodash/mapValues');
const autoprefixer = require('autoprefixer');
const isomorphicConfig = require('./iso');
const IsomorphicPlugin = require('webpack-isomorphic-tools/plugin');
const host = require('./host')();

const isDev = process.env.NODE_ENV === 'development';
const isomorphicPlugin = new IsomorphicPlugin(isomorphicConfig).development(isDev);

const resolvePaths = {
  actions: 'common/js/actions',
  components: 'common/js/components',
  containers: 'common/js/containers',
  constants: 'common/js/constants',
  css: 'common/css',
  fonts: 'common/fonts',
  images: 'common/images',
  layouts: 'common/layouts',
  lib: 'common/js/lib',
  middleware: 'common/js/middleware',
  reducers: 'common/js/reducers',
  routes: 'common/js/routes',
  selectors: 'common/js/selectors',
  store: 'common/js/store'
};

module.exports = {
  context: path.resolve(__dirname, '..'),
  entry: {
    vendor: [
      'babel-polyfill',
      'classnames',
      'history',
      'lodash',
      'jquery',
      'react',
      'react-dom',
      'react-redux',
      'react-router',
      'react-router-redux',
      'redux',
      'redux-localstorage',
      'redux-thunk',
      'reselect'
    ],
    app: [
      './client/index'
    ]
  },
  output: {
    path: path.join(__dirname, ('../' + host.OUTPUT_PATH)),
    filename: '[name].js',
    publicPath: host.ASSET_HOST
  },
  resolve: {
    extensions: ['', '.js', '.jsx', '.scss'],
    alias: mapValues(resolvePaths, (str) => (
      path.join(process.cwd(), ...str.split('/'))
    ))
  },
  module: {
    preLoaders: [
      {
        test: /\.jsx$|\.js$/,
        loader: 'eslint-loader',
        exclude: /node_modules/
      }
    ],
    loaders: [
      {
        test: /\.json$/,
        loader: 'json'
      },
      {
        test: isomorphicPlugin.regular_expression('images'),
        loader: 'url-loader?limit=10240'
      },
      {
        // test: /\.(woff(2)?|eot|ttf|svg)(\?[a-z0-9=\.]*)?$/,
        test: /\.(ttf|eot|svg|jpe?g|png|gif|ico|woff2?)$/,
        loader: 'file'
      }
    ]
  },
  postcss: [autoprefixer],
  plugins: [
    isomorphicPlugin,
    new webpack.ContextReplacementPlugin(/moment[\/\\]locale$/, /en|es/),
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify(process.env.NODE_ENV)
      }
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      filename: 'vendor.js',
      minChunks: Infinity
    })
  ]
};
