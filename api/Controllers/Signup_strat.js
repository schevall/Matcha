import jwt from 'jsonwebtoken';

import Mongo from '../config/MongoConnection';
import Verif from './Verif_User_Input_Tools';
import User from '../Models/User_Model';
import config from '../config/config';

const signup = async (req, res) => {
  // verification on the User input
  const verif = await Verif(req.body);
  if (verif.success === false) {
    return res.json({ error: verif.message }).end();
  }

  // extraction of info from request and verification that no user allready exist with that username
  const { username, email, password } = req.body;
  const usersCollection = await Mongo.db.collection('users');
  const user = await usersCollection.findOne({ username });

  if (user) {
    return res.json({ error: 'This username already exists.' }).end();
  }

  const newUser = User.create(username, email, password);
  await usersCollection.insertOne(newUser);
  return res.json({}).end();
};


export default signup;
