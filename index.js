import app from './src/app';
import { ENV } from './src/config';

ENV.getEnvironmentVariables();
app.listen(ENV.port, () => console.log(`API active on ${ENV.appUrl()}`));
