import { AsyncWrapper } from '../api/middlewares';
import { Register, Login } from '../api/controllers/auth';
import { validationMiddleware } from '../api/middlewares/validations';
import { REGISTER, LOGIN } from '../api/middlewares/validations/schema';

export const path = '/auth';
export default (Router) => [
  Router.post('/register', validationMiddleware(REGISTER), AsyncWrapper((...args) => Register.handle(...args))),
  Router.post('/login', validationMiddleware(LOGIN), AsyncWrapper((...args) => Login.handle(...args))),
];
