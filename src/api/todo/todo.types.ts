import { type Document } from 'mongoose';

export interface TodoDocument extends Document {
  title?: string
}

export interface Todo {
  title: string
  completed?: boolean
}

export interface ValidatorError {
  errors: object
  _message: string
  name: string
  message: string
}
export interface ValidatorErrorField {
  name: string
  message: string
  properties: {
    message: string
    type: string
    regexp: object
    path: string
    value: string
  }
  kind: string
  path: string
  value: string
}
