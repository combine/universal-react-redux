'use strict';

import App from '../routes/app/containers/App';

export const routes = [
  {
    path: '/',
    component: App,
    indexRoute: require('./home'),
    childRoutes: [
      require('./example')
    ]
  }
];
