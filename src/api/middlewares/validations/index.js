import Joi from '@hapi/joi';

export * from './schema';

export const validationMiddleware = (schema) => (req, res, next) => {
  const { error } = Joi.validate(req.body, schema);
  const valid = error == null;

  if (valid) {
    next();
  } else {
    const { details } = error;
    const message = details.map((i) => i.message).join('\n ');

    console.log('error', message);
    res.status(422).json({ error: message });
  }
};
