import expect from 'expect';
import AuthActions from '../auth';

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

  test('Save password reset token action', async () => {
    AuthActions.user = null;
    const response = await AuthActions.savePasswordResetToken();
    expect(response).toBeFalsy();
  });
});
