const TableFields = (Sequelize) => ({
  id: {
    primaryKey: true,
    increments: true,
    type: Sequelize.INTEGER,
    defaultValue: Sequelize.UUIDV4,
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
});

export function up(queryInterface, Sequelize) {
  return queryInterface.createTable('usersProfile', TableFields(Sequelize));
}
export function down(queryInterface) { return queryInterface.dropTable('usersProfile'); }
