import Redis from 'redis';
import AsyncRedis from 'async-redis';

let RedisClient = Redis.createClient({
  password: 'chike',
});

RedisClient = AsyncRedis.decorate(RedisClient);

RedisClient.on('connect', () => console.log('Redis client connected'));
RedisClient.on('error', (error) => console.log(`Redis Error ${error}`));

export default {
  RedisClient,
  Redis,
};
