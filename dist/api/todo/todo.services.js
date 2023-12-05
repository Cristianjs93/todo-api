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
exports.deleteTodo = exports.updateTodo = exports.getAllTodos = exports.createTodo = void 0;
/* eslint-disable @typescript-eslint/strict-boolean-expressions */
const todo_model_1 = __importDefault(require("./todo.model"));
const errorHandler_1 = require("../../utils/errorHandler");
const createTodo = (data) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const todo = yield todo_model_1.default.create(data);
        return todo;
    }
    catch (error) {
        const message = (0, errorHandler_1.validatorErrorHandler)(error);
        throw new Error(message);
    }
});
exports.createTodo = createTodo;
const getAllTodos = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const todos = yield todo_model_1.default.find();
        if (todos === null) {
            throw new Error('Something went wrong when getting all todos, please try again later');
        }
        return todos;
    }
    catch (error) {
        throw new Error(error.message);
    }
});
exports.getAllTodos = getAllTodos;
const updateTodo = (_id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const todo = yield todo_model_1.default.findById(_id);
        if (todo === null) {
            throw new Error('Todo not found');
        }
        const updatedTodo = yield todo_model_1.default.findByIdAndUpdate(_id, { completed: !todo.completed }, { new: true });
        if (updatedTodo === null) {
            throw new Error('Could not update todo');
        }
        return updatedTodo;
    }
    catch (error) {
        throw new Error(error.message);
    }
});
exports.updateTodo = updateTodo;
const deleteTodo = (_id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const todo = yield todo_model_1.default.findByIdAndDelete(_id);
        if (todo === null) {
            throw new Error('Todo not found');
        }
        return todo;
    }
    catch (error) {
        throw new Error(error.message);
    }
});
exports.deleteTodo = deleteTodo;
