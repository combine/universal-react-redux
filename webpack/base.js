import path from 'path';
import webpack from 'webpack';
import mapValues from 'lodash/mapValues';
import autoprefixer from 'autoprefixer';
import isomorphicConfig from './isomorphic';
import IsomorphicPlugin from 'webpack-isomorphic-tools/plugin';
import { OUTPUT_PATH, ASSET_HOST, RESOLVE_PATHS } from './config';

const isDev = process.env.NODE_ENV === 'development';
const isomorphicPlugin = new IsomorphicPlugin(isomorphicConfig).development(isDev);

export default {
  context: path.resolve(__dirname, '..'),
  entry: {
    vendor: [
      'babel-polyfill',
      'classnames',
      'history',
      'lodash',
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
    path: path.join(__dirname, ('../' + OUTPUT_PATH)),
    filename: '[name].js',
    publicPath: ASSET_HOST
  },
  resolve: {
    extensions: ['', '.js', '.jsx', '.scss'],
    alias: mapValues(RESOLVE_PATHS, (str) => (
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
