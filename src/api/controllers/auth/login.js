import Crud from '../../../classes/Crud';
import { Auth } from '../../../actions';

class LoginController extends Crud {
  async handle(req, res) {
    const response = await Auth.signIn(req.body);
    return res.status(response.status).json(response);
  }
}

export default new LoginController();
