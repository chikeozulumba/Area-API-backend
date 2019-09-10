import Redis from 'redis';
import AsyncRedis from 'async-redis';
import { ENV } from './index';

let RedisClient = Redis.createClient(ENV.redisConfig());

RedisClient = AsyncRedis.decorate(RedisClient);

RedisClient.on('connect', () => console.log('Redis client connected'));
RedisClient.on('error', (error) => console.log(`Redis Error ${error}`));

export default {
  RedisClient,
  Redis,
};
