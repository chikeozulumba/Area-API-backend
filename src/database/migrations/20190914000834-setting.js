export const TableFields = (Sequelize) => ({
  id: {
    primaryKey: true,
    autoIncrement: true,
    type: Sequelize.INTEGER,
  },
  userId: {
    primaryKey: true,
    type: Sequelize.UUID,
    allowNull: false,
    references: {
      model: 'users',
      key: 'id',
    },
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
  },
  profileId: {
    type: Sequelize.INTEGER,
    allowNull: false,
    references: {
      model: 'users_profile',
      key: 'id',
    },
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
  },
  isPrivate: {
    type: Sequelize.INTEGER,
    allowNull: false,
    defaultValue: 0,
  },
  allowNotifications: {
    type: Sequelize.ENUM,
    values: ['on', 'off', 'email', 'app'],
    allowNull: false,
    defaultValue: 'off',
  },
  defaultLocation: {
    type: Sequelize.JSONB,
    defaultValue: {
      long: 0,
      lat: 0,
    },
  },
  createdAt: {
    allowNull: false,
    type: Sequelize.DATE,
  },
  updatedAt: {
    allowNull: false,
    type: Sequelize.DATE,
  },
});

export const up = (queryInterface, Sequelize) => queryInterface.createTable('settings', TableFields(Sequelize));
export const down = (queryInterface) => queryInterface.dropTable('settings');
