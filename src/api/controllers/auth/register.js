import Controller from '../controller';
import { Auth } from '../../../actions';

const fillable = ['fullName', 'userName', 'email', 'password'];

class RegisterController extends Controller {
  constructor() {
    super();
    this.model = 'User';
  }

  async handle(req, res) {
    const response = await Auth.signUp(this.fields(req.body, fillable));
    return res.status(response.status).json(response);
  }
}

export default new RegisterController();
