/* The following are environment variables imported from .env, and their
 * defaults. Here, we destructure them from process.env and then export them as
 * constants.
 */
export const {
  NODE_ENV, DEV_SERVER_PORT, DEV_SERVER_HOSTNAME, WEBPACK_OUTPUT_PATH,
  ASSET_HOST, ASSET_PATH, ANALYZE
} = process.env;

// The URL of the dev server including the hostname and port
export const DEV_SERVER_HOST_URL = `http://${DEV_SERVER_HOSTNAME}:${DEV_SERVER_PORT}`;

// The asset host to use for webpack files. In development, we will always use
// the dev server's URL.
export const ASSET_URL = (
  NODE_ENV === 'development'
    ? `${DEV_SERVER_HOST_URL}${WEBPACK_OUTPUT_PATH}`
    : ASSET_HOST
);

/* The identifier to use for css-modules.
 */
export const CSS_MODULES_IDENTIFIER = '[name]__[local]__[hash:base64:5]';

/* Paths for webpack to resolve into non-relative directories, so that instead
 * of having to use relative paths:
 *
 * import SomeComponents from '../../../../SomeComponent';
 *
 * we can write this instead:
 *
 * import SomeComponent from 'components/SomeComponent';
 */
export const RESOLVE_PATHS = {
  actions: 'common/js/actions',
  components: 'common/js/components',
  containers: 'common/js/containers',
  constants: 'common/js/constants',
  css: 'common/css',
  fonts: 'common/fonts',
  gql: 'common/gql',
  images: 'common/images',
  layouts: 'common/layouts',
  lib: 'common/js/lib',
  middleware: 'common/js/middleware',
  reducers: 'common/js/reducers',
  routes: 'common/js/routes',
  selectors: 'common/js/selectors',
  store: 'common/js/store'
};

// Loader options to use for .scss files. This is here to avoid repetition
// between different webpack config files.
export const SCSS_LOADERS = {
  fallback: 'style-loader',
  use: [
    {
      loader: 'css-loader',
      options: {
        modules: true,
        minimize: false,
        importLoaders: 1,
        localIdentName: CSS_MODULES_IDENTIFIER
      }
    },
    { loader: 'postcss-loader' },
    { loader: 'sass-loader' },
    {
      loader: 'sass-resources-loader',
      options: {
        resources: './common/css/*.scss'
      }
    }
  ]
};
