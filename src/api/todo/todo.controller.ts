/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import { type Request, type Response } from 'express';
import {
  createTodo,
  getAllTodos,
  updateTodo,
  deleteTodo,
  clearCompletedTodos
} from './todo.services';

export const createTodoHandler = async (req: Request, res: Response): Promise<void> => {
  try {
    const data = req.body;
    const todo = await createTodo(data);
    res.status(201).json({ message: 'Todo created successfully', data: todo });
  } catch (error: any) {
    res.status(400).json({ message: 'Error creating todo', error: error.message });
  }
};

export const getAllTodosHandler = async (req: Request, res: Response): Promise<void> => {
  try {
    const todos = await getAllTodos();
    res.status(200).json({ message: 'Todos listed', data: todos });
  } catch (error: any) {
    res.status(400).json({ message: 'Error listing todos', error: error.message });
  }
};

export const updateTodoHandler = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const updatedTodo = await updateTodo(id);
    res.status(200).json({ message: 'Todo updated successfully', data: updatedTodo });
  } catch (error: any) {
    res.status(400).json({ message: 'Error updating todo', error: error.message });
  }
};

export const deleteTodoHandler = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const todo = await deleteTodo(id);
    res.status(200).json({ message: 'Todo deleted successfully', data: todo });
  } catch (error: any) {
    res.status(400).json({ message: 'Error deleting todo', error: error.message });
  }
};

export const clearCompletedTodosHandler = async (req: Request, res: Response): Promise<void> => {
  try {
    const { completedIds } = req.body;
    const todo = await clearCompletedTodos(completedIds);
    res.status(200).json({ message: 'Todos clear successfully', data: todo });
  } catch (error: any) {
    res.status(400).json({ message: 'Error deleting todo', error: error.message });
  }
};
