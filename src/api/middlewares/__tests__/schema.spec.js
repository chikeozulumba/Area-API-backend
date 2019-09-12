import expect from 'expect';
import { mockRequest, mockResponse } from '../../controllers/__tests__/__mocks__';
import { requestParamsValidation, RESET_PASSWORD_CONFIRM, RESET_PASSWORD_CONFIRM_BODY } from '../validations';

describe('Schema validation', () => {
  test('When parameters are valid', async () => {
    const request = {
      params: {
        code: 'abcdef',
      },
      body: {
        password: 'God1993$',
        confirmPassword: 'God1993$',
      },
    };
    const req = mockRequest(request);
    const res = mockResponse();
    const next = jest.fn();
    requestParamsValidation(RESET_PASSWORD_CONFIRM, RESET_PASSWORD_CONFIRM_BODY)(req, res, next);
    expect(next).toHaveBeenCalled();
  });

  test('When request parameters are invalid', async () => {
    const request = {
      params: {
        code: {},
      },
      body: {},
    };
    const req = mockRequest(request);
    const res = mockResponse();
    const next = jest.fn();
    requestParamsValidation(RESET_PASSWORD_CONFIRM, RESET_PASSWORD_CONFIRM_BODY)(req, res, next);
    expect(res.status).toHaveBeenCalledWith(400);
  });

  test('When request body parameters are invalid', async () => {
    const request = {
      params: {
        code: 'abcdef',
      },
      body: {
        password: 'God1993$',
        confirmPassword: 'God1993',
      },
    };
    const req = mockRequest(request);
    const res = mockResponse();
    const next = jest.fn();
    requestParamsValidation(RESET_PASSWORD_CONFIRM, RESET_PASSWORD_CONFIRM_BODY)(req, res, next);
    expect(res.status).toHaveBeenCalled();
  });
});
