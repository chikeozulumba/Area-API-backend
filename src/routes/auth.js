import { AsyncWrapper } from '../api/middlewares';
import { Register } from '../api/controllers/auth';
import { validationMiddleware } from '../api/middlewares/validations';
import { REGISTER } from '../api/middlewares/validations/schema';

export const path = '/auth';
export default (Router) => [
  Router.post('/register', validationMiddleware(REGISTER), AsyncWrapper((...args) => Register.handle(...args))),
  Router.post('/login', AsyncWrapper((req, res) => res.send('yesb'))),
];
