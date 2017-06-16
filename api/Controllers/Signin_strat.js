import jwt from 'jsonwebtoken';

import User from '../Models/User_Model';
import Mongo from '../config/MongoConnection';
import config from '../config/config';


const signin = async (req, res) => {
  const { login, password } = req.body;
  if (!login) {
    return res.json({ field: 'errorLogin', error: 'Please fill the login field' }).end();
  }
  if (!password) {
    return res.json({ field: 'errorPassword', error: 'Please fill the password field' }).end();
  }
  const user = await Mongo.db.collection('users').findOne({ login });
  if (!user) {
    return res.json({ field: 'errorLogin', error: `This login (${login}) does not exist.` }).end();
  }
  if (!User.compare_password(password, user.password)) {
    return res.json({ field:'errorPassword', error: 'The given password is incorrect.' }).end();
  }
  const token = jwt.sign({
    tokenUser: user.id}, config.secret, { expiresIn: '1h' });
  return res.json({ token, loggedUser: user.login }).end();
};

export default signin;
