import * as db from '../DbAction/DbAction.js';
import User from '../Models/User_Model.js';
import { verifpasswd } from './Verif_User_Input_Tools.js';

export const initprofile = async (req, res) => {
  const { username } = req.headers;
  const userInfo = await db.getUserdb(username);
  return res.send({ userInfo });
};

export const activation = async (req, res) => {
  const { activationkey, username } = req.body;
  const userdb = await db.getUserdb(username);
  if (!userdb) {
    return res.send({ error: 'activation', message: 'This user does not exist' });
  }
  if (userdb.activationkey !== activationkey) {
    return res.send({ error: 'activation', message: 'OUPS !, The activation key is not correct' });
  }
  await db.setter(username, 'activationkey', null);
  await db.setter(username, 'activated', true);
  return res.send({ error: '', activated: true, username });
};

const updateGeneral = async (username, payload) => {
  const userInfo = await db.getUserdb(username);
  Object.keys(payload).forEach((key) => {
    if (userInfo[key] !== payload[key]) {
      userInfo[key] = payload[key];
      db.setter(username, key, payload[key]);
    }
  });
  return { userInfo };
};

const controlPasswordChange = async (username, payload) => {
  console.log(payload);
  const { password, password2, oldpassword } = payload;
  const userpassword = await db.getUserpassword(username);
  if (!User.comparePassword(oldpassword, userpassword)) return ({ error: 'password', message: 'The old password is wrong !' });
  const error = verifpasswd(password, password2);
  if (error) return ({ error: 'password', message: error.message });
  return null;
};

const changePassword = (username, payload) => {
  const { password } = payload;
  const newpassword = User.makeHash(password);
  db.setter(username, 'password', newpassword);
};

export const updateGateway = async (req, res) => {
  const { username } = req.headers;
  const { field } = req.params;
  switch (field) {
    case 'generalinfo': {
      const { userInfo } = await updateGeneral(username, req.body);
      res.send({ error: '', userInfo });
      break;
    }
    case 'password': {
      const verif = await controlPasswordChange(username, req.body);
      if (verif) {
        res.send({ error: verif.error, message: verif.message });
      } else {
        changePassword(username, req.body)
        res.send({ error: '' });
      }
      break;
    }
    case 'email':

      break;
    case 'tags':

      break;
    default:
  }
};
