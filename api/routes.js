import signin from './Controllers/Signin_strat.js';
import signup from './Controllers/Signup_strat.js';
import showusers from './Getter/User_list.js';
import authControl from './Controllers/authControl.js';
import pictureNbVerif from './Controllers/pictureNbVerif.js';
import uploadPicture from './Controllers/uploadPicture.js';
import getallpictures from './Controllers/getallpictures.js'

const routes = (app, upload) => {

  // public routes
  app.get('/api/users', showusers);
  app.post('/api/signup', signup);
  app.post('/api/signin', signin);

  app.use('/api', authControl);

  app.post('/api/profile/upload/:username', pictureNbVerif, upload.single('imageUploaded'), uploadPicture);
  app.get('/api/user/allpictures', getallpictures);
};

export default routes;
