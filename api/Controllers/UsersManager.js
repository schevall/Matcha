import * as db from '../DbAction/DbAction.js';
import { getMessageCount } from '../DbAction/DbChat.js';
import User from '../Models/User_Model.js';
import { verifpasswd, verifemail } from './Verif_User_Input_Tools.js';
import mymailer from '../mail_ressources/mymailer.js';
import { ftext, fhtml, subject } from '../mail_ressources/reset_message.js';

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

export const resetPassword = async (req, res) => {
  const { email, username } = req.body;
  const userdb = await db.getUserdb(username);
  if (!userdb) {
    return res.send({ error: 'resetPassword', message: 'This user does not exist' });
  }
  if (userdb.email !== email) {
    return res.send({ error: 'resetPassword', message: `The email we have for (${username}) does not match with ${email}` });
  }
  const newPassword = User.makeActivationkey(8);
  const hashedPassword = User.makeHash(newPassword);
  db.setter(username, 'password', hashedPassword);
  const text = ftext(username, newPassword);
  const html = fhtml(username, newPassword);
  const sub = subject();
  mymailer(email, text, html, sub);
  return res.send({ error: '' });
};

const updateGeneral = async (username, payload) => {
  const userInfo = await db.getUserdb(username);
  const { firstname, lastname, gender, orient } = payload;
  const reg = /^[a-zA-Z]+$/;
  const types = ['male', 'female', 'both'];
  let modif = false;
  if (!types.includes(gender) || !types.includes(orient)) {
    return 'Wrong gender or orientation';
  }
  if (firstname) {
    if (firstname.length > 25) return 'First name is too long';
    if (!firstname.match(reg)) return 'First name can only be alpha characters';
  }
  if (lastname) {
    if (lastname.length > 25) return 'Last name is too long';
    if (!lastname.match(reg)) return 'Last name can only be alpha characters';
  }
  Object.keys(payload).forEach((key) => {
    if (userInfo[key] !== payload[key]) {
      db.setter(username, key, payload[key]);
      modif = true;
    }
  });
  return modif ? null : 'No change detected';
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
  const { email } = payload;
  const error = verifemail(email);
  if (error) return ({ error: 'emailchange', message: error.message });
  return null;
};

export const updateGateway = async (req, res) => {
  const { username } = req.headers;
  const { field } = req.params;
  if (field === 'generalinfo') {
    const message = await updateGeneral(username, req.body);
    if (message) res.send({ error: 'updateGeneral', message });
    return res.send({ error: '' });
  } else if (field === 'password') {
    const verif = await controlPasswordChange(username, req.body);
    if (verif) {
      return res.send({ error: verif.error, message: verif.message });
    }
    changePassword(username, req.body);
    return res.send({ error: '' });
  } else if (field === 'email') {
    const verif = await controlEmailChange(username, req.body);
    if (verif) {
      return res.send({ error: verif.error, message: verif.message });
    }
    db.setter(username, 'email', req.body.email);
    return res.send({ error: '' });
  } else if (field === 'tags') {
    const { tags } = req.body;
    db.setter(username, 'tags', tags);
    return res.send({ error: '' });
  } else if (field === 'geo') {
    const { geo } = req.body;
    if (!geo) return res.send({ error: 'no geo' });
    db.setter(username, 'geo', geo);
    return res.send({ error: '' });
  } else if (field === 'bio') {
    const { newbio } = req.body;
    db.setter(username, 'bio', newbio);
    return res.send({ error: '', bio: newbio });
  }
  return res.send({ error: 'updateGeneral', message: 'nothing to do' });
};

export const getFavPic = async (req, res) => {
  const { username } = req.params;
  const output = await db.getter(username, ['profilePicturePath']);
  const { profilePicturePath } = output[0];
  if (!profilePicturePath) return res.send({ error: 'no fav pic' });
  return res.send({ error: '', profilePicturePath });
};

export const initNavbar = async (req, res) => {
  const { username } = req.headers;
  const output = await db.getter(username, ['blockedto', 'blockedby', 'activity']);
  const { blockedto } = output[0];
  const { blockedby } = output[1];
  const { activity } = output[2];
  const messageCount = await getMessageCount(username);
  const activityCount = activity.length;
  return res.send({ error: '', messageCount, activityCount, blockedto, blockedby });
};

export const getActivity = async (req, res) => {
  const { username } = req.params;
  const activity = await db.getter(username, ['activity']);
  const oldactivity = await db.getter(username, ['oldactivity']);
  return res.send({ error: '', activity: activity[0], oldactivity: oldactivity[0] });
};

export const resetActivity = async (req, res) => {
  const { username } = req.params;
  const output = await db.getter(username, ['activity']);
  const activity = output[0];
  await db.setter(username, 'activity', []);
  await db.oldActivityPusher(username, Object.values(activity));
  return res.send({ error: '' });
};

export const getNewActivity = async (req, res) => {
  const { username } = req.params;
  const output = await db.getter(username, ['activity']);
  const activity = output[0];
  return res.send({ error: '', activity });
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
