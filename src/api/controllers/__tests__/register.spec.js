import expect from 'expect';
import { Register } from '../auth';
import { mockRequest, mockResponse, USER_REGISTER_BODY_REQUEST } from './__mocks__';
import DB from '../../../database/models';

describe('Register Controller', () => {
  test('Sign-up action', async () => {
    const request = {
      body: USER_REGISTER_BODY_REQUEST,
    };
    const req = mockRequest(request);
    const res = mockResponse();
    await Register.handle(req, res);
    expect(res.status).toHaveBeenLastCalledWith(200);
  });
});

afterAll(() => { DB.sequelize.close(); });
