import { Redis } from '../../config';

const { RedisClient: Client } = Redis;

const generateAppCSRF = async (req, res, next) => {
  req.csrf = await Client.get('APP_KEY');
  return next();
};

export default generateAppCSRF;
