import { isCelebrate } from 'celebrate';

export const AsyncWrapper = (cb) => async (req, res, next) => {
  try {
    return await cb(req, res, next);
  } catch (error) {
    throw new Error(error);
  }
};

export const ValidationErrors = (err, req, res, next) => {
  if (!isCelebrate(err)) return next(err);
  return res.status(400).json({
    status: 400,
    message: 'Bad Request',
    errors: err.joi.details || undefined,
  });
};
