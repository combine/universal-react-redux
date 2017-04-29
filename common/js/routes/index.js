'use strict';

import Home from 'containers/Home';
import Example from 'containers/Example';

export default [
  {
    path: '/',
    exact: true,
    component: Home
  },
  {
    path: '/example/:id?',
    exact: false,
    component: Example
  }
];
