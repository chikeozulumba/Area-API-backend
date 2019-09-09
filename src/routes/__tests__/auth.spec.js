import request from 'supertest';
import app from '../../app';
import { USER_REGISTER, FAKER, DEFAULT_USER_REGISTER } from './__mocks__/data';

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
      .send({ ...USER_REGISTER, password: FAKER.internet.password() })
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
