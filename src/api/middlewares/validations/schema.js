import Joi from '@hapi/joi';

export const REGISTER = {
  fullName: Joi
    .string()
    .required()
    .regex(/^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$/)
    .error(() => 'Full Name must be a string and should only contain letters and \'. - \''),
  userName: Joi.string()
    .min(3).max(20)
    .required()
    .regex(/^[a-z_]{3,}[a-z]+[_]*$/)
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

export const LOGIN = {
  userName: Joi.string()
    .min(3).max(20)
    .regex(/^[a-z_]{3,}[a-z]+[_]*$/)
    .error(() => 'Username is required - must be lowercase and must contain only alphabets and \' _ \' '),
  email: Joi.when('userName', {
    is: Joi.exist(),
    then: Joi.forbidden().error(() => 'Username already present, email not needed.'),
    otherwise: Joi.string()
      .email()
      .required()
      .error(() => 'Username is not included, hence email is required.'),
  }),
  password: Joi.string()
    .min(0).max(50)
    .regex(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()_+\-=\\[\]{};':"\\|,.<>\\/?]).{6,}$/)
    .required()
    .error(() => 'Password must include at least 1 uppercase, 1 lowercase, 1 special character.'),
};
