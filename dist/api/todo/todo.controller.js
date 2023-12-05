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
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteTodoHandler = exports.updateTodoHandler = exports.getAllTodosHandler = exports.createTodoHandler = void 0;
const todo_services_1 = require("./todo.services");
const createTodoHandler = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = req.body;
        const todo = yield (0, todo_services_1.createTodo)(data);
        res.status(201).json({ message: 'Todo created successfully', data: todo });
    }
    catch (error) {
        res.status(400).json({ message: 'Error creating todo', error: error.message });
    }
});
exports.createTodoHandler = createTodoHandler;
const getAllTodosHandler = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const todos = yield (0, todo_services_1.getAllTodos)();
        res.status(200).json({ message: 'Todos listed', data: todos });
    }
    catch (error) {
        res.status(400).json({ message: 'Error listing todos', error: error.message });
    }
});
exports.getAllTodosHandler = getAllTodosHandler;
const updateTodoHandler = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const updatedTodo = yield (0, todo_services_1.updateTodo)(id);
        res.status(200).json({ message: 'Todo updated successfully', data: updatedTodo });
    }
    catch (error) {
        res.status(400).json({ message: 'Error updating todo', error: error.message });
    }
});
exports.updateTodoHandler = updateTodoHandler;
const deleteTodoHandler = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const todo = yield (0, todo_services_1.deleteTodo)(id);
        res.status(200).json({ message: 'Todo deleted successfully', data: todo });
    }
    catch (error) {
        res.status(400).json({ message: 'Error deleting todo', error: error.message });
    }
});
exports.deleteTodoHandler = deleteTodoHandler;
