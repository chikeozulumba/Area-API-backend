import CSRF from 'csrf';
import { Redis } from '../config';

const { RedisClient: Client } = Redis;

const Csrf = new CSRF({
  saltLength: 10,
});

export const createAppCSRF = () => Csrf.create('secret');

export const saveCSRF = async () => {
  if (!await Client.get('APP_KEY')) {
    await Client.set('APP_KEY', createAppCSRF(), 'EX', 60 * 60 * 24 * 7);
  }
};
