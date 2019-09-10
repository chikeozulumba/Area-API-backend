
/* eslint-disable no-unused-vars */
export default {
  isProduction: () => process.env.NODE_ENV === 'production',
  port: process.env.PORT || Math.random(2000, 3000),
  appUrl() {
    return process.env.APP_URL || `http://localhost:${this.port}`;
  },
  getEnvironmentVariables: () => require('dotenv').config(),
  HASH_SALT: process.env.HASH_SALT,
  jwtOptions: () => ({
    expiresIn: '24hrs',
  }),
  APP_KEY: async () => await require('./redis').default.RedisClient.get('APP_KEY'),
  async signData() {
    return {
      iss: process.env.AREA_ISS,
      appKey: await this.APP_KEY(),
    };
  },
  redisConfig() {
    return this.isProduction() ? {
      url: process.env.REDIS_URL,
    } : { password: process.env.REDIS_PASSWORD };
  },
};
