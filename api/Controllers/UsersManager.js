import * as db from '../DbAction/DbAction.js';

export const initprofile = async (req, res) => {
  const { username } = req.headers;
  const userInfo = await db.getUserdb(username);
  return res.send({ userInfo });
};

export const activation = async (req, res) => {
  const { activationkey } = req.body;
  const { username, token } = req.headers;
  const userdb = await db.getUserdb(username);
  if (userdb.activationkey !== activationkey) {
    return res.send({ error: 'activation', message: 'OUPS !, The activation key is not correct' });
  }
  await db.setter(username, 'activationkey', null);
  await db.setter(username, 'activated', true);
  return res.send({ error: '', activated: true, token, username });
};

const updateGeneral = async (payload) => {
  const { firstname, lastname, email, gender, orient, geo } = payload;
  // db.modifyUser()
  console.log('wesh');
};

export const updateGateway = async (req, res) => {
  await db.checkuser(req, res);
  const { field } = req.params;
  switch (field) {
    case 'general':
      await updateGeneral(req.body);
      break;
    case 'password':

      break;
    case 'tags':

      break;
    default:
  }
  return res.send({ ok: 'ok' });
};
