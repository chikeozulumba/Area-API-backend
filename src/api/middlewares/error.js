export const AsyncWrapper = (cb) => async (req, res, next) => {
  try {
    return await cb(req, res, next);
  } catch (error) {
    throw new Error(error);
  }
};
