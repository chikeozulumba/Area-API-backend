import { Op } from 'sequelize';
import moment from 'moment';
import Crud from '../../classes/Crud';

export const passworResetConfirm = async (req, res, next) => {
  const crud = new Crud();
  crud.model = 'ResetPassword';
  const record = await crud.findOne({
    code: req.params.code,
    fulfilled: 'pending',
    expiresAt: {
      [Op.gte]: moment().tz('Africa/Lagos').format(),
    },
  });
  if (!record) {
    return res.status(401).json({
      error: 'You are not authorized to proceed!',
    });
  }
  req.record = record;
  return next();
};
