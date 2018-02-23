import express from 'express';
import controller from './todos.controller';

const router = express.Router();

router.get('/', controller.index);
router.get('/:id', controller.show);

export default router;
