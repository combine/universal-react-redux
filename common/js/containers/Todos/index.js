import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addTodo, toggleTodo, removeTodo } from 'actions/todos';
import classnames from 'classnames';
import css from './index.scss';

const cx = classnames.bind(css);

class TodosContainer extends Component {

  static propTypes = {
    todos: PropTypes.array.isRequired,
    dispatch: PropTypes.func.isRequired
  }

  submitTodo = (ev) => {
    const { dispatch } = this.props;
    const { todoText } = this.refs;

    ev.preventDefault();
    dispatch(addTodo(todoText.value));
    todoText.value = '';
  }

  checkTodo = (id) => {
    const { dispatch } = this.props;

    dispatch(toggleTodo(id));
  }

  removeTodo = (id) => {
    const { dispatch } = this.props;

    dispatch(removeTodo(id));
  }

  render() {
    const { todos } = this.props;

    return (
      <div>
        <h1>To-Dos</h1>
        <div className={css.todos}>
          {todos.map((todo, idx) => {
            const { id, text, completed } = todo;

            return (
              <li key={idx} className={css.todo}>
                <span className={css.completeInput}>
                  <input type="checkbox" onChange={() => this.checkTodo(id)} />
                </span>
                <span className={cx(css.text, { [css.completed]: completed })}>{text}</span>
                <a onClick={() => this.removeTodo(id)} className={css.delete}>Remove</a>
              </li>
            );
          })}
        </div>
        <form className={css.todoForm} onSubmit={this.submitTodo}>
          <input ref="todoText" type="text" placeholder="Add a todo..." />
          <button type="submit">Add</button>
        </form>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  todos: state.todos
});

export default connect(mapStateToProps)(TodosContainer);
