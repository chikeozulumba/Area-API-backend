import DB from '../database/models';

export default class Crud {
  constructor() {
    this.DB = DB;
    this.model = 'User';
  }

  async findOne(params) {
    return await DB[this.model].findAll({ where: { ...params } });
  }

  async create(data) {
    return await DB[this.model].create(data);
  }
}
