import Crud from './Crud';
import { signJWT } from '../utils';
import { ENV } from '../config';

export default class Auth extends Crud {
  constructor() {
    super();
    this.id = null;
    this.model = 'User';
    this.init();
  }

  init() {
  }

  async user(id = this.id) {
    return await this.DB[this.model].findOne({ where: { id } });
  }

  async authorize(data = {}) {
    this.id = data.id;
    return await signJWT({ key: await ENV.signData(), ...data }) || null;
  }
}
