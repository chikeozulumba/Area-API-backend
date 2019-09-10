import 'babel-polyfill';
import RedisClient from './redis';

process.on('exit', () => RedisClient.RedisClient.quit());
