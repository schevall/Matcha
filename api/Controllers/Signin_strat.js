import jwt from 'jsonwebtoken';

import User from '../Models/User_Model';
import Mongo from '../config/MongoConnection';
import config from '../config/config';


const signin = async (req, res) => {
  console.log('in signin strat, re.body', req.body);
  const { username, password } = req.body;

  if (!username) {
    return res.send({ error: 'errorUsername', message: 'Please fill the username error' });
  }
  if (!password) {
    return res.send({ error: 'errorPassword', message: 'Please fill the password field' });
  }
  const userdb = await Mongo.db.collection('users').findOne({ username });
  if (!userdb) {
    return res.send({ error: 'errorUsername', message: `This username (${username}) does not exist.` });
  }
  if (!userdb.activated || userdb.activationkey) {
    return res.send({ error: 'errorUsername', message: 'You did not activate your account !' });
  }
  if (!User.comparePassword(password, userdb.password)) {
    return res.send({ error: 'errorPassword', message: 'The given password is incorrect.' });
  }
  const token = jwt.sign({
    tokenUser: userdb.id }, config.secret, { expiresIn: '3h' });
  return res.send({ token, username });
};

export default signin;
