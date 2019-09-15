const table = 'reset_password';
const toTable = 'users';
const foreignKey = 'reset_password_userId_fkey_users';

export const up = async (queryInterface) => {
  await queryInterface.addConstraint(table, ['userId'], {
    type: 'foreign key',
    name: foreignKey,
    references: {
      table: toTable,
      field: 'id',
    },
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
  });
};

export const down = async (queryInterface) => {
  await queryInterface
    .removeConstraint(table, foreignKey);
};
