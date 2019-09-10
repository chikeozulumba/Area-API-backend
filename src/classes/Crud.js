import DB from '../database/models';

export default class Crud {
  constructor() {
    this.DB = DB;
    this.model = 'User';
  }

  async findOne(params, options = {}) {
    return await DB[this.model].findAll({ where: { ...params, ...options } });
  }

  async create(data) {
    return await DB[this.model].create(data);
  }

  async checkIfRecordExists(params, options = {}) {
    return await DB[this.model].findOne({ where: { ...params, ...options } });
  }
}
