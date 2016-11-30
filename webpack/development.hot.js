/* eslint-disable no-console */
import { DEV_SERVER_PORT, DEV_SERVER_HOSTNAME, DEV_SERVER_HOST_URL } from './constants';
import WebpackDevServer from 'webpack-dev-server';
import webpack from 'webpack';
import baseConfig from './base';
import packageJson from '../package.json';

// Webpack Entry Point for dev server
const entry = [
  'webpack-dev-server/client?' + DEV_SERVER_HOST_URL,
  'webpack/hot/only-dev-server'
];

// Additional plugins
const plugins = [
  new webpack.HotModuleReplacementPlugin(),
  new webpack.NoErrorsPlugin(),
  new webpack.NamedModulesPlugin()
];

// Additional loaders
const loaders = [
  {
    test: /\.css$/,
    use: [
      'style-loader',
      {
        loader: 'css-loader',
        options: {
          modules: true,
          importLoaders: 3,
          localIdentName: packageJson.config.css
        }
      },
      'postcss-loader'
    ]
  },
  {
    test: /\.scss$/,
    use: [
      'style-loader',
      {
        loader: 'css-loader',
        options: {
          modules: true,
          importLoaders: 3,
          localIdentName: packageJson.config.css
        }
      },
      'postcss-loader',
      'sass-loader'
    ]
  },
  {
    test: /\.jsx$|\.js$/,
    loader: 'babel-loader',
    exclude: /node_modules/,
    // use react-transform to hot reload modules when hot is specified
    query: {
      plugins: [
        ['react-transform', {
          transforms: [{
            transform: 'react-transform-hmr',
            imports: ['react'],
            locals: ['module']
          }, {
            transform: 'react-transform-catch-errors',
            imports: ['react', 'redbox-react']
          }]
        }]
      ]
    }
  }
];

const config = Object.assign({}, baseConfig, {
  devtool: 'eval',
  entry: Object.assign({}, baseConfig.entry, {
    app: [
      ...entry,
      ...baseConfig.entry.app
    ]
  }),
  plugins: [
    ...baseConfig.plugins,
    ...plugins
  ],
  module: Object.assign({}, baseConfig.module, {
    rules: [
      ...baseConfig.module.rules,
      ...loaders
    ]
  })
});

console.info('Firing up Webpack dev server...');

new WebpackDevServer(webpack(config), {
  port: DEV_SERVER_PORT,
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
}).listen(DEV_SERVER_PORT, DEV_SERVER_HOSTNAME, function errorCallback(err) {
  if (err) {
    console.error(err);
  } else {
    console.info(`Webpack dev server mounted at ${DEV_SERVER_HOST_URL}. Asset path: ${config.output.publicPath}`);
  }
});
