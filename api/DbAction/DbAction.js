import Mongo from '../config/MongoConnection';

export const serveDb = async (username) => {
  const usercollection = await Mongo.db.collection('users');
  const userdb = await usercollection.findOne({ username });
  return ({ usercollection, userdb });
};

export const checkUser = async (username) => {
  const { userdb } = await serveDb(username);
  if (!userdb) {
    return false;
  }
  return true;
};

export const getUserpassword = async (username) => {
  const { userdb } = await serveDb(username);
  return userdb.password;
};

export const getUserdb = async (username) => {
  const { userdb } = await serveDb(username);
  if (userdb) userdb.password = null;
  return userdb;
};

export const setter = async (username, field, value) => {
  const { usercollection } = await serveDb(username);
  await usercollection.updateOne(
    { username },
    { $set: { [field]: value } });
};


export const getter = async (username, fields) => {
  const { userdb } = await serveDb(username);
  console.log('in getter', fields);
  const output = [];
  for (let i = 0; fields[i]; i += 1) {
    console.log('in for', [fields[i]], userdb[fields[i]]);
    output.push({ [fields[i]]: userdb[fields[i]] });
  }
  return output;
};

export const pusher = async (username, field, value) => {
  const { usercollection } = await serveDb(username);
  await usercollection.updateOne(
    { username },
    { $addToSet: { [field]: value } });
};

export const puller = async (username, field, value) => {
  const { usercollection } = await serveDb(username);
  await usercollection.updateOne(
    { username },
    { $pull: { [field]: value } });
};

export const removePicture = async (username, fileName) => {
  const { userdb, usercollection } = await serveDb(username);
  if (userdb.profilePicturePath === fileName) {
    await setter(username, 'profilePicturePath', '');
  }
  return new Promise((resolve, reject) => {
    usercollection.findAndModify(
    { username },
    [],
    { $pull: { picturesPath: fileName } },
    { new: true },
    (err, doc) => {
      if (err) reject(err);
      else {
        resolve(doc.value);
      }
    });
  });
};


export const oldActivityPusher = async (username, array) => {
  const { usercollection } = await serveDb(username);
  console.log('About to push', array);
  await usercollection.updateOne(
    { username },
    { $pushAll: { oldactivity: array } });
};
