"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const supertest_1 = __importDefault(require("supertest"));
const app_1 = __importDefault(require("../../app"));
const faker_1 = require("@faker-js/faker");
const mongoose_1 = __importDefault(require("mongoose"));
const testUtils_1 = require("../../utils/testUtils");
const request = (0, supertest_1.default)(app_1.default);
afterAll(() => __awaiter(void 0, void 0, void 0, function* () {
    yield mongoose_1.default.disconnect();
}));
describe('Todo controller', () => {
    describe('POST /api/todo', () => {
        test('Should return error: Title is required', () => __awaiter(void 0, void 0, void 0, function* () {
            const todo = {
                title: ''
            };
            const response = yield request.post('/api/todo').send(todo);
            expect(response.status).toBe(400);
            expect(response.body).toHaveProperty('error');
            expect(response.body.error).toEqual('Title is required');
        }));
        test('Should return error: Title must be at least 4 characters long', () => __awaiter(void 0, void 0, void 0, function* () {
            const todo = {
                title: 'do'
            };
            const response = yield request.post('/api/todo').send(todo);
            expect(response.status).toBe(400);
            expect(response.body).toHaveProperty('error');
            expect(response.body.error).toEqual('Title must be at least 4 characters long');
        }));
        test('Should return error: Todo already exists', () => __awaiter(void 0, void 0, void 0, function* () {
            const { title } = yield (0, testUtils_1.todoGenerator)(request);
            const todo = {
                title
            };
            const response = yield request.post('/api/todo').send(todo);
            expect(response.status).toBe(400);
            expect(response.body).toHaveProperty('error');
            expect(response.body.error).toEqual('Todo already exists');
        }));
        test('Should return status 201 Created', () => __awaiter(void 0, void 0, void 0, function* () {
            const todo = {
                title: faker_1.faker.lorem.sentence({ min: 2, max: 5 })
            };
            const response = yield request.post('/api/todo').send(todo);
            expect(response.status).toBe(201);
            expect(response.body).toHaveProperty('message');
            expect(response.body.message).toEqual('Todo created successfully');
            expect(response.body.data).toMatchObject({ title: todo.title });
        }));
    });
    describe('GET /api/todo', () => {
        test('Should return status 200 OK', () => __awaiter(void 0, void 0, void 0, function* () {
            const response = yield request.get('/api/todo');
            expect(response.status).toBe(200);
            expect(response.body).toHaveProperty('message');
            expect(response.body).toHaveProperty('data');
            expect(response.body.message).toEqual('Todos listed');
        }));
    });
    describe('PUT /api/todo/update/:id', () => {
        test('Should return status 200', () => __awaiter(void 0, void 0, void 0, function* () {
            const { _id, title } = yield (0, testUtils_1.todoGenerator)(request);
            const response = yield request.put(`/api/todo/update/${_id}`);
            expect(response.status).toBe(200);
            expect(response.body).toHaveProperty('message');
            expect(response.body.message).toEqual('Todo updated successfully');
            expect(response.body).toHaveProperty('data');
            expect(response.body.data.title).toEqual(title);
            expect(response.body.data.completed).toEqual(true);
        }));
    });
    describe('DELETE /api/todo/delete/:id', () => {
        test('Should return status 200', () => __awaiter(void 0, void 0, void 0, function* () {
            const { _id, title } = yield (0, testUtils_1.todoGenerator)(request);
            const response = yield request.delete(`/api/todo/delete/${_id}`);
            expect(response.status).toBe(200);
            expect(response.body).toHaveProperty('message');
            expect(response.body.message).toEqual('Todo deleted successfully');
            expect(response.body).toHaveProperty('data');
            expect(response.body.data.title).toEqual(title);
        }));
    });
    describe('DELETE /api/todo/delete', () => {
        test('Should return status 200', () => __awaiter(void 0, void 0, void 0, function* () {
            const { _id: id1 } = yield (0, testUtils_1.todoGenerator)(request);
            const { _id: id2 } = yield (0, testUtils_1.todoGenerator)(request);
            const { _id: id3 } = yield (0, testUtils_1.todoGenerator)(request);
            const data = { completedIds: [id1, id2, id3] };
            const response = yield request.delete('/api/todo/delete').send(data);
            expect(response.status).toBe(200);
            expect(response.body).toHaveProperty('message');
            expect(response.body.message).toEqual('Todos clear successfully');
            expect(response.body).toHaveProperty('data');
            expect(response.body.data.deletedCount).toEqual(3);
        }));
    });
});
