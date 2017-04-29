import { ADD_TODO, REMOVE_TODO, TOGGLE_TODO } from 'constants';
import generateActionCreator from 'lib/generateActionCreator';

export const addTodo = generateActionCreator(ADD_TODO, 'text');
export const removeTodo = generateActionCreator(REMOVE_TODO, 'id');
export const toggleTodo = generateActionCreator(TOGGLE_TODO, 'id');
