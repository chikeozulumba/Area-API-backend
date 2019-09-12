import moment from 'moment';
import { Op } from 'sequelize';
import {
  OK, BAD_REQUEST, ACCEPTED, UNAUTHORIZED, CONFLICT, INTERNAL_SERVER_ERROR,
} from 'http-status-codes';
import Auth from '../classes/Auth';
import Crud from '../classes/Crud';
import { handleSequelizeErrors, validatePassword } from '../utils';

const crud = new Crud();
const PerformAuthentication = new Auth();

const ERROR_FORMAT = {
  status: BAD_REQUEST,
  message: 'Invalid email and password combination.',
};

export default {
  user: null,
  async signUp(data) {
    try {
      crud.model = 'User';
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
    const prepareCredentialsQuery = this.prepareCredentialsQuery({ email, userName });
    this.user = await crud.checkIfRecordExists(prepareCredentialsQuery);
    if (!this.user || !await this.crossCheckPassword(password)) return this.handleFailedAuthentication(ERROR_FORMAT);
    return this.handleSuccessfulLogin();
  },
  prepareCredentialsQuery({ email, userName }) {
    return email ? { email } : { userName };
  },
  handleFailedAuthentication({ status, ...args }) {
    return { status: status || BAD_REQUEST, ...args };
  },
  async handleSuccessfulLogin() {
    const token = await PerformAuthentication.authorize({ id: this.user.id });
    return { status: ACCEPTED, token };
  },
  async crossCheckPassword(password) {
    if (!this.user) return false;
    return validatePassword(password, this.user.password);
  },
  async resetPassword({ email, userName }) {
    const prepareCredentialsQuery = this.prepareCredentialsQuery({ email, userName });
    await this.checkIfUserExists(prepareCredentialsQuery);
    return this.completeResetPasswordRequest();
  },
  async checkIfUserExists(query) {
    crud.model = 'User';
    this.user = await crud.checkIfRecordExists(query);
    if (!this.user) return this.handleFailedAuthentication({ status: UNAUTHORIZED, message: 'Account does not exist.' });
    return true;
  },
  async completeResetPasswordRequest() {
    if (await this.confirmActivePasswordRequestLink()) {
      return { status: CONFLICT, message: 'Your password request is still active, please check your mail.' };
    }
    if (!await this.savePasswordResetToken()) return { status: INTERNAL_SERVER_ERROR, message: 'Password reset link could not be sent.' };
    return { status: OK, message: 'Password reset link has been sent to your email.' };
  },
  async confirmActivePasswordRequestLink() {
    crud.model = 'ResetPassword';
    const result = await crud.findAll({
      userId: this.user.id,
      fulfilled: 'pending',
      expiresAt: {
        [Op.gte]: moment().tz('Africa/Lagos').format(),
      },
    }, null, { orderBy: ['expiresAt', 'DESC'], limit: 1 });
    return result.length > 0;
  },
  async savePasswordResetToken() {
    try {
      crud.model = 'ResetPassword';
      const result = await crud.create({
        userId: this.user.id,
        code: require('secure-random-string')({ length: 256 }),
        expiresAt: moment().add(2, 'hours').tz('Africa/Lagos').format(),
      });
      return !!result;
    } catch (error) {
      return false;
    }
  },
  async resetPasswordConfirm(resetRecord, { password, confirmPassword }) {
    try {
      crud.model = 'User';
      await this.checkIfUserExists({ id: resetRecord.userId });
      if (this.user && password === confirmPassword) {
        this.user.password = password;
        if (this.user.save()) {
          resetRecord.fulfilled = 'completed';
          if (resetRecord.save()) return { status: ACCEPTED, message: 'Password successfully changed.' };
        }
      } else {
        return { status: UNAUTHORIZED, message: 'You are unauthorized.' };
      }
    } catch (error) {
      return { status: INTERNAL_SERVER_ERROR, message: 'An error occured while your request was being processed.' };
    }
  },
};
