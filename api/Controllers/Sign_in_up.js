import Mongo from '../configMongo/MongoConnection';
import Verif from './Verif_User_Input_Tools';
import User from './Classes/User_class';

const signup = async (req, res) => {
  // verification on the User input
  const verif = await Verif(req.body);
  if (verif.success === false) {
    return res.json({ success: false, type: 'error', message: verif.message }).end();
  }

  // extraction of info from request and verification that no user allready exist with that login
  const { login, email, password } = req.body;
  const usersCollection = Mongo.db.collection('users');
  const user = await usersCollection.findOne({ login });

  if (user) {
    return res.json({ success: false, type: 'error', message: 'This login already exists.' }).end();
  }

  const newUser = User.create(login, email, password);
  await usersCollection.insertOne(newUser);
  return res.json({ success: true, type: 'info', message: 'Your account has been created, click on the link we sent you.' }).end();
};

const signin = async (req, res) => {
  const { login, password } = req.body;
  const usersCollection = Mongo.db.collection('users');
  const user = await usersCollection.findOne({ login });

  if (!user) {
    return res.json({ success: false, type: 'error', message: 'This login does not exist.' }).end();
  }
  if (!User.compare_password(password, user.password)) {
    return res.json({ success: false, type: 'error', message: 'The given password is incorrect.' }).end();
  }
  return res.json({ success: true, type: 'info', message: 'You are connected.' }).end();
};

const showusers = async (req, res) => {
  const all = await Mongo.db.collection('users').find().toArray();
  return res.json({ all }).end();
};

export { signup, signin, showusers };
