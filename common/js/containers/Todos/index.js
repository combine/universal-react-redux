import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addTodo, toggleTodo, removeTodo, fetchTodos } from 'actions/todos';
import { Container, Header, Checkbox, List, Button, Form } from 'semantic-ui-react';
import classnames from 'classnames';
import css from './index.scss';

const cx = classnames.bind(css);

class TodosContainer extends Component {

  static propTypes = {
    todos: PropTypes.object.isRequired,
    dispatch: PropTypes.func.isRequired
  }

  state = { todoText: '' };

  componentDidMount() {
    const { dispatch, todos: { isFetched } } = this.props;

    if (!isFetched) {
      dispatch(fetchTodos());
    }
  }

  submitTodo = (ev) => {
    const { dispatch } = this.props;
    const { todoText } = this.state;

    ev.preventDefault();
    dispatch(addTodo(todoText));
    this.setState({ todoText: '' });
  }

  checkTodo = (id) => {
    const { dispatch } = this.props;

    dispatch(toggleTodo(id));
  }

  removeTodo = (id) => {
    const { dispatch } = this.props;

    dispatch(removeTodo(id));
  }

  onTodoChange = (ev) => {
    this.setState({ todoText: ev.target.value });
  }

  render() {
    const { todos: { todos } } = this.props;
    const { todoText } = this.state;

    return (
      <Container>
        <Header>To-Dos</Header>
        <List divided className={css.todos}>
          {todos.map((todo, idx) => {
            const { id, text, completed } = todo;

            return (
              <List.Item key={idx} className={classnames(css.todo, css.extra)}>
                <List.Content floated="right">
                  <Button
                    onClick={() => this.removeTodo(id)}
                    icon="remove"
                    size="mini"
                  />
                </List.Content>
                <List.Content floated="left">
                  <Checkbox
                    type="checkbox"
                    checked={completed}
                    onChange={() => this.checkTodo(id)}
                  />
                </List.Content>
                <List.Content className={cx(css.text, { [css.completed]: completed })}>
                  {text}
                </List.Content>
              </List.Item>
            );
          })}
        </List>
        <Form className={css.todoForm} onSubmit={this.submitTodo}>
          <Form.Group>
            <Form.Input
              onChange={this.onTodoChange}
              value={todoText}
              type="text"
              placeholder="Add a todo..." />
            <Form.Button content="Add" icon="plus" />
          </Form.Group>
        </Form>
      </Container>
    );
  }
}

TodosContainer.fetchData = ({ store }) => {
  return store.dispatch(fetchTodos());
};

const mapStateToProps = ({ todos }) => ({ todos });

export default connect(mapStateToProps)(TodosContainer);
