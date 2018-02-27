/* eslint-disable no-console */
import WebpackDevServer from 'webpack-dev-server';
import webpack from 'webpack';
import merge from 'webpack-merge';
import baseConfig from './base';

const {
  DEV_SERVER_PORT,
  DEV_SERVER_HOSTNAME,
  DEV_SERVER_HOST_URL
} = process.env;

const webpackConfig = merge(baseConfig, {
  devtool: 'eval',
  entry: {
    app: [
      'webpack-dev-server/client?' + DEV_SERVER_HOST_URL,
      'webpack/hot/only-dev-server'
    ]
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin()
  ]
});

console.info('Firing up Webpack dev server...\n');

new WebpackDevServer(webpack(webpackConfig), {
  port: process.env.DEV_SERVER_PORT,
  publicPath: webpackConfig.output.publicPath,
  hot: true,
  historyApiFallback: true,
  noInfo: false,
  quiet: false,
  headers: { 'Access-Control-Allow-Origin': '*' },
  stats: {
    colors: true,
    hash: false,
    version: false,
    chunks: false,
    children: false
  },
  disableHostCheck: true
}).listen(DEV_SERVER_PORT, DEV_SERVER_HOSTNAME, e => {
  if (e) {
    console.error(e);
  } else {
    console.info(
      `Webpack dev server mounted at ${DEV_SERVER_HOST_URL}.`
    );
  }
});
