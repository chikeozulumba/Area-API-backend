import { OK, BAD_REQUEST } from 'http-status-codes';
import Auth from '../classes/Auth';
import Crud from '../classes/Crud';
import { handleSequelizeErrors } from '../utils';

const crud = new Crud();
const { authorize } = new Auth();

export default {
  async signUp(data) {
    try {
      let record = await crud.create(data);
      if (record) {
        record = record.get({ plain: true });
        const token = await authorize(record);
        return { status: OK, token, data: record };
      }
    } catch ({ errors }) {
      return {
        status: BAD_REQUEST,
        message: handleSequelizeErrors(errors),
      };
    }
  },
  signIn() {
    return true;
  },
  checkIfUserExists() {},
};
