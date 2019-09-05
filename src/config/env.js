/* eslint-disable no-unused-vars */
export default {
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
};
