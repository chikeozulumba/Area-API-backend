export const TableFields = (Sequelize) => ({
  id: {
    primaryKey: true,
    autoIncrement: false,
    type: Sequelize.UUID,
    defaultValue: Sequelize.UUIDV4,
  },
  userId: {
    type: Sequelize.UUID,
    allowNull: false,
    references: {
      model: 'users',
      key: 'id',
    },
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
  },
  views: {
    type: Sequelize.BIGINT,
    defaultValue: 0,
    allowNull: false,
  },
  permissions: {
    allowNull: true,
    type: Sequelize.ENUM,
    values: ['all', 'followers', 'pause', 'blocked'],
    defaultValue: 'all',
  },
  createdAt: {
    allowNull: false,
    type: Sequelize.DATE,
  },
  updatedAt: {
    allowNull: false,
    type: Sequelize.DATE,
  },
  expiresAt: {
    allowNull: false,
    type: Sequelize.DATE,
  },
});

export const up = (queryInterface, Sequelize) => queryInterface.createTable('stories', TableFields(Sequelize));
export const down = (queryInterface) => queryInterface.dropTable('stories');
