import DB from '../database/models';

export default class Crud {
  constructor() {
    this.DB = DB;
    this.model = 'User';
  }

  async findOne(params, conditions = {}) {
    return await DB[this.model].findOne({ where: { ...params, ...conditions } });
  }

  async findAll(params, conditions = {}, optionalConditions = {}) {
    return await DB[this.model].findAll({ where: { ...params, ...conditions }, ...optionalConditions });
  }

  async create(data) {
    return await DB[this.model].create(data);
  }

  async checkIfRecordExists(params, conditions = {}) {
    return await DB[this.model].findOne({ where: { ...params, ...conditions } });
  }
}
