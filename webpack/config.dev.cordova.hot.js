/* eslint-disable no-console */
const webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');
const baseConfig = require('./config.base');
const host = require('./host')({ OUTPUT_PATH: 'cordova/www/' });
const hot = require('./hot');

const entry = hot.entry(host.HOST_URL);
const plugins = [
  ...hot.plugins,
  new webpack.DefinePlugin({
    'process.env': { 'NODE_ENV': JSON.stringify('development') },
    '__CORDOVA__': true
  })
];
const loaders = hot.loaders;

const config = Object.assign({}, baseConfig, {
  output: Object.assign({}, baseConfig.output, {
    publicPath: host.ASSET_HOST
  }),
  eslint: { configFile: './.eslintrc' },
  devServerPort: host.PORT,
  devtool: 'eval',
  entry: [
    ...entry,
    ...baseConfig.entry
  ],
  plugins: [
    ...plugins,
    ...baseConfig.plugins
  ],
  module: Object.assign({}, baseConfig.module, {
    loaders: [
      ...baseConfig.module.loaders,
      ...loaders
    ]
  })
});

console.info('Firing up Cordova Webpack dev server...');

new WebpackDevServer(webpack(config), {
  publicPath: config.output.publicPath,
  hot: true,
  historyApiFallback: true,
  noInfo: false,
  quiet: false,
  headers: {'Access-Control-Allow-Origin': '*'},
  stats: {
    colors: true,
    hash: false,
    version: false,
    chunks: false,
    children: false
  }
}).listen(host.PORT, host.HOSTNAME, function errorCallback(err) {
  if (err) {
    console.error(err);
  } else {
    console.info('🚧 Cordova-Webpack client dev-server listening on ' + host.HOST_URL + ' with publicPath:' + config.output.publicPath);
  }
});
