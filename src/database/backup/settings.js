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
  },
  profileId: {
    type: Sequelize.UUID,
    allowNull: false,
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

export function up(queryInterface, Sequelize) {
  return queryInterface.createTable('settings', TableFields(Sequelize));
}
export function down(queryInterface) { return queryInterface.dropTable('settings'); }
