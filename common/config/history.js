//
//
// /* configureHistory()
//  * Sets up history.js for the router. If this is a Cordova build, we use hash-
//  * history instead. The __CORDOVA__ global is set by the webpack configuration.
//  * It then binds a listener to the history library to react to route changes
//  * by dispatching an action.
//  */
// export default function configureHistory(store, options) {
//   const opts = Object.assign({}, {
//     // Default Options
//
//     // Whether or not to listen to route URL changes with history.js.
//     // If true, then `ROUTE_LOCATION_UPDATE` will be dispatched on every route
//     // change.
//     dispatchRouteChanges: false,
//
//     // If set, then this element's classnames will be changed to reflect the
//     // current root path. Useful for overriding CSS on specific routes.
//     // This is a DOM element.
//     rootElement: null,
//
//     // The type of history to use. Can be 'Browser', 'Memory', or 'Hash'. See
//     // https://github.com/rackt/history for more information.
//     historyType: 'Browser'
//   }, options);
//
//   const createHistory = require(`history/lib/create${opts.historyType}History`);
//   const history = useQueries(createHistory)();
//
//   if (opts.dispatchRouteChanges) {
//     bindRouteLocationUpdate(store, history, opts.rootElement);
//   }
//
//   return history;
// }
