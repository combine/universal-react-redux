import express from 'express';

const router = express.Router();

router.get('/', (req, res) => {
  // Replace this with an actual fetch from a database
  return res.json([
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
      text: 'Build an app',
      completed: false
    }
  ]);
});

export default router;
