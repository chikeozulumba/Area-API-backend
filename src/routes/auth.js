import AsyncWrapper from '../api/middlewares';

export const path = '/auth';
export default (Router) => {
  const register = Router.post('/register', AsyncWrapper((req, res) => res.send('yesa')));
  const login = Router.post('/login', AsyncWrapper((req, res) => res.send('yesb')));

  return [
    register,
    login,
  ];
};
