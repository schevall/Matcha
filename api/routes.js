import signin from './Controllers/Signin_strat.js';
import signup from './Controllers/Signup_strat.js';
import showusers from './Getter/User_list.js';
import authControl from './Controllers/authControl.js';
import * as Pictures from './Controllers/PictureManager.js';
import * as Users from './Controllers/UsersManager.js';

const routes = (app, upload) => {
  // public routes
  app.get('/api/users', showusers);
  app.post('/api/signup', signup);
  app.post('/api/signin', signin);

  app.use('/api', authControl);

  app.post('/api/user/activation', Users.activation);
  app.post('/api/users/upload', Pictures.nbVerif, upload.single('imageUploaded'), Pictures.upload);
  app.post('/api/users/removepicture', Pictures.remove);
  app.post('/api/users/favoritepicture', Pictures.favorite);
  app.post('/api/users/update/:field', Users.updateGateway);
  app.get('/api/users/initprofile', Users.initprofile);
};

export default routes;
