import Express from 'express';

const Router = Express.Router();
const endpoints = [
  require('./auth'),
];

export default function initializeRoutes(app) {
  endpoints.map(({ path, default: endpoint }) => endpoint(Router).forEach((route) => {
    app.use(path, route);
  }));
}
