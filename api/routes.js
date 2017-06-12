import signin from './Controllers/Signin_strat';
import signup from './Controllers/Signup_strat';
import showusers from './Getter/User_list.js'
import authControltest from './Controllers/authControltest';
import authControl from './Controllers/authControl';


const routes = (app) => {

  // public routes
  app.get('/api/users', showusers);
  app.post('/api/signup', signup);
  app.post('/api/signin', signin);

  app.use('/api', authControl);
  app.post('/api/lobby/test', authControltest);
};

export default routes;
