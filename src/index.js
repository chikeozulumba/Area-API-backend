import 'babel-polyfill';
import app from './app';
import { ENV } from './config';

ENV.getEnvironmentVariables();
app.listen(ENV.port, () => console.log(`API active on ${ENV.appUrl()}`));

export default app;
