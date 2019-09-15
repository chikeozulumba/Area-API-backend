import { TableFields } from '../migrations/20190914000402-profile';

export default (sequelize, DataTypes) => {
  const Profile = sequelize.define('Profile', TableFields(DataTypes), {
    tableName: 'users_profile',
  });

  return Profile;
};
