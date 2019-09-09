import { Joi } from '@hapi/joi';

export const REGISTER = {
  fullName: Joi
    .string()
    .required()
    .regex(/^[a-z ,.'-]+$/i)
    .error(() => 'Full Name must be a string and should only contain letters and spaces.'),
  userName: Joi.string()
    .min(3).max(20)
    .required()
    .regex(/^[a-z_]{5,}[a-z]+[_]*$/)
    .error(() => 'Username must be lowercase and must contain only alphabets and \' _ \' '),
  email: Joi.string()
    .email()
    .required(),
  password: Joi.string()
    .min(0).max(50)
    .regex(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()_+\-=\\[\]{};':"\\|,.<>\\/?]).{6,}$/)
    .required()
    .error(() => 'Password must include at least 1 uppercase, 1 lowercase, 1 special character.'),
};
