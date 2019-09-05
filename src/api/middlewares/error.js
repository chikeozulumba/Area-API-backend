const AsyncWrapper = (cb) => async (req, res, next) => {
  try {
    return await cb(req, res, next);
  } catch (error) {
    return console.log(error);
  }
};

export default AsyncWrapper;
