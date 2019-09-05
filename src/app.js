import Express from 'express';
import { ENV } from './config';
import initializeRoutes from './routes';

const app = Express();

// Initialize Routes
initializeRoutes(app);

app.use(ENV.debugURL);

export default app;
