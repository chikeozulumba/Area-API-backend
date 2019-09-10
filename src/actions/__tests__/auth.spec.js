import expect from 'expect';
import AuthActions from '../auth';

import Client from '../../config/redis';
import DB from '../../database/models';

describe('Auth Action', () => {
  test('Sign-up action', async () => {
    const data = {
      fullName: null, // should be a string
      email: 'john@gmail.com',
      password: 'God1993$',
      userName: null,
    };
    const response = await AuthActions.signUp(data);
    expect(response.status).toEqual(400);
    expect(response.message).toEqual('Full Name field is of an incorrect value.');
  });
});

afterEach(async () => {
  DB.sequelize.close();
  await Client.RedisClient.quit();
});
