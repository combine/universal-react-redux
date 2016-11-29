/* The webpack dev server's port to use
 */
export const DEV_SERVER_PORT = process.env.DEV_SERVER_PORT || 3001;

/* The hostname to use for the webpack dev server
 */
export const DEV_SERVER_HOSTNAME = process.env.DEV_SERVER_HOSTNAME || 'localhost';

/* The URL of the dev server including the hostname and port
 */
export const DEV_SERVER_HOST_URL = `http://${DEV_SERVER_HOSTNAME}:${DEV_SERVER_PORT}`;

/* The output path of the completed webpack build
 */
export const OUTPUT_PATH = process.env.OUTPUT_PATH || 'dist/';

/* The asset host to use inside the built webpack files. In product, set the
 * ASSET_HOST environment variable.
 */
export const ASSET_HOST = process.env.ASSET_HOST || (DEV_SERVER_HOST_URL + '/' + OUTPUT_PATH);

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
  images: 'common/images',
  layouts: 'common/layouts',
  lib: 'common/js/lib',
  middleware: 'common/js/middleware',
  reducers: 'common/js/reducers',
  routes: 'common/js/routes',
  selectors: 'common/js/selectors',
  store: 'common/js/store'
};
