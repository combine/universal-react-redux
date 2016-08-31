'use strict';

const configFile = process.env.NODE_ENV === 'development' ? 'dev' : 'prod';
const webpackConfig = require(`../webpack/${configFile}`);

import p from '../package.json';

export default {
  name: p.name,
  description: p.description,
  version: p.version,

  // launch environment
  port: process.env.PORT || 3000,
  assetHost: process.env.ASSET_HOST || webpackConfig.output.publicPath
};
