import { find } from 'lodash';
// Exported controller methods
export default {
  index,
  show
};

// Replace this with an actual fetch from a database
const todos = [
  {
    id: 1,
    text: 'Learn React',
    completed: true
  },
  {
    id: 2,
    text: 'Learn Redux',
    completed: true
  },
  {
    id: 3,
    text: 'Start an app',
    completed: true
  },
  {
    id: 4,
    text: 'Make it universally rendered',
    completed: true
  },
  {
    id: 5,
    text: 'Enable code splitting',
    completed: true
  },
  {
    id: 6,
    text: 'Build a kick ass app',
    completed: false
  }
];

export function show(req, res) {
  const id = parseInt(req.params.id);
  const todo = find(todos, { id });

  return res.json(todo);
}

export function index(req, res) {
  return res.json(todos);
}
