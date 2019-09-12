import expect from 'expect';
import request from 'supertest';
import moment from 'moment';
import app from '../../app';
import DB from '../../database/models';


let user = null;
let user2 = null;
let user3 = null;

let resetToken2 = null;

beforeAll(async () => {
  user = await DB.User.create({
    fullName: 'Arthur qwerty reset',
    email: 'arthur_qwerty_reset@gmail.com',
    userName: 'arthur_qwerty_reset',
    password: 'God1993$',
  });
  user = user.get({ plain: true });

  user2 = await DB.User.create({
    fullName: 'Arthur Reset Token two',
    email: 'arthur_qwerty_reset2@gmail.com',
    userName: 'arthur_qwerty_reset2',
    password: 'God1993$',
  });
  user2 = user2.get({ plain: true });

  user3 = await DB.User.create({
    fullName: 'Arthur Reset Token three',
    email: 'arthur_qwerty_reset3@gmail.com',
    userName: 'arthur_qwerty_reset3',
    password: 'God1993$',
  });
  user3 = user3.get({ plain: true });

  resetToken2 = await DB.ResetPassword.create({
    userId: user2.id,
    code: require('secure-random-string')({ length: 256 }),
    expiresAt: moment().add(2, 'hours').tz('Africa/Lagos').format(),
  });
});

describe('Authentication Route :RESET PASSWORD', () => {
  test('POST /auth/password/reset {422} - Reset password action fails when neither email or username is included', async () => {
    await request(app)
      .post('/auth/password/reset')
      .expect('Content-Type', /json/)
      .expect(422);
  });

  test('POST /auth/password/reset {422} - Reset password action fails when neither username is invalid', async () => {
    await request(app)
      .post('/auth/password/reset')
      .send({ userName: '$$$$$$$    pppp' })
      .expect('Content-Type', /json/)
      .expect(422);
  });

  test('POST /auth/password/reset {422} - Reset password action fails when neither email is invalid.', async () => {
    await request(app)
      .post('/auth/password/reset')
      .send({ email: '$$$$$$$    @gmail.com' })
      .expect('Content-Type', /json/)
      .expect(422);
  });

  test('POST /auth/password/reset {422} - Reset password action fails when both email and username are included.', async () => {
    await request(app)
      .post('/auth/password/reset')
      .send({ email: 'chike@gmail.com', userName: 'chike' })
      .expect('Content-Type', /json/)
      .expect(422);
  });

  test('POST /auth/password/reset {200} - Reset password action is successful.', async () => {
    await request(app)
      .post('/auth/password/reset')
      .send({ email: user.email })
      .expect('Content-Type', /json/)
      .expect(200)
      .expect((res) => {
        expect(res.body.message).toEqual('Password reset link has been sent to your email.');
      });
  });

  test('POST /auth/password/reset {409} - Return conflict error when there is already a password reset request active.', async () => {
    await request(app)
      .post('/auth/password/reset')
      .send({ email: user2.email })
      .expect('Content-Type', /json/)
      .expect(409);
  });

  test('POST /auth/password/reset {400} - Reset password action fails when parameters are formatted incorrectly.', async () => {
    await request(app)
      .post('/auth/password/confirm/randomstring')
      .send({ password: 'sosos' })
      .expect('Content-Type', /json/)
      .expect(400);
  });

  test('POST /auth/password/reset {400} - Reset password action fails when parameters dont match.', async () => {
    await request(app)
      .post('/auth/password/confirm/randomstring')
      .send({ password: 'God1993$', confirmPassword: 'God1993' })
      .expect('Content-Type', /json/)
      .expect(400);
  });

  test('POST /auth/password/confirm {401} - Reset password action fails when parameters are correct but code param is incorrect.', async () => {
    await request(app)
      .post('/auth/password/confirm/randomstring')
      .send({ password: 'God1993$', confirmPassword: 'God1993$' })
      .expect('Content-Type', /json/)
      .expect(401);
  });

  test('POST /auth/password/confirm {202} - Reset password action fails when parameters are correct but code param is incorrect.', async () => {
    await request(app)
      .post(`/auth/password/confirm/${resetToken2.code}`)
      .send({ password: 'God1993$', confirmPassword: 'God1993$' })
      .expect('Content-Type', /json/)
      .expect(202);
  });
});
