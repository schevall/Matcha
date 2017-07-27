import jwt from 'jsonwebtoken';

import User from '../Models/User_Model';
import * as db from '../DbAction/DbAction.js';
import config from '../config/config';


const signin = async (req, res) => {
  const { username, password } = req.body;
  if (!username) {
    return res.send({ error: 'errorUsername', message: 'Please fill the username error' });
  }
  if (!password) {
    return res.send({ error: 'errorPassword', message: 'Please fill the password field' });
  }
  const { userdb } = await db.serveDb(username);
  if (!userdb) {
    return res.send({ error: 'errorUsername', message: `This username (${username}) does not exist.` });
  }
  if (!userdb.activated || userdb.activationkey) {
    return res.send({ error: 'errorUsername', message: 'You did not activate your account !' });
  }
  if (!User.comparePassword(password, userdb.password)) {
    return res.send({ error: 'errorPassword', message: 'The given password is incorrect.' });
  }
  db.setter(username, 'logged', true);
  const date = new Date();
  db.setter(username, 'lastConnection', date);
  const { _id } = userdb;
  console.log("SIGNIN", _id);
  const token = jwt.sign({ username, _id }, config.secret, { expiresIn: '3h' });
  return res.send({ token, username });
};

export default signin;
