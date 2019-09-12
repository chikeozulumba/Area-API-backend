import { passworResetConfirm, RouteWrapper, AsyncWrapper } from '../api/middlewares';
import { Register, Login, PasswordReset } from '../api/controllers/auth';
import { requestBodyValidation, requestParamsValidation } from '../api/middlewares/validations';
import {
  REGISTER,
  LOGIN,
  RESET_PASSWORD_INITIALIZE,
  RESET_PASSWORD_CONFIRM,
  RESET_PASSWORD_CONFIRM_BODY,
} from '../api/middlewares/validations/schema';

export const path = '/auth';
export default (Router) => [
  Router.post('/register', requestBodyValidation(REGISTER), AsyncWrapper((...args) => Register.handle(...args))),
  Router.post('/login', requestBodyValidation(LOGIN), RouteWrapper(Login.handle, Login)),
  Router.post('/password/reset/', requestBodyValidation(RESET_PASSWORD_INITIALIZE), RouteWrapper(PasswordReset.handle, PasswordReset)),
  Router.post('/password/confirm/:code', requestParamsValidation(RESET_PASSWORD_CONFIRM, RESET_PASSWORD_CONFIRM_BODY), passworResetConfirm, RouteWrapper(PasswordReset.complete, PasswordReset)),
];
