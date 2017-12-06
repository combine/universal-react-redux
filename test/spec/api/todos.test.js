import request from 'supertest';
import express from 'express';
import expect from 'expect';

describe('/api/todos', function() {
  let app, agent;

  before(async function() {
    app = express();
    app.use('/api', require('api').default);
    agent = request.agent(app.listen());
  });

  describe('GET /', function() {
    it('retrieves a list of todos', function() {
      return agent
        .get('/api/todos')
        .expect(200)
        .then(({ body }) => {
          expect(body.map(t => t.id)).toEqual([1, 2, 3]);
        });
    });
  });
});
