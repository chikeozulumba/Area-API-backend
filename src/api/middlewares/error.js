import { INTERNAL_SERVER_ERROR } from 'http-status-codes';

export const AsyncWrapper = (cb) => async (req, res, next) => {
  try {
    return await cb(req, res, next);
  } catch (error) {
    return res.status(INTERNAL_SERVER_ERROR).json({
      error: `${error.message}`.toUpperCase(),
    });
  }
};


export const RouteWrapper = (controller, Base) => AsyncWrapper((...args) => controller(...args)).bind(Base);
