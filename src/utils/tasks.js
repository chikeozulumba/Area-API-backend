import CRON from 'node-cron';
import { saveCSRF } from './encrypt';

export const CRON_JOB = () => CRON.schedule('*/10 * * * *', () => {
  saveCSRF().then(() => console.log('Checked to update APP_KEY'));
});
