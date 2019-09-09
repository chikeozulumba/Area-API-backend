import JWT from 'jsonwebtoken';
import { ENV } from '../config';

export const signJWT = (data, secret = process.env.JWT_TOKEN_SECRET, options = undefined) => JWT.sign(data, secret, options || ENV.jwtOptions());

export const decodeJWT = async (token, secret = ENV.JWT_TOKEN_SECRET) => {
  try {
    return await JWT.decode(token, secret);
  } catch (error) {
    throw Error(error);
  }
};
