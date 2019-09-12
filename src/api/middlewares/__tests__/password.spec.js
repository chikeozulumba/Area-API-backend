import moment from 'moment';
import expect from 'expect';
import { mockRequest, mockResponse } from '../../controllers/__tests__/__mocks__';
import DB from '../../../database/models';
import Client from '../../../config/redis';
import { passworResetConfirm } from '../password';


let user = null;
let resetToken = null;

beforeAll(async () => {
  user = await DB.User.create({
    fullName: 'John Doe Password Reset',
    email: 'johnlogindev_password_reset@gmail.com',
    password: 'God1993$',
    userName: 'johnlogindev_password_reset',
  });
  user = user.get({ plain: true });

  resetToken = await DB.ResetPassword.create({
    userId: user.id,
    code: require('secure-random-string')({ length: 256 }),
    expiresAt: moment().add(2, 'hours').tz('Africa/Lagos').format(),
  });
});

describe('Password Validation middleware', () => {
  test('{401} - Returns unauthorized error if pasword reset request is not available', async () => {
    const request = {
      params: {
        code: require('secure-random-string')({ length: 10 }),
      },
    };
    const req = mockRequest(request);
    const res = mockResponse();
    const next = jest.fn();
    await passworResetConfirm(req, res, next);
    expect(res.status).toHaveBeenLastCalledWith(401);
    expect(res.json).toHaveBeenLastCalledWith({
      error: 'You are not authorized to proceed!',
    });
  });

  test('{200} - Returns unauthorized error if pasword reset request is not available', async () => {
    const request = {
      params: {
        code: resetToken.code,
      },
    };
    const req = mockRequest(request);
    const res = mockResponse();
    const next = jest.fn();
    await passworResetConfirm(req, res, next);
    expect(next).toHaveBeenCalled();
  });
});

afterAll(async () => {
  DB.sequelize.close();
  await Client.RedisClient.quit();
});
