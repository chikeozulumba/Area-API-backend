import { hashSync, genSaltSync, compareSync } from 'bcrypt';

export const hashGenerator = async (param) => await hashSync(param, genSaltSync(10));
export const validatePassword = async (password, hash) => await compareSync(password, hash);
