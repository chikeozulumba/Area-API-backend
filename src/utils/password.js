import { hashSync, genSaltSync } from 'bcrypt';

export const hashGenerator = async (param) => await hashSync(param, genSaltSync(10));
