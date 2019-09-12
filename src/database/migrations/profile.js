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
  photos: {
    type: Sequelize.JSONB,
    defaultValue: [],
  },
  bioDescription: {
    type: Sequelize.TEXT,
    allowNull: true,
  },
  gender: {
    type: Sequelize.ENUM,
    values: ['female', 'male', 'none'],
    defaultValue: 'none',
    allowNull: false,
  },
  phoneNumber: {
    type: Sequelize.STRING(255),
    allowNull: true,
  },
  address: {
    type: Sequelize.TEXT,
    allowNull: true,
  },
  state: {
    type: Sequelize.STRING,
    allowNull: true,
  },
  country: {
    type: Sequelize.STRING,
    allowNull: true,
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
  return queryInterface.createTable('users_profile', TableFields(Sequelize));
}
export function down(queryInterface) { return queryInterface.dropTable('users_profile'); }
