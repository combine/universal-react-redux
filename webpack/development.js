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
    test: /\.css$/,
    loader: ExtractTextPlugin.extract(
      'style',
      `css?minimize&modules&importLoaders=1&localIdentName=${packageJson.config.css}` +
      '!postcss'
    )
  },
  {
    test: /\.scss$/,
    loader: ExtractTextPlugin.extract(
      'style',
      `css?minimize&modules&importLoaders=1&localIdentName=${packageJson.config.css}` +
      '!postcss' +
      '!sass'
    )
  }
];

export default {
  ...baseConfig,
  eslint: { configFile: './.eslintrc' },
  devtool: 'source-map',
  plugins: [
    ...baseConfig.plugins,
    ...plugins
  ],
  module: Object.assign({}, baseConfig.module, {
    loaders: [
      ...baseConfig.module.loaders,
      ...loaders
    ]
  })
};
