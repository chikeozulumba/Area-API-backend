import expect from 'expect';
import { mockRequest, mockResponse } from '../../controllers/__tests__/__mocks__';
import { AsyncWrapper } from '../error';

describe('Async Wrapper', () => {
  test('Hadling async controllers', async () => {
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
    const errorFunction = () => {
      throw new Error('Throws an error');
    };
    AsyncWrapper(errorFunction)(req, res, next);
    expect(res.status).toHaveBeenCalled();
  });
});
