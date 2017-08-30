import ipInfo from 'ipinfo';
import Mongo from '../config/MongoConnection';
import { VerifUserSignin } from './Verif_User_Input_Tools';
import User from '../Models/User_Model';
import mymailer from '../mail_ressources/mymailer.js';
import { ftext, fhtml, subject } from '../mail_ressources/signup_message.js';

const signup = async (req, res) => {
  let verif = await VerifUserSignin(req.body);
  if (verif.success === false) {
    return res.send({ verif });
  }

  const { username, email, password, genderValue, birthDate, firstname, lastname } = req.body;
  const usersCollection = await Mongo.db.collection('users');
  const user = await usersCollection.findOne({ username });

  if (user) {
    verif = {
      success: false,
      output: [{
        error: 'errorUsername',
        message: 'This username already exists.',
      }],
    };
    return res.send({ verif });
  }
  const geo = await ipInfo((err, cLoc) => {
    if (err) {
      console.log('ipInfo pb =', err);
      return '0,0';
    }
    return cLoc.loc;
  });
  const newUser = User.create(username, email, password, birthDate, genderValue, firstname, lastname, geo);
  const { activationkey } = newUser;
  const text = ftext(username, activationkey);
  const html = fhtml(username, activationkey);
  const sub = subject();
  mymailer(email, text, html, sub);
  await usersCollection.insertOne(newUser);
  return res.send({ verif });
};

export default signup;
