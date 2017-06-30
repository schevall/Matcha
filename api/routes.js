import signin from './Controllers/Signin_strat.js';
import signup from './Controllers/Signup_strat.js';
import showusers from './Getter/User_list.js';
import authControl from './Controllers/authControl.js';
import * as Pictures from './Controllers/PictureManager.js';

const routes = (app, upload) => {
  // public routes
  app.get('/api/users', showusers);
  app.post('/api/signup', signup);
  app.post('/api/signin', signin);

  app.use('/api', authControl);

  app.post('/api/users/:username/upload', Pictures.nbVerif, upload.single('imageUploaded'), Pictures.upload);
  app.get('/api/users/pictures/getall', Pictures.getAll);
};

export default routes;
