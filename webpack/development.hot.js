/* eslint-disable no-console */
import { DEV_SERVER_PORT, DEV_SERVER_HOSTNAME, DEV_SERVER_HOST_URL } from './config';
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
  new webpack.optimize.OccurenceOrderPlugin(),
  new webpack.HotModuleReplacementPlugin(),
  new webpack.NoErrorsPlugin()
];

// Additional loaders
const loaders = [
  {
    test: /\.css$/,
    loaders: [
      'style',
      `css?modules&importLoaders=3&localIdentName=${packageJson.config.css}`,
      'postcss',
    ],
  },
  {
    test: /\.scss$/,
    loaders: [
      'style',
      `css?modules&importLoaders=3&localIdentName=${packageJson.config.css}`,
      'postcss',
      'sass'
    ]
  },
  {
    test: /\.jsx$|\.js$/,
    loader: 'babel',
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
  eslint: { configFile: './.eslintrc' },
  devServerPort: DEV_SERVER_PORT,
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
    loaders: [
      ...baseConfig.module.loaders,
      ...loaders
    ]
  })
});

console.info('Firing up Webpack dev server...');

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
}).listen(DEV_SERVER_PORT, DEV_SERVER_HOSTNAME, function errorCallback(err) {
  if (err) {
    console.error(err);
  } else {
    console.info('🚧 Webpack client dev-server listening on ' + DEV_SERVER_HOST_URL + ' with publicPath:' + config.output.publicPath);
  }
});
