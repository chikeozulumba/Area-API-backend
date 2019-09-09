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
