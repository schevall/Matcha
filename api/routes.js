import signin from './Controllers/Signin_strat';
import signup from './Controllers/Signup_strat';
import showusers from './Getter/User_list.js'
import authControl from './Controllers/authControl';


const routes = (app) => {

  // public routes
  app.get('/api/users', showusers);
  app.post('/api/signup', signup);
  app.post('/api/signin', signin);

  app.use('/api', authControl);
  app.get('/api/lobby', (req, res) => {
    res.send(200, 'this is the secret u can only have if u passed the test');
  })
};

export default routes;
