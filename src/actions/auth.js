import { OK, BAD_REQUEST, ACCEPTED } from 'http-status-codes';
import Auth from '../classes/Auth';
import Crud from '../classes/Crud';
import { handleSequelizeErrors, validatePassword } from '../utils';

const crud = new Crud();
const PerformAuthentication = new Auth();

export default {
  user: null,
  async signUp(data) {
    try {
      let record = await crud.create(data);
      if (record) {
        record = record.get({ plain: true });
        const token = await PerformAuthentication.authorize(record);
        return { status: OK, token };
      }
    } catch ({ errors }) {
      return {
        status: BAD_REQUEST,
        message: handleSequelizeErrors(errors),
      };
    }
  },
  async signIn({ email, userName, password }) {
    const signInQuery = this.signInQuery({ email, userName });
    this.user = await crud.checkIfRecordExists(signInQuery);
    if (!this.user || !await this.crossCheckPassword(password)) return this.handleFailedLogin();
    return this.handleSuccessfulLogin();
  },
  signInQuery({ email, userName }) {
    return email ? { email } : { userName };
  },
  handleFailedLogin() {
    return { status: BAD_REQUEST, message: 'Invalid email and password combination.' };
  },
  async handleSuccessfulLogin() {
    const token = await PerformAuthentication.authorize({ id: this.user.id });
    return { status: ACCEPTED, token };
  },
  async crossCheckPassword(password) {
    if (!this.user) return false;
    return validatePassword(password, this.user.password);
  },
};
