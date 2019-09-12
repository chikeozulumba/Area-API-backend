import expect from 'expect';
import moment from 'moment';
import { PasswordReset } from '../auth';
import { mockRequest, mockResponse } from './__mocks__';
import DB from '../../../database/models';
import Client from '../../../config/redis';

let user = null;
let user2 = null;
let resetToken = null;
let resetToken2 = null;

beforeAll(async () => {
  user = await DB.User.create({
    fullName: 'John Doe Arthur',
    email: 'johnloginp_reset@gmail.com',
    password: 'God1993$',
    userName: 'johnloginp_reset',
  });
  user2 = await DB.User.create({
    fullName: 'John Doe Arthur two',
    email: 'johnloginp_reset_two@gmail.com',
    password: 'God1993$',
    userName: 'johnloginp_reset_two',
  });
  user = user.get({ plain: true });

  resetToken = await DB.ResetPassword.create({
    userId: user.id,
    code: require('secure-random-string')({ length: 256 }),
    expiresAt: moment().add(2, 'hours').tz('Africa/Lagos').format(),
  });

  resetToken2 = await DB.ResetPassword.create({
    userId: user.id,
    code: require('secure-random-string')({ length: 256 }),
    expiresAt: moment().add(2, 'hours').tz('Africa/Lagos').format(),
  });
});

describe('Password Reset Controller', () => {
  test('Reset password action when credentials are valid', async () => {
    const request = {
      body: {
        email: user2.email,
      },
    };
    const req = mockRequest(request);
    const res = mockResponse();
    await PasswordReset.handle(req, res);
    expect(res.status).toHaveBeenLastCalledWith(200);
    expect(res.json).toHaveBeenLastCalledWith({
      status: 200,
      message: 'Password reset link has been sent to your email.',
    });
  });

  test('Reset password action when credentials are valid but the password reset link is still valid', async () => {
    const request = {
      body: {
        email: user.email,
      },
    };
    const req = mockRequest(request);
    const res = mockResponse();
    await PasswordReset.handle(req, res);
    expect(res.status).toHaveBeenLastCalledWith(409);
    expect(res.json).toHaveBeenLastCalledWith({
      status: 409,
      message: 'Your password request is still active, please check your mail.',
    });
  });

  test('Complete the reset password action with password and confirmPassword as credentials', async () => {
    const request = {
      body: {
        password: 'God1993$',
        confirmPassword: 'God1993$',
      },
      record: resetToken,
    };
    const req = mockRequest(request);
    const res = mockResponse();
    await PasswordReset.complete(req, res);
    expect(res.status).toHaveBeenLastCalledWith(202);
    expect(res.json).toHaveBeenLastCalledWith({ status: 202, message: 'Password successfully changed.' });
  });

  test('Fail the reset password action when password and confirmPassword as do not match as credentials', async () => {
    const request = {
      body: {
        password: 'God1993$',
        confirmPassword: 'God1993',
      },
      record: resetToken2,
    };
    const req = mockRequest(request);
    const res = mockResponse();
    await PasswordReset.complete(req, res);
    expect(res.status).toHaveBeenLastCalledWith(401);
    expect(res.json).toHaveBeenLastCalledWith({ status: 401, message: 'You are unauthorized.' });
  });

  test('Should throw an internal server error when resetRecord is undefined or any other value is not set.', async () => {
    const request = {
      body: {
        password: 'God1993$',
        confirmPassword: 'God1993',
      },
    };
    const req = mockRequest(request);
    const res = mockResponse();
    await PasswordReset.complete(req, res);
    expect(res.status).toHaveBeenLastCalledWith(500);
    expect(res.json).toHaveBeenLastCalledWith({ status: 500, message: 'An error occured while your request was being processed.' });
  });
});


afterAll(async () => {
//   DB.sequelize.close();
  await Client.RedisClient.quit();
});
