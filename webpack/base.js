import path from 'path';
import webpack from 'webpack';
import mapValues from 'lodash/mapValues';
import isomorphicConfig from './isomorphic';
import IsomorphicPlugin from 'webpack-isomorphic-tools/plugin';
import { OUTPUT_PATH, ASSET_HOST, RESOLVE_PATHS } from './constants';

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
        loader: 'url-loader?limit=10240'
      },
      {
        test: /\.(ttf|eot|svg|jpe?g|png|gif|ico|woff2?)$/,
        loader: 'file-loader'
      }
    ]
  },
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
