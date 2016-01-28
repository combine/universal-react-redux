/* Utilities
 * This file contains common utility methods used through the app.
 * Export them as modules here and they will be available to be imported other
 * modules:
 * import { rootPath } from 'util';
 */

export const stripBlank = function stripeBlank(arr) {
  return arr.filter((p) => p && p !== '');
};

/* rootPath()
 * Returns the root of a given path: e.g. ``/users/calvinl` will return `users`
 * @param {string} path The path.
 */
export const rootPath = function rootPath(path) {
  return stripBlank(path.split('/'))[0] || null;
};
