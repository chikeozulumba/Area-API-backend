import expect from 'expect';
import { Login } from '../auth';
import { mockRequest, mockResponse } from './__mocks__';
import DB from '../../../database/models';
import Client from '../../../config/redis';

let user = null;

beforeAll(async () => {
  user = await DB.User.create({
    fullName: 'John Doe',
    email: 'johnlogindev@gmail.com',
    password: 'God1993$',
    userName: 'johnlogindevdoetest',
  });
  user = user.get({ plain: true });
});

describe('Login Controller', () => {
  test('Sign-in action when credentials are not correct', async () => {
    const request = {
      body: {
        email: 'john@gmail.com',
        password: 'God1993$',
      },
    };
    const req = mockRequest(request);
    const res = mockResponse();
    await Login.handle(req, res);
    expect(res.status).toHaveBeenLastCalledWith(400);
  });

  test('Sign-in action when credentials are correct', async () => {
    const request = {
      body: {
        email: 'johnlogindev@gmail.com',
        password: 'God1993$',
      },
    };
    const req = mockRequest(request);
    const res = mockResponse();
    await Login.handle(req, res);
    expect(res.status).toHaveBeenLastCalledWith(202);
  });
});

afterAll(async () => {
  DB.sequelize.close();
  await Client.RedisClient.quit();
});
