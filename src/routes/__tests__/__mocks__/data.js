import faker from 'faker';

export const FAKER = faker;

export const USER_REGISTER = {
  fullName: `${faker.name.firstName()} ${faker.name.firstName()}`,
  email: faker.internet.email(),
  password: 'God1993$',
  userName: faker.name.firstName().toLowerCase(),
};

export const DEFAULT_USER_REGISTER = {
  fullName: 'Chike Ozulumba',
  email: 'chike@gmail.com',
  password: 'God1993$',
  userName: 'chike_ozulumba',
};

export const DEFAULT_USER_LOGIN = {
  email: 'chike@gmail.com',
  password: 'God1993$',
  userName: 'chike_ozulumba',
};

export const DEFAULT_USER_LOGIN_CREATE = {
  fullName: 'Chike Arthur Ozulumba',
  email: 'chikelogin@gmail.com',
  password: 'God1993$',
  userName: 'chike_loginozulumba',
};

export const USER_LOGIN_WITH_OUT_EMAIL_USERNAME = {
  password: 'God1993$',
};

export const DEFAULT_USER_LOGIN_CORRECT = {
  email: 'chikelogin@gmail.com',
  password: 'God1993$',
};
