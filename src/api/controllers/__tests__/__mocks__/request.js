import faker from 'faker';

export { mockReq as mockRequest } from 'sinon-express-mock';

export const USER_REGISTER_BODY_REQUEST = {
  fullName: `${faker.name.firstName()} ${faker.name.firstName()}`,
  email: faker.internet.email(),
  password: 'God1993$',
  userName: faker.name.firstName().toLowerCase(),
};
