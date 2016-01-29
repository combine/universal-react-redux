var path       = require('path');
var webpack    = require('webpack');
var outputPath = 'dist/';
var port       = process.env.PORT || 3001;
var hostname   = process.env.HOSTNAME || 'localhost';
var host       = 'http://' + hostname + ':' + port;
var assetHost  = host + '/' + outputPath;
var common     = require('./config.common');
var hot        = process.env.HOT;
var baseUrl    = '/';
var isoConfig  = require('./config.isomorphic');

// plugins
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var IsomorphicPlugin  = require('webpack-isomorphic-tools/plugin');

var plugins = (hot ? [
  new webpack.optimize.OccurenceOrderPlugin(),
  new webpack.HotModuleReplacementPlugin(),
  new webpack.NoErrorsPlugin()
] : [
  new ExtractTextPlugin('styles.css')
]).concat(
  // shared
  new IsomorphicPlugin(isoConfig).development(),
  new webpack.ContextReplacementPlugin(/moment[\/\\]locale$/, /en|es/),
  // this should always be last so it can be replaceable by config.cordova.js or
  // something else that overrides it
  new webpack.DefinePlugin({
    'process.env': {
      'NODE_ENV': JSON.stringify('development')
    },
    '__CORDOVA__': false,
    '__PRODUCTION__': false,
    '__DEVELOPMENT__': true,
    '__BASE_URL__': JSON.stringify(baseUrl)
  })
);

var entry = (hot ? [
  'webpack-dev-server/client?' + host,
  'webpack/hot/only-dev-server'] : []).concat(
  './client/index' // shared between hot and not
);

// specify loaders based on whether hot reloading is enabled
var loaders = common.loaders.concat({
  test: /\.scss$/,
  loader: hot ? 'style!css!sass' : ExtractTextPlugin.extract('css!sass')
},{
  test: /\.jsx$|\.js$/,
  loader: 'babel',
  exclude: /node_modules/,
  // use react-transform to hot reload modules when hot is specified
  query: hot ? {
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
  } : {}
});

module.exports = {
  eslint: { configFile: './.eslintrc' },
  devServerPort: port,
  devtool: hot ? 'eval' : 'source-map',
  context: path.resolve(__dirname, '..'),
  entry: entry,
  output: {
    path: path.join(__dirname, ('../' + outputPath)),
    filename: 'bundle.js',
    publicPath: assetHost
  },
  plugins: plugins,
  resolve: {
    extensions: ['', '.js', '.scss']
  },
  module: {
    preLoaders: common.preLoaders,
    loaders: loaders
  }
};
