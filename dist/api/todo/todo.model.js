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
exports.todoSchema = void 0;
const mongoose_1 = require("mongoose");
exports.todoSchema = new mongoose_1.Schema({
    title: {
        type: String,
        required: [true, 'Title is required'],
        minlength: [4, 'Title must be at least 4 characters long'],
        validate: [{
                validator: (value) => __awaiter(void 0, void 0, void 0, function* () {
                    var _a;
                    try {
                        const todo = (_a = (yield mongoose_1.models.todo.findOne({ title: value }))) !== null && _a !== void 0 ? _a : null;
                        return todo === null;
                    }
                    catch (error) {
                        return false;
                    }
                }),
                message: 'Todo already exists'
            }]
    },
    completed: {
        type: Boolean,
        required: false,
        default: false
    }
}, {
    timestamps: true,
    versionKey: false
});
const TodoModel = (0, mongoose_1.model)('todo', exports.todoSchema);
exports.default = TodoModel;
