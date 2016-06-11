'use strict';

import App from 'containers/App';
import HomeRoute from 'routes/home';
import ExampleRoute from 'routes/example';

export const routes = [
  {
    path: '/',
    component: App,
    indexRoute: HomeRoute,
    childRoutes: [
      ExampleRoute
    ]
  }
];
