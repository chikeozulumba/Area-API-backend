import { TableFields } from '../migrations/profile';

export default (sequelize, DataTypes) => {
  const Profile = sequelize.define('Profile', TableFields(DataTypes), {
    tableName: 'users_profile',
  });

  return Profile;
};
