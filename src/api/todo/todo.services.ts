/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import TodoModel from './todo.model';
import {
  type Todo,
  type TodoDocument
} from './todo.types';
import { validatorErrorHandler } from '../../utils/errorHandler';

export const createTodo = async (data: Todo): Promise<TodoDocument> => {
  try {
    const todo = await TodoModel.create(data);
    return todo;
  } catch (error: any) {
    const message = validatorErrorHandler(error);
    throw new Error(message);
  }
};

export const getAllTodos = async (): Promise<TodoDocument[]> => {
  try {
    const todos = await TodoModel.find();

    if (todos === null) {
      throw new Error('Something went wrong when getting all todos, please try again later');
    }

    return todos;
  } catch (error: any) {
    throw new Error(error.message);
  }
};

export const updateTodo = async (_id: string): Promise<TodoDocument> => {
  try {
    const todo = await TodoModel.findById(_id);

    if (todo === null) {
      throw new Error('Todo not found');
    }

    const updatedTodo = await TodoModel.findByIdAndUpdate(_id, { completed: !todo.completed }, { new: true });

    if (updatedTodo === null) {
      throw new Error('Could not update todo');
    }

    return updatedTodo;
  } catch (error: any) {
    throw new Error(error.message);
  }
};

export const deleteTodo = async (_id: string): Promise<TodoDocument> => {
  try {
    const todo = await TodoModel.findByIdAndDelete(_id) as unknown as TodoDocument;

    if (todo === null) {
      throw new Error('Todo not found');
    }

    return todo;
  } catch (error: any) {
    throw new Error(error.message);
  }
};

export const clearCompletedTodos = async (completedIds: any): Promise<any> => {
  try {
    const todos = await TodoModel.deleteMany({ _id: { $in: completedIds } });

    if (todos === null) {
      throw new Error('Todo not found');
    }

    return todos;
  } catch (error: any) {
    throw new Error(error.message);
  }
};
