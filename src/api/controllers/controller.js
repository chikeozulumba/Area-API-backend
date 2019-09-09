// import Crud from '../../classes/Crud';
import Auth from '../../classes/Auth';

class Controller extends Auth {
  constructor() {
    super();
    this.init();
  }

  init() {}

  fields(body, fillableEntry) {
    const allowed = {};
    Object.keys(body).forEach((key) => {
      if (fillableEntry.includes(key)) {
        allowed[key] = body[key];
      }
    });
    return allowed;
  }
}

export default Controller;
