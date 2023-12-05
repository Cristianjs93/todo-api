import { Router } from 'express';
import {
  createTodoHandler,
  getAllTodosHandler,
  updateTodoHandler,
  deleteTodoHandler
} from './todo.controller';

const router = Router();

router.post('/', createTodoHandler);
router.get('/', getAllTodosHandler);
router.put('/update/:id', updateTodoHandler);
router.delete('/delete/:id', deleteTodoHandler);

export default router;
