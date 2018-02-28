import Error from '@pages/Error';
import Home from '@pages/Home';
import Todos from '@pages/Todos';

export default [
  { path: '/', exact: true, component: Home },
  { path: '/todos', exact: true, component: Todos },
  { path: '*', component: Error }
];
