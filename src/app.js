import Express from 'express';
import BodyParser from 'body-parser';
import morgan from 'morgan';
import Helmet from 'helmet';
import Cors from 'cors';

import { ENV } from './config';
import initializeRoutes from './routes';
import { ValidationErrors } from './api/middlewares';

const app = Express();

// Apply Middlewares
app.use(BodyParser.json());
app.use(morgan(':method :url :status :res[content-length] - :response-time ms'));
app.use(Helmet.xssFilter());
app.use(Helmet.frameguard());
app.use(Cors());

// Initialize Routes
initializeRoutes(app);

app.use(ENV.debugURL);

// Error and Logging Handler
ENV.errorHandler(app);

app.use(ValidationErrors);

export default app;
