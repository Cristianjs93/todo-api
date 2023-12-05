import { faker } from '@faker-js/faker';
import { type SuperTest, type Test } from 'supertest';
import { type TodoDocument } from '../api/todo/todo.types';

export const todoGenerator = async (request: SuperTest<Test>): Promise<TodoDocument> => {
  try {
    const todo = {
      title: faker.lorem.sentence({ min: 2, max: 5 })
    };

    const { body: { data: todoResponse } } = await request.post('/api/todo').send(todo);

    return todoResponse;
  } catch (error: any) {
    throw new Error(error.message);
  }
};
