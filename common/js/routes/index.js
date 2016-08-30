'use strict';

import App from 'containers/App';
import HomeRoute from './home';
import ExampleRoute from './example';

const Routes = [
  {
    path: '/',
    component: App,
    indexRoute: HomeRoute,
    childRoutes: [
      ExampleRoute
    ]
  }
];

export default Routes;
