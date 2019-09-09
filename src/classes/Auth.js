import Crud from './Crud';
import { signJWT } from '../utils';

export default class Auth extends Crud {
  constructor() {
    super();
    this.userId = null;
    this.model = 'User';
    this.init();
  }

  init() {
  }

  async user() {
    return await this.DB[this.model].findOne({ where: { id: this.userId } });
  }

  async authorize(data) {
    return await signJWT(data) || null;
  }
}
