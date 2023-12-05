# Todo API

## Table of contents 📄

- [Todo API](#todo-api)
  - [Table of contents 📄](#table-of-contents-)
  - [Overview :writing_hand:](#overview-writing_hand)
    - [Installation :gear:](#installation-gear)
  - [Express Router and Routes](#express-router-and-routes)
    - [Basic example **Create Todo** `/api/todo`:](#basic-example-create-todo-apitodo)
    - [Built with 🛠️](#built-with-️)
  - [Author 👊](#author-)

## Overview :writing_hand:

REST API for todos. This repository contains the backend structure and the link to the deployed API on Render: [Deployed Project](https://todo-api-2s3k.onrender.com). The application connects to a user interface developed with React. Here is the link to the frontend repository: [Frontend Repository](https://github.com/Cristianjs93/todo-app).

### Installation :gear:

To get started with the project, follow these steps:

1. Clone the repository:

```shell
git clone https://github.com/Cristianjs93/todo-api
```

2. Navigate to the project directory:

```shell
cd todo-api
```

3. Install the dependencies:

```shell
 npm install
```

4. Create the .env file at the root of the project and define the environment variables (refer to the .env.example file for guidance):

```shell
PORT=8080
NODE_ENV=''
DB_CONNECTION_STRING=mongodb+srv://user:password@db.84lsprh.mongodb.net/db_name
DB_CONNECTION_STRING_TEST=mongodb+srv://user:password@db.84lsprh.mongodb.net/testdb_name
```

5. Start the application:

```shell
 npm run dev
```

## Express Router and Routes

| Route                | HTTP Verb | Description             |
| -------------------- | --------- | ----------------------- |
| /api/healthcheck     | GET       | Healthcheck             |
| /api/todo            | GET       | List all todos          |
| /api/todo            | POST      | Create a todo           |
| /api/todo/update/:id | PUT       | Update todo information |
| /api/todo/delete/:id | DELETE    | Delete a todo           |

### Basic example **Create Todo** `/api/todo`:

Request Body:

```json
{
  "title": "Study Javascript"
}
```

Response:

```json
{
  "message": "Todo created successfully",
  "data": {
    "title": "Study Javascript",
    "completed": false,
    "_id": "656eee4a40c3b3db47d5a666",
    "createdAt": "2023-12-05T09:32:58.922Z",
    "updatedAt": "2023-12-05T09:32:58.922Z"
  }
}
```

### Built with 🛠️

- Built with Node.js and Express
- Typescript
- MongoDB
- REST API

## Author 👊

This project was created by [Cristianjs93](https://github.com/Cristianjs93).
