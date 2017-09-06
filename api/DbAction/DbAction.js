import Mongo from '../config/MongoConnection';

export const serveDb = async (username) => {
  const usercollection = await Mongo.db.collection('users');
  const userdb = await usercollection.findOne({ username });
  return ({ usercollection, userdb });
};

export const DbgetTagsList = async () => {
  const cursor = await Mongo.db.collection('tags').findOne({});
  const { tagList } = cursor;
  return tagList;
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
  const output = [];
  for (let i = 0; i < fields.length; i += 1) {
    output.push({ [fields[i]]: userdb[fields[i]] });
  }
  return output;
};

export const getPic = async (username) => {
  const { userdb } = await serveDb(username);
  const pic = userdb.profilePicturePath;
  return pic;
};

export const pusher = async (username, field, value) => {
  const { usercollection } = await serveDb(username);
  await usercollection.updateOne(
    { username },
    { $addToSet: { [field]: value } });
};

export const updatePopularity = async (username, value) => {
  const { usercollection } = await serveDb(username);
  await usercollection.updateOne(
    { username },
    { $inc: { popularity: value } });
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


export const oldActivityPusher = async (username, array = []) => {
  const { usercollection } = await serveDb(username);
  if (array.length) {
    await usercollection.updateOne(
    { username },
    { $pushAll: { oldactivity: array } });
  }
};
