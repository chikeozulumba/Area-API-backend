import { TableFields } from '../migrations/user';
import { hashGenerator } from '../../utils';

export default (sequelize, DataTypes) => {
  const User = sequelize.define('User', TableFields(DataTypes), {
    tableName: 'users',
  });

  User.generateHash = async (password) => await hashGenerator(password);

  User.beforeCreate(async (user) => {
    user.password = await User.generateHash(user.password);
  });

  User.beforeUpdate(async (user) => {
    user.password = await User.generateHash(user.password);
  });
  return User;
};
