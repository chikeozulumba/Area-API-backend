import request from 'supertest';
import app from '../../app';
import {
  USER_REGISTER, DEFAULT_USER_REGISTER, USER_LOGIN_WITH_OUT_EMAIL_USERNAME, DEFAULT_USER_LOGIN_CREATE, DEFAULT_USER_LOGIN_CORRECT,
} from './__mocks__/data';
import DB from '../../database/models';

let user = null;

beforeAll(async () => {
  user = await DB.User.create(DEFAULT_USER_LOGIN_CREATE);
  user = user.get({ plain: true });
});

describe('Authentication Route :REGISTER', () => {
  test('POST /auth/register {422} - Sign-up action fails when payload is invalid/not included', async () => {
    await request(app)
      .post('/auth/register')
      .expect('Content-Type', /json/)
      .expect(422);
  });

  test('POST /auth/register {422} - Sign-up action fails when email is invalid/not included', async () => {
    await request(app)
      .post('/auth/register')
      .set('Accept', 'application/json')
      .set('Content-Type', 'application/json')
      .send({ ...USER_REGISTER, email: 'jane doe' })
      .expect('Content-Type', /json/)
      .expect(422);
  });

  test('POST /auth/register {422} - Sign-up action fails when username is invalid/not included', async () => {
    await request(app)
      .post('/auth/register')
      .set('Accept', 'application/json')
      .set('Content-Type', 'application/json')
      .send({ ...USER_REGISTER, userName: 'jane doe' })
      .expect('Content-Type', /json/)
      .expect(422);
  });

  test('POST /auth/register {422} - Sign-up action fails when password is invalid/not included', async () => {
    await request(app)
      .post('/auth/register')
      .set('Accept', 'application/json')
      .set('Content-Type', 'application/json')
      .send({ ...USER_REGISTER, password: 'aaa' })
      .expect('Content-Type', /json/)
      .expect(422);
  });

  test('POST /auth/register {200} - Sign-up action fails when payload is invalid', async () => {
    await request(app)
      .post('/auth/register')
      .set('Accept', 'application/json')
      .set('Content-Type', 'application/json')
      .send(DEFAULT_USER_REGISTER)
      .expect('Content-Type', /json/)
      .expect(200);
  });
});
describe('Authentication Route :LOGIN', () => {
  test('POST /auth/login {422} - Sign-in action fails when payload is invalid/not included', async () => {
    await request(app)
      .post('/auth/login')
      .expect('Content-Type', /json/)
      .expect(422);
  });

  test('POST /auth/login {422} - Sign-in action fails when email and username are invalid/not included', async () => {
    await request(app)
      .post('/auth/login')
      .set('Accept', 'application/json')
      .set('Content-Type', 'application/json')
      .send({ ...USER_LOGIN_WITH_OUT_EMAIL_USERNAME })
      .expect('Content-Type', /json/)
      .expect(422);
  });

  test('POST /auth/login {422} - Sign-in action fails when email is invalid', async () => {
    await request(app)
      .post('/auth/login')
      .set('Accept', 'application/json')
      .set('Content-Type', 'application/json')
      .send({ ...DEFAULT_USER_LOGIN_CORRECT, email: 'chike' })
      .expect('Content-Type', /json/)
      .expect(422);
  });

  test('POST /auth/login {422} - Sign-in action fails when userName is invalid', async () => {
    await request(app)
      .post('/auth/login')
      .set('Accept', 'application/json')
      .set('Content-Type', 'application/json')
      .send({ ...DEFAULT_USER_LOGIN_CORRECT, userName: 'chike %%%%%' })
      .expect('Content-Type', /json/)
      .expect(422);
  });

  test('POST /auth/login {422} - Sign-in action fails when password is invalid', async () => {
    await request(app)
      .post('/auth/login')
      .set('Accept', 'application/json')
      .set('Content-Type', 'application/json')
      .send({ ...DEFAULT_USER_LOGIN_CORRECT, password: '   ' })
      .expect('Content-Type', /json/)
      .expect(422);
  });

  test('POST /auth/login {422} - Sign-in action fails when both email and userName is included', async () => {
    await request(app)
      .post('/auth/login')
      .set('Accept', 'application/json')
      .set('Content-Type', 'application/json')
      .send({ ...DEFAULT_USER_LOGIN_CORRECT, userName: 'chike' })
      .expect('Content-Type', /json/)
      .expect(422);
  });
});
