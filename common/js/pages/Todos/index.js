import React, { Component } from 'react';
import Loadable from 'react-loadable';
import { Loading } from 'components/common';
import { fetchTodos } from 'actions/todos';

// NOTE: To turn off dynamic imports, import this container normally using:
// import TodosContainer from 'containers/Todos';
const TodosContainer = Loadable({
  loader: () => import('../../containers/Todos'),
  loading: Loading
});

class TodosPage extends Component {
  static fetchData = ({ store }) => {
    return store.dispatch(fetchTodos());
  };

  render() {
    return <TodosContainer />;
  }
}

export default TodosPage;
