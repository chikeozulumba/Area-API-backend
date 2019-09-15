export const TableFields = (Sequelize) => ({
  id: {
    primaryKey: true,
    autoIncrement: false,
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  storyId: {
    type: Sequelize.UUID,
    allowNull: false,
    references: {
      model: 'stories',
      key: 'id',
    },
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
  },
  isBlocked: {
    type: Sequelize.INTEGER,
    defaultValue: 0,
  },
  resource: {
    type: Sequelize.JSONB,
    defaultValue: [],
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

export const up = (queryInterface, Sequelize) => queryInterface.createTable('story_resources', TableFields(Sequelize));
export const down = (queryInterface) => queryInterface.dropTable('story_resources');
