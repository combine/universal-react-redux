import baseConfig from './base';
import ExtractTextPlugin from 'extract-text-webpack-plugin';
import packageJson from '../package.json';

const plugins = [
  new ExtractTextPlugin('styles.css')
];

const loaders = [
  {
    test: /\.jsx$|\.js$/,
    loader: 'babel-loader',
    exclude: /node_modules/
  },
  {
    test: /\.(css|scss)$/,
    loader: ExtractTextPlugin.extract({
      fallbackLoader: 'style-loader',
      loader: [
        {
          loader: 'css-loader',
          options: {
            modules: true,
            minimize: false,
            importLoaders: 1,
            localIdentName: packageJson.config.css
          }
        },
        { loader: 'postcss-loader' },
        { loader: 'sass-loader' }
      ]
    })
  }
];

export default {
  ...baseConfig,
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
