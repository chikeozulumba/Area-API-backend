import Joi from '@hapi/joi';

const EMAIL_WHEN_ERROR = 'Email format in field is invalid.';
const FULL_NAME_WHEN_ERROR = 'Full Name must be a string and should only contain letters and \'. - \'';
const USERNAME_WHEN_ERROR = 'Username value must contain only alphabets and \' _ \' ';
const PASWORD_WHEN_ERROR = 'Password must contain at least 1 uppercase, 1 lowercase, 1 special character.';
const EMAIL_USERNAME_ERROR = 'Either email or password field should be set, not both.';

export const REGISTER = {
  fullName: Joi
    .string()
    .required()
    .regex(/^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$/)
    .error(() => FULL_NAME_WHEN_ERROR),
  userName: Joi.string()
    .min(3).max(20)
    .required()
    .regex(/^[a-z_]{3,}[a-z]+[_]*$/)
    .error(() => USERNAME_WHEN_ERROR),
  email: Joi.string()
    .email()
    .required()
    .error(() => EMAIL_WHEN_ERROR),
  password: Joi.string()
    .min(0).max(50)
    .regex(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()_+\-=\\[\]{};':"\\|,.<>\\/?]).{6,}$/)
    .required()
    .error(() => PASWORD_WHEN_ERROR),
};

export const LOGIN = {
  userName: Joi.string()
    .min(3).max(20)
    .regex(/^[a-z_]{3,}[a-z]+[_]*$/)
    .error(() => USERNAME_WHEN_ERROR),
  email: Joi.when('userName', {
    is: Joi.exist(),
    then: Joi.forbidden().error(() => EMAIL_USERNAME_ERROR),
    otherwise: Joi.string()
      .email()
      .required()
      .error(() => EMAIL_WHEN_ERROR),
  }),
  password: Joi.string()
    .min(0).max(50)
    .regex(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()_+\-=\\[\]{};':"\\|,.<>\\/?]).{6,}$/)
    .required()
    .error(() => PASWORD_WHEN_ERROR),
};


export const RESET_PASSWORD_INITIALIZE = {
  userName: Joi.string()
    .min(3).max(20)
    .regex(/^[a-z_]{3,}[a-z]+[_]*$/)
    .error(() => USERNAME_WHEN_ERROR),
  email: Joi.when('userName', {
    is: Joi.exist(),
    then: Joi.forbidden().error(() => EMAIL_USERNAME_ERROR),
    otherwise: Joi.string()
      .email()
      .required()
      .error(() => 'You can fill out either an email address or your username, not both - only one is required.'),
  }),
};

export const RESET_PASSWORD_CONFIRM = {
  code: Joi.string().required().min(5),
};

export const RESET_PASSWORD_CONFIRM_BODY = {
  password: Joi.string()
    .min(0).max(50)
    .regex(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()_+\-=\\[\]{};':"\\|,.<>\\/?]).{6,}$/)
    .required()
    .error(() => PASWORD_WHEN_ERROR),
  confirmPassword: Joi.any()
    .valid(Joi.ref('password')).required()
    .required()
    .error(() => 'Passwords do not match.'),
};
