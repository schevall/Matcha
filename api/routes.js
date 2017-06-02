import * as Users from './Controllers/Sign_in_up';


const routes = (app) => {
  app.get('/api/users', Users.showusers);
  app.post('/api/signup', Users.signup);
  app.post('/api/signin', Users.signin);
};

export default routes;
