import { TableFields } from '../migrations/resetUserPassword';

export default (sequelize, DataTypes) => {
  const ResetPassword = sequelize.define('ResetPassword', TableFields(DataTypes), {
    tableName: 'reset_password',
  });

  return ResetPassword;
};
