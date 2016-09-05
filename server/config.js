'use strict';

const isDev = process.env.NODE_ENV === 'development';
const configFile = isDev ? 'development' : 'production';
const webpackConfig = require(`../webpack/${configFile}`).default;
const applicationPort = process.env.APPLICATION_PORT || (isDev ? 3000 : 80);
import packageJson from '../package.json';

export default {
  name: packageJson.name,
  description: packageJson.description,
  version: packageJson.version,

  // launch environment
  port: applicationPort,
  assetHost: process.env.ASSET_HOST || webpackConfig.output.publicPath
};
