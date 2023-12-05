import supertest from 'supertest';
import app from '../../app';
import { faker } from '@faker-js/faker';
import mongoose from 'mongoose';
import { todoGenerator } from '../../utils/testUtils';

const request = supertest(app);

afterAll(async () => {
  await mongoose.disconnect();
});

describe('Todo controller', () => {
  describe('POST /api/todo', () => {
    test('Should return error: Title is required', async () => {
      const todo = {
        title: ''
      };

      const response = await request.post('/api/todo').send(todo);

      expect(response.status).toBe(400);
      expect(response.body).toHaveProperty('error');
      expect(response.body.error).toEqual('Title is required');
    });
    test('Should return error: Title must be at least 4 characters long', async () => {
      const todo = {
        title: 'do'
      };

      const response = await request.post('/api/todo').send(todo);

      expect(response.status).toBe(400);
      expect(response.body).toHaveProperty('error');
      expect(response.body.error).toEqual('Title must be at least 4 characters long');
    });
    test('Should return error: Todo already exists', async () => {
      const { title } = await todoGenerator(request);
      const todo = {
        title
      };

      const response = await request.post('/api/todo').send(todo);

      expect(response.status).toBe(400);
      expect(response.body).toHaveProperty('error');
      expect(response.body.error).toEqual('Todo already exists');
    });
    test('Should return status 201 Created', async () => {
      const todo = {
        title: faker.lorem.sentence({ min: 2, max: 5 })
      };

      const response = await request.post('/api/todo').send(todo);

      expect(response.status).toBe(201);
      expect(response.body).toHaveProperty('message');
      expect(response.body.message).toEqual('Todo created successfully');
      expect(response.body.data).toMatchObject({ title: todo.title });
    });
  });
  describe('GET /api/todo', () => {
    test('Should return status 200 OK', async () => {
      const response = await request.get('/api/todo');

      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('message');
      expect(response.body).toHaveProperty('data');
      expect(response.body.message).toEqual('Todos listed');
    });
  });
  describe('PUT /api/todo/update/:id', () => {
    test('Should return status 200', async () => {
      const { _id, title } = await todoGenerator(request);

      const response = await request.put(`/api/todo/update/${_id}`);

      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('message');
      expect(response.body.message).toEqual('Todo updated successfully');
      expect(response.body).toHaveProperty('data');
      expect(response.body.data.title).toEqual(title);
      expect(response.body.data.completed).toEqual(true);
    });
  });
  describe('DELETE /api/todo/delete/:id', () => {
    test('Should return status 200', async () => {
      const { _id, title } = await todoGenerator(request);

      const response = await request.delete(`/api/todo/delete/${_id}`);

      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('message');
      expect(response.body.message).toEqual('Todo deleted successfully');
      expect(response.body).toHaveProperty('data');
      expect(response.body.data.title).toEqual(title);
    });
  });
  describe('DELETE /api/todo/delete', () => {
    test('Should return status 200', async () => {
      const { _id: id1 } = await todoGenerator(request);
      const { _id: id2 } = await todoGenerator(request);
      const { _id: id3 } = await todoGenerator(request);

      const data = { completedIds: [id1, id2, id3] };

      const response = await request.delete('/api/todo/delete').send(data);

      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('message');
      expect(response.body.message).toEqual('Todos clear successfully');
      expect(response.body).toHaveProperty('data');
      expect(response.body.data.deletedCount).toEqual(3);
    });
  });
});
