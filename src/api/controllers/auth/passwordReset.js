import Crud from '../../../classes/Crud';
import { Auth } from '../../../actions';

class PasswordResetController extends Crud {
  async complete(req, res) {
    const response = await Auth.resetPasswordConfirm(req.record, req.body);
    return res.status(response.status).json(response);
  }

  async handle(req, res) {
    const response = await Auth.resetPassword(req.body);
    return res.status(response.status).json(response);
  }
}

export default new PasswordResetController();
