require('dotenv-safe').load();

import baseConfig from './base';
import webpack from 'webpack';
import ExtractTextPlugin from 'extract-text-webpack-plugin';
import Dotenv from 'dotenv-webpack';
import { SCSS_LOADERS } from './constants';

const plugins = [
  new Dotenv({ safe: true }),
  new ExtractTextPlugin('[name].css'),
  new webpack.optimize.CommonsChunkPlugin({
    name: 'vendor',
    filename: '[name].js',
    minChunks: module => /node_modules/.test(module.resource)
  }),
  new webpack.optimize.ModuleConcatenationPlugin()
];

const loaders = [
  {
    test: /\.jsx$|\.js$/,
    loader: 'babel-loader',
    exclude: /node_modules/,
    options: {
      presets: [
        [ 'es2015', { modules: false } ]
      ]
    }
  },
  {
    test: /\.css$/,
    loader: ExtractTextPlugin.extract({
      fallback: 'style-loader',
      use: [ 'css-loader' ]
    })
  },
  {
    test: /\.scss$/,
    loader: ExtractTextPlugin.extract(SCSS_LOADERS)
  }
];

export default {
  ...baseConfig,
  entry: {
    ...baseConfig.entry,
    vendor: [
      ...baseConfig.entry.vendor
    ]
  },
  devtool: 'source-map',
  plugins: [
    ...baseConfig.plugins,
    ...plugins
  ],
  module: { ...baseConfig.module, ...{
    rules: [
      ...baseConfig.module.rules,
      ...loaders
    ]
  }}
};
