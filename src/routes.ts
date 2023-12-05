import { type Application } from 'express';
import healthcheckRouter from './api/healthcheck';
import todoRouter from './api/todo';

const routes = (app: Application): void => {
  app.use('/api/healthcheck', healthcheckRouter);
  app.use('/api/todo', todoRouter);
};

export default routes;
