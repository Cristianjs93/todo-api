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
exports.todoGenerator = void 0;
const faker_1 = require("@faker-js/faker");
const todoGenerator = (request) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const todo = {
            title: faker_1.faker.lorem.sentence({ min: 2, max: 5 })
        };
        const { body: { data: todoResponse } } = yield request.post('/api/todo').send(todo);
        return todoResponse;
    }
    catch (error) {
        throw new Error(error.message);
    }
});
exports.todoGenerator = todoGenerator;
