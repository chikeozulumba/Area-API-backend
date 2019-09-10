// import expect from 'expect';
import { Redis } from '../../config';
import { createAppCSRF, saveCSRF } from '../encrypt';

const { RedisClient: Client } = Redis;

beforeAll(async () => {
  await Client.del('APP_KEY');
});

describe('Sampling exncryption', () => {
  test('Errors recieved based on sequelize database unique violations', async () => {
    await saveCSRF();
  });
});

afterAll(async () => {
  await Client.set('APP_KEY', createAppCSRF(), 'EX', 60 * 60 * 24 * 7);
});
