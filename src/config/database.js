const dotenv = require('dotenv');

dotenv.config();

module.exports = {
  development: {
    use_env_variable: 'DATABASE_URL',
    url: process.env.DATABASE_URL,
    dialect: 'postgres',
    logging: false,
    migrationStorage: 'json',
    migrationStoragePath: 'db_tables.json',
    migrationStorageTableName: 'sequelize_meta',
    migrationStorageTableSchema: 'custom_schema',
  },
  test: {
    use_env_variable: 'DATABASE_URL_TEST',
    url: process.env.DATABASE_URL_TEST,
    dialect: 'postgres',
    logging: false,
    migrationStorage: 'json',
    migrationStoragePath: 'db_tables.json',
    migrationStorageTableName: 'sequelize_meta',
    migrationStorageTableSchema: 'custom_schema',
  },
  production: {
    use_env_variable: 'DATABASE_URL_PROD',
    dialect: 'postgres',
    url: process.env.DATABASE_URL_PROD,
    migrationStorage: 'json',
    migrationStoragePath: 'db_tables.json',
    migrationStorageTableName: 'sequelize_meta',
    migrationStorageTableSchema: 'custom_schema',
    dialectOptions: {
      ssl: true,
    },
  },
};
