import webpack from 'webpack';
import baseConfig from './base';
import { SCSS_LOADERS } from './constants';
import CompressionPlugin from 'compression-webpack-plugin';
import ExtractTextPlugin from 'extract-text-webpack-plugin';

const plugins = [
  new ExtractTextPlugin('[name].[hash].css'),
  new webpack.optimize.CommonsChunkPlugin({
    name: 'vendor',
    filename: '[name].[hash].js',
    minChunks: module => /node_modules/.test(module.resource)
  }),
  new webpack.optimize.DedupePlugin(),
  new webpack.optimize.AggressiveMergingPlugin(),
  new webpack.optimize.ModuleConcatenationPlugin(),
  new webpack.optimize.UglifyJsPlugin({
    compress: {
      screw_ie8: true,
      warnings: false
    }
  }),
  new CompressionPlugin({
    asset: '[file].gz',
    algorithm: 'gzip',
    test: /\.css$|\.js$|\.html$/,
    threshold: 10240,
    minRatio: 0.8
  })
];

const loaders = [
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
  },
  {
    test: /\.jsx$|\.js$/,
    loader: 'babel-loader',
    exclude: /node_modules/,
    options: {
      presets: [
        [ 'es2015', { modules: false } ]
      ]
    }
  }
];

export default {
  ...baseConfig,
  output: { ...baseConfig.output, ...{
    filename: '[name].[hash].js'
  }},
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
