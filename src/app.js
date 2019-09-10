import Express from 'express';
import BodyParser from 'body-parser';
import morgan from 'morgan';
import Helmet from 'helmet';
import Cors from 'cors';

import { ENV } from './config';
import initializeRoutes from './routes';
import { generateAppCSRF } from './api/middlewares';

ENV.getEnvironmentVariables();

const app = Express();

app.set('title', 'Area-API');

// Apply Middlewares
app.use(BodyParser.json());
app.use(morgan(':method :url :status :res[content-length] - :response-time ms'));
app.use(Helmet.xssFilter());
app.use(Helmet.frameguard());
app.use(Cors());
app.use(generateAppCSRF);

// Initialize Routes
initializeRoutes(app);

export default app;
