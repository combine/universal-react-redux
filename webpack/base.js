require('dotenv-safe').load();

import path from 'path';
import webpack from 'webpack';
import mapValues from 'lodash/mapValues';
import isomorphicConfig from './isomorphic';
import IsomorphicPlugin from 'webpack-isomorphic-tools/plugin';
import { BundleAnalyzerPlugin } from 'webpack-bundle-analyzer';
import Dotenv from 'dotenv-webpack';
import {
  ANALYZE, NODE_ENV, WEBPACK_OUTPUT_PATH, ASSET_URL, RESOLVE_PATHS
} from './constants';

const isDev = NODE_ENV === 'development';
const isomorphicPlugin = new IsomorphicPlugin(isomorphicConfig).development(isDev);

const plugins = [
  isomorphicPlugin,
  new webpack.ContextReplacementPlugin(/moment[/\\]locale$/, /en|es/),
  new Dotenv({ safe: true }),
  new webpack.DefinePlugin({
    'process.env': {
      'NODE_ENV': JSON.stringify(NODE_ENV)
    }
  })
];

if (ANALYZE) { plugins.push(new BundleAnalyzerPlugin()); }

export default {
  context: path.resolve(__dirname, '..'),
  entry: {
    vendor: [
      // Vendor CSS
      './client/vendor'
    ],
    app: [
      './client/index'
    ]
  },
  output: {
    path: path.join(__dirname, ('../' + WEBPACK_OUTPUT_PATH)),
    filename: '[name].js',
    publicPath: `${ASSET_URL}/`
  },
  resolve: {
    extensions: ['.js', '.jsx', '.scss'],
    alias: mapValues(RESOLVE_PATHS, (str) => (
      path.join(process.cwd(), ...str.split('/'))
    ))
  },
  module: {
    rules: [
      {
        enforce: 'pre',
        test: /\.jsx$|\.js$/,
        exclude: /node_modules/,
        use: [
          'babel-loader',
          {
            loader: 'eslint-loader',
            options: {
              configFile: './.eslintrc',
            }
          },
        ]
      },
      {
        test: /\.json$/,
        loader: 'json-loader'
      },
      {
        test: isomorphicPlugin.regular_expression('images'),
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 10240
            }
          }
        ]
      },
      {
        // Load fonts using file-loader
        test: /\.(ttf|eot|woff2?)$/,
        loader: 'file-loader'
      }
    ]
  },
  plugins
};
