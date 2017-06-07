import jwt from 'jsonwebtoken';

import Mongo from '../config/MongoConnection';
import config from '../config/config';


const signin = async (req, res) => {
  const { login, password } = req.body;
  const usersCollection = Mongo.db.collection('users');
  const user = await usersCollection.findOne({ login });

  if (!user) {
    return res.json({ success: false, type: 'error', response: `This login (${login}) does not exist.` }).end();
  }
  if (!User.compare_password(password, user.password)) {
    return res.json({ success: false, type: 'error', response: 'The given password is incorrect.' }).end();
  }
  const token = jwt.sign({
    tokenUser: user.id}, config.secret, { expiresIn: '1h' });
  return res.json({ success: true, token: token, loggedUser: user.login }).end();
};

export default signin;
