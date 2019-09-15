export const TableFields = (Sequelize) => ({
  id: {
    primaryKey: true,
    type: Sequelize.UUID,
    defaultValue: Sequelize.UUIDV4,
  },
  fullName: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true,
  },
  userName: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true,
  },
  email: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true,
  },
  password: {
    type: Sequelize.TEXT,
    allowNull: false,
  },
  isAccountVerified: {
    type: Sequelize.ENUM,
    values: ['verified', 'pending'],
    defaultValue: 'pending',
    allowNull: false,
  },
  isProfileCompleted: {
    type: Sequelize.ENUM,
    values: ['complete', 'pending'],
    defaultValue: 'pending',
    allowNull: false,
  },
  verificationDate: {
    type: Sequelize.DATE,
    allowNull: true,
    defaultValue: Sequelize.DATE(new Date()),
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

export const up = (queryInterface, Sequelize) => queryInterface.createTable('users', TableFields(Sequelize));
export const down = (queryInterface) => queryInterface.dropTable('users');
