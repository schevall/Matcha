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

// const modifyUser = async (req, res)
