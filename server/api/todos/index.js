import express from 'express';
import controller from './todos.controller';

const router = express.Router();

router.get('/', controller.index);

export default router;
