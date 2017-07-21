import Mongo from '../config/MongoConnection';

const serveDb = async (username) => {
  const usercollection = await Mongo.db.collection('users');
  const userdb = await usercollection.findOne({ username });
  return ({ usercollection, userdb });
};

const checkUser = async (username) => {
  const { userdb } = await serveDb(username);
  if (!userdb) {
    return false;
  }
  return true;
};

const getUserdb = async (username) => {
  const { userdb } = await serveDb(username);
  userdb.password = null;
  return userdb;
};

const setter = async (username, field, value) => {
  const { usercollection } = await serveDb(username);
  usercollection.updateOne(
    { username },
    { $set: { [field]: value } });
};

const removePicture = async (username, fileName) => {
  const { userdb, usercollection } = await serveDb(username);
  if (userdb.profilePicturePath === fileName) {
    this.set(username, 'profilePicturePath', '');
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

export { checkUser, getUserdb, setter, removePicture };
