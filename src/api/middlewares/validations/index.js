import Joi from '@hapi/joi';

export * from './schema';

export const requestBodyValidation = (schema) => (req, res, next) => {
  const { error } = Joi.validate(req.body, schema);
  const valid = error == null;

  if (valid) {
    next();
  } else {
    const { details } = error;
    const message = details.map((i) => i.message).join('\n ');
    res.status(422).json({ error: message });
  }
};

const handleMultipleValidationErrors = (res, { details }, errorCode = 400) => res.status(errorCode)
  .json({ error: details.map((i) => i.message).join('\n ') });

export const requestParamsValidation = (paramSchema, bodySchema) => (req, res, next) => {
  if (Object.keys(req.params).length > 0 && paramSchema) {
    const { error } = Joi.validate(req.params, paramSchema);
    if (error) return handleMultipleValidationErrors(res, error, 400);
  }

  if (Object.keys(req.body).length > 0 && bodySchema) {
    const { error } = Joi.validate(req.body, bodySchema);
    if (error) return handleMultipleValidationErrors(res, error, 400);
  }

  return next();
};
