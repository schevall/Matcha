import * as db from '../DbAction/DbAction.js';
import User from '../Models/User_Model.js';
import { verifpasswd, verifemail } from './Verif_User_Input_Tools.js';
import mymailer from '../mail_ressources/mymailer.js';
import { ftext, fhtml, subject } from '../mail_ressources/changeEmail_message.js';

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
  const { password, password2, oldpassword } = payload;
  const userpassword = await db.getUserpassword(username);
  if (!User.comparePassword(oldpassword, userpassword)) return ({ error: 'passwordchange', message: 'The old password is wrong !' });
  const error = verifpasswd(password, password2);
  if (error) return ({ error: 'passwordchange', message: error.message });
  return null;
};

const changePassword = (username, payload) => {
  const { password } = payload;
  const newpassword = User.makeHash(password);
  db.setter(username, 'password', newpassword);
};

const controlEmailChange = async (username, payload) => {
  const { email, password } = payload;
  const userpassword = await db.getUserpassword(username);
  if (!User.comparePassword(password, userpassword)) return ({ error: 'emailchange', message: 'The password is not correct !' });
  const error = verifemail(email);
  if (error) return ({ error: 'emailchange', message: error.message });
  return null;
};

const changeEmail = async (username, payload, res) => {
  const { email } = payload;
  const activationkey = User.makeActivationkey(24);
  const text = ftext(username, activationkey);
  const html = fhtml(username, activationkey);
  const sub = subject();
  if (await mymailer(email, text, html, sub)) {
    return res.send({ error: 'mail error' });
  }
  db.setter(username, 'email', email);
  db.setter(username, 'activated', false);
  db.setter(username, 'activationkey', activationkey);
  return res.send({ error: '' });
};


export const updateGateway = async (req, res) => {
  const { username } = req.headers;
  const { field } = req.params;
  if (field === 'generalinfo') {
    const { userInfo } = await updateGeneral(username, req.body);
    return res.send({ error: '', userInfo });
  } else if (field === 'password') {
    const verif = await controlPasswordChange(username, req.body);
    if (verif) {
      return res.send({ error: verif.error, message: verif.message });
    } else {
      changePassword(username, req.body);
      return res.send({ error: '' });
    }
  } else if (field === 'email') {
    const verif = await controlEmailChange(username, req.body);
    if (verif) {
      return res.send({ error: verif.error, message: verif.message });
    }
    changeEmail(username, req.body, res);
    return res.send({ error: '' });
  } else if (field === 'tags') {
    const { tags } = req.body;
    console.log('IN UPDATE TAGS', tags);
    db.setter(username, 'tags', tags);
    return res.send({ error: '' });
  } else if (field === 'geo') {
    const { geo } = req.body;
    if (!geo) return res.send({ error: 'no geo' });
    db.setter(username, 'geo', geo);
    return res.send({ error: '' });
  }
};

export const getFavPic = async (req, res) => {
  const { username } = req.params;
  const output = await db.getter(username, ['profilePicturePath']);
  const { profilePicturePath } = output[0];
  if (!profilePicturePath) return res.send({ error: 'no fav pic' });
  return res.send({ error: '', profilePicturePath });
};

export const getActivity = async (req, res) => {
  const { username } = req.params;
  const activity = await db.getter(username, ['activity']);
  const oldactivity = await db.getter(username, ['oldactivity']);
  await db.setter(username, 'activity', []);
  await db.oldActivityPusher(username, Object.values(activity[0].activity));
  return res.send({ error: '', activity: activity[0], oldactivity: oldactivity[0] });
};

export const getTagList = async (req, res) => {
  const tagList = await db.DbgetTagsList();
  return res.send({ error: '', tagList });
};

export const logout = (req, res) => {
  const { username } = req.headers;
  const date = Date.now();
  db.setter(username, 'lastConnection', date);
  res.send({ error: '' });
};
