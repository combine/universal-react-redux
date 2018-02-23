import {
  ADD_TODO,
  REMOVE_TODO,
  TOGGLE_TODO,
  FETCH_TODOS_REQUEST,
  FETCH_TODOS_SUCCESS,
  FETCH_TODOS_FAILURE
} from '@constants/index';
import api from '@lib/api';
import generateActionCreator from '@lib/generateActionCreator';

export const addTodo = generateActionCreator(ADD_TODO, 'text');
export const removeTodo = generateActionCreator(REMOVE_TODO, 'id');
export const toggleTodo = generateActionCreator(TOGGLE_TODO, 'id');

export const fetchTodosRequest = generateActionCreator(FETCH_TODOS_REQUEST);
export const fetchTodosSuccess = generateActionCreator(
  FETCH_TODOS_SUCCESS,
  'todos'
);
export const fetchTodosFailure = generateActionCreator(
  FETCH_TODOS_FAILURE,
  'error'
);

export const fetchTodos = () => {
  return dispatch => {
    dispatch(fetchTodosRequest());

    return api
      .get('/api/todos')
      .then(todos => {
        dispatch(fetchTodosSuccess(todos));

        return Promise.resolve(todos);
      })
      .catch(error => {
        dispatch(fetchTodosFailure(error));

        return Promise.reject(error);
      });
  };
};
