import { TableFields } from '../migrations/user';

export default (sequelize, DataTypes) => {
  const Profile = sequelize.define('Profile', TableFields(DataTypes), {
    tableName: 'usersProfile',
  });

  return Profile;
};
