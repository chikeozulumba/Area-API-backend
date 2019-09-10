import app from './app';
import { ENV } from './config';
import { saveCSRF, CRON_JOB } from './utils';

app.listen(ENV.port, async () => {
  await saveCSRF();
  CRON_JOB();
  console.log(`API active on ${ENV.appUrl()}`);
});

export default app;
