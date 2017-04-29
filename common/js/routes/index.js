'use strict';

import Home from 'containers/Home';
import Todos from 'containers/Todos';

export default [
  {
    path: '/',
    exact: true,
    component: Home
  },
  {
    path: '/todos',
    exact: true,
    component: Todos
  }
];
