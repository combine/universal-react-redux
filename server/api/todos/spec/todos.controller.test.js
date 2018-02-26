import request from 'supertest';
import express from 'express';
import todos from '../index';

let app, agent;

beforeAll(async () => {
  app = express();
  app.use('/api/todos', todos);
  agent = request.agent(app.listen());
});

describe('GET /api/todos', function() {
  test('endpoint returns a list of todos', function() {
    return agent
      .get('/api/todos')
      .expect(200)
      .then(({ body }) => {
        expect(body.map(t => t.id)).toEqual([1, 2, 3, 4, 5, 6]);
      });
  });
});

describe('GET /api/todos/:id', function() {
  test('endpoint returns a specific todos', function() {
    return agent
      .get('/api/todos/1')
      .expect(200)
      .then(({ body }) => {
        expect(body.id).toEqual(1);
      });
  });
});
