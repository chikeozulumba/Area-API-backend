export const TableFields = (Sequelize) => ({
  id: {
    primaryKey: true,
    allowNull: false,
    type: Sequelize.UUID,
    defaultValue: Sequelize.UUID4,
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
  storyResourcesId: {
    type: Sequelize.INTEGER,
    allowNull: false,
    references: {
      model: 'story_resources',
      key: 'id',
    },
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
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
  actions: {
    type: Sequelize.ENUM,
    values: ['comment', 'post', 'like'],
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

export const up = (queryInterface, Sequelize) => queryInterface.createTable('story_actions', TableFields(Sequelize));
export const down = (queryInterface) => queryInterface.dropTable('story_actions');
