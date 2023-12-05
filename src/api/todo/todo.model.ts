import { Schema, model, models } from 'mongoose';
import { type Todo } from './todo.types';

export const todoSchema = new Schema(
  {
    title: {
      type: String,
      required: [true, 'Title is required'],
      minlength: [4, 'Title must be at least 4 characters long'],
      validate: [{
        validator: async (value: string) => {
          try {
            const todo = await models.todo.findOne({ title: value }) as Todo ?? null;
            return todo === null;
          } catch (error) {
            return false;
          }
        },
        message: 'Todo already exists'
      }]
    },
    completed: {
      type: Boolean,
      required: false,
      default: false
    }
  },
  {
    timestamps: true,
    versionKey: false
  }
);

const TodoModel = model('todo', todoSchema);

export default TodoModel;
