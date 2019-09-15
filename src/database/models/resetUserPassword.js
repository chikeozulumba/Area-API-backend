import { TableFields } from '../migrations/20190914000618-reset-password';

export default (sequelize, DataTypes) => {
  const ResetPassword = sequelize.define('ResetPassword', TableFields(DataTypes), {
    tableName: 'reset_password',
  });

  return ResetPassword;
};
