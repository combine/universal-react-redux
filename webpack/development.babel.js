require('dotenv-safe').load();

import baseConfig from './base';
import webpack from 'webpack';
import Dotenv from 'dotenv-webpack';

const plugins = [
  new Dotenv({ safe: true }),
  new webpack.optimize.CommonsChunkPlugin({
    name: 'vendor',
    filename: '[name].js',
    minChunks: module => /node_modules/.test(module.resource)
  }),
  new webpack.optimize.ModuleConcatenationPlugin()
];

const loaders = [];

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
