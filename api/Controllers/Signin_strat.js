import jwt from 'jsonwebtoken';

import User from '../Models/User_Model';
import Mongo from '../config/MongoConnection';
import config from '../config/config';


const signin = async (req, res) => {
  const { login, password } = req.body;
  const usersCollection = Mongo.db.collection('users');
  const user = await usersCollection.findOne({ login });
  if (!user) {
    return res.json({ error: `This login (${login}) does not exist.` }).end();
  }
  if (!User.compare_password(password, user.password)) {
    return res.json({ error: 'The given password is incorrect.' }).end();
  }
  const token = jwt.sign({
    tokenUser: user.id}, config.secret, { expiresIn: '1h' });
  return res.json({ token, loggedUser: user.login }).end();
};

export default signin;
