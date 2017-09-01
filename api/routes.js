import signin from './Controllers/Signin_strat.js';
import signup from './Controllers/Signup_strat.js';
import init from './Controllers/init.js';
import authControl from './Controllers/authControl.js';
import * as Pictures from './Controllers/PictureManager.js';
import * as Users from './Controllers/UsersManager.js';
import * as Interactions from './Controllers/InteractionsManager.js';
import * as Chat from './Controllers/ChatManager.js';
import getSuggestions from './Controllers/Suggestions.js';
import search from './Controllers/Search.js';

const routes = (app, upload) => {
  // public routes
  app.get('/api/init', init);
  app.post('/api/signup', signup);
  app.post('/api/activation', Users.activation);
  app.post('/api/signin', signin);
  app.post('/api/resetPassword', Users.resetPassword);

  app.use('/api', authControl);

  app.post('/api/users/upload', Pictures.nbVerif, upload.single('imageUploaded'), Pictures.upload);
  app.post('/api/users/removepicture', Pictures.remove);
  app.post('/api/users/favoritepicture', Pictures.favorite);
  app.post('/api/users/update/:field', Users.updateGateway);
  app.get('/api/users/initprofile', Users.initprofile);
  app.get('/api/users/logout', Users.logout);
  app.get('/api/users/getsuggestions/:visitor', getSuggestions);
  app.post('/api/users/search', search);
  app.get('/api/users/getfavoritepicture/:username', Users.getFavPic);
  app.get('/api/users/getActivity/:username', Users.getActivity);
  app.get('/api/users/initNavbar', Users.initNavbar);
  app.get('/api/users/getprofile/:targeted', Interactions.visitProfile);

  app.post('/api/interactions/:action', Interactions.actionGateway);

  app.get('/api/tags/getTagsList', Users.getTagList);

  app.get('/api/chat/getAllMessage', Chat.getAllConversations);
  app.get('/api/chat/getMessage/:target', Chat.getMessages);
  app.post('/api/chat/newMessage', Chat.inputMessage);
  app.get('/api/chat/getNewMessageCount', Chat.getNewMessageCount);
  app.get('/api/chat/updateMessageCount/:target', Chat.updateMessageCount);


  app.get('*', (req, res) => {
    res.send({ error: 'not found', message: 'this request cannot go throught' });
  });
  app.post('*', (req, res) => {
    res.send({ error: 'not found', message: 'this request cannot go throught' });
  });
};

export default routes;
