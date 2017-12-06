import webpack from 'webpack';
import nodeExternals from 'webpack-node-externals';
import path from 'path';
import UglifyJSPlugin from 'uglifyjs-webpack-plugin';
import { mapValues } from 'lodash';
import {
  RESOLVE_PATHS, SERVER_RESOLVE_PATHS, CLIENT_ENV_VARS, CSS_MODULES_IDENTIFIER
} from './constants';

export default {
  target: 'node',
  entry: [
    './server/renderer/handleRender.js',
  ],
  externals: [
    // images are handled by isomorphic webpack.
    // html files are required directly
    /\.(html|png|gif|jpg)$/,
    // treat all node modules as external to keep this bundle small
    nodeExternals()
  ],
  resolve: {
    extensions: ['.js', '.jsx', '.scss'],
    alias: mapValues({ ...RESOLVE_PATHS, ...SERVER_RESOLVE_PATHS }, (str) => (
      path.join(process.cwd(), ...str.split('/'))
    ))
  },
  output: {
    path: path.join(__dirname, ('../server/renderer')),
    filename: './handleRender.built.js',
    libraryTarget: 'commonjs'
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': CLIENT_ENV_VARS
    }),
    new UglifyJSPlugin({
      sourceMap: true
    }),
  ],
  module: {
    rules: [
      {
        test: /\.js|jsx$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader'
        }
      },
      {
        test: /\.scss$/,
        exclude: [
          path.resolve(__dirname, '../node_modules'),
          path.resolve(__dirname, '../common/css/base')
        ],
        use: [
          {
            loader: 'css-loader/locals',
            options: {
              modules: true,
              minimize: false,
              importLoaders: 0,
              localIdentName: CSS_MODULES_IDENTIFIER
            }
          },
          { loader: 'postcss-loader' },
          { loader: 'sass-loader' },
          {
            loader: 'sass-resources-loader',
            options: {
              resources: './common/css/resources/*.scss'
            }
          }
        ]
      }
    ]
  }
};
