import webpack from 'webpack';
import baseConfig from './production.babel';
import CompressionPlugin from 'compression-webpack-plugin';
import UglifyJSPlugin from 'uglifyjs-webpack-plugin';
import config from '../config';

let plugins = [
  ...baseConfig.plugins,
  new webpack.BannerPlugin({
    banner:
      'hash:[hash], chunkhash:[chunkhash], name:[name], ' +
      'filebase:[filebase], query:[query], file:[file]'
  }),
  new UglifyJSPlugin({
    uglifyOptions: {
      compress: {
        warnings: false
      },
      mangle: true,
      output: {
        comments: false
      }
    }
  }),
  new CompressionPlugin({
    asset: '[file].gz',
    algorithm: 'gzip',
    test: /\.css$|\.js$|\.html$/,
    threshold: 10240,
    minRatio: 0.8
  }),
  new webpack.optimize.CommonsChunkPlugin({
    name: 'vendor',
    filename: '[name].[hash].js',
    minChunks: module => /node_modules/.test(module.resource)
  })
];

let output = {
  ...baseConfig.output,
  filename: '[name].[hash].js'
};

let loaders = [];

if (config.enableDynamicImports) {
  // remove commons chunk plugin
  plugins = plugins.slice(0, plugins.length - 1);

  output.chunkFilename = '[name].[hash].js';
}

export default {
  ...baseConfig,
  output,
  plugins,
  module: {
    ...baseConfig.module,
    rules: [...baseConfig.module.rules, ...loaders]
  }
};
