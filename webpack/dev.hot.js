/* eslint-disable no-console */
const webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');
const baseConfig = require('./base');
const host = require('./host')();
const p = require('../package.json');

const entry = [
  'webpack-dev-server/client?' + host.HOST_URL,
  'webpack/hot/only-dev-server'
];

const plugins = [
  new webpack.optimize.OccurenceOrderPlugin(),
  new webpack.HotModuleReplacementPlugin(),
  new webpack.NoErrorsPlugin()
];

const loaders = [
  {
    test: /\.css$/,
    loaders: [
      'style',
      `css?modules&importLoaders=3&localIdentName=${p.config.css}`,
      'postcss',
    ],
  },
  {
    test: /\.scss$/,
    loaders: [
      'style',
      `css?modules&importLoaders=3&localIdentName=${p.config.css}`,
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
  devServerPort: host.PORT,
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
console.log(host);

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
    console.info('🚧 Webpack client dev-server listening on ' + host.HOST_URL + ' with publicPath:' + config.output.publicPath);
  }
});
