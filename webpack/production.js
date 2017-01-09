import webpack from 'webpack';
import baseConfig from './base';
import CompressionPlugin from 'compression-webpack-plugin';
import ExtractTextPlugin from 'extract-text-webpack-plugin';

const plugins = [
  new ExtractTextPlugin('[name].[hash].css'),
  new webpack.optimize.DedupePlugin(),
  new webpack.optimize.AggressiveMergingPlugin(),
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
    test: /\.scss$/,
    loader: ExtractTextPlugin.extract({
      fallbackLoader: 'style-loader',
      loader: [
        { loader: 'css-loader' },
        { loader: 'postcss-loader' },
        { loader: 'sass-loader' }
      ]
    })
  },
  {
    test: /\.jsx$|\.js$/,
    loader: 'babel-loader',
    exclude: /node_modules/
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
