/* eslint-disable no-unused-vars */
export default {
  isProduction: () => process.env.NODE_ENV === 'production',
  port: process.env.PORT || Math.random(2000, 3000),
  appUrl() {
    return process.env.APP_URL || `http://localhost:${this.port}`;
  },
  debugURL(req = undefined, _res = undefined, next = undefined) {
    const debug = require('debug')('express');
    debug(req.method ? `${req.method} ${req.url}` : `${this.appUrl}`);
    return next();
  },
  getEnvironmentVariables: () => require('dotenv').config(),
  HASH_SALT: process.env.HASH_SALT,
  errorHandler(app) {
    if (!this.isProduction()) {
      return app.use(require('errorhandler')({ log: this.errorNotification }));
    }
    return null;
  },
  errorNotification(err, str, req) {
    require('node-notifier').notify({
      title: `Error in ${req.method} ${req.url}`,
      message: str,
    });
  },
  jwtOptions: () => ({
    expiresIn: '24hrs',
  }),
};
