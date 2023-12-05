import { Router } from 'express';
import {
  createTodoHandler,
  getAllTodosHandler,
  updateTodoHandler,
  deleteTodoHandler,
  clearCompletedTodosHandler
} from './todo.controller';

const router = Router();

router.post('/', createTodoHandler);
router.get('/', getAllTodosHandler);
router.put('/update/:id', updateTodoHandler);
router.delete('/delete/:id', deleteTodoHandler);
router.delete('/delete', clearCompletedTodosHandler);

export default router;
