"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const healthcheck_1 = __importDefault(require("./api/healthcheck"));
const todo_1 = __importDefault(require("./api/todo"));
const routes = (app) => {
    app.use('/api/healthcheck', healthcheck_1.default);
    app.use('/api/todo', todo_1.default);
};
exports.default = routes;
