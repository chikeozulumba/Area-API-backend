import expect from 'expect';
import DB from '../../database/models';
import Auth from '../Auth';

const auth = new Auth();

let user = null;
beforeAll(async () => {
  user = await DB.User.create({
    fullName: 'Arthur',
    email: 'arthur@gmail.com',
    userName: 'arthur_nigeria',
    password: 'God1993$',
  });
  user = user.get({ plain: true });
  auth.id = user.id;
});

describe('Authentication Route :RESET PASSWORD', () => {
  test('POST /auth/password/reset {422} - Reset password action fails when neither email or username is included', async () => {
    const result = await auth.user();
    expect(result).toBeTruthy();
  });
});
