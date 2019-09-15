export const TableFields = (Sequelize) => ({
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: Sequelize.INTEGER,
  },
  userId: {
    type: Sequelize.UUID,
    allowNull: false,
    primaryKey: true,
  },
  code: {
    type: Sequelize.TEXT,
    allowNull: false,
  },
  fulfilled: {
    type: Sequelize.ENUM,
    values: ['pending', 'completed'],
    defaultValue: 'pending',
    allowNull: false,
  },
  expiresAt: {
    type: Sequelize.DATE,
    allowNull: false,
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

export const up = (queryInterface, Sequelize) => queryInterface.createTable('reset_password', TableFields(Sequelize));
export const down = (queryInterface) => queryInterface.dropTable('reset_password');
